<?php
header('Content-Type: application/json');

// ================================================================
// JOB 1 — Proxy captcha request to HRMS
// ================================================================
if (isset($_GET['get_captcha'])) {
    $ch = curl_init("https://hrms.prathtech.com/api/method/generate_captcha");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPGET        => true,
        CURLOPT_USERAGENT      => 'Mozilla/5.0',
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    if (!$response) {
        echo json_encode(["status" => "error", "captcha_text" => null, "captcha_id" => null]);
    } else {
        $d = json_decode($response, true);
        echo json_encode([
            "status"       => "success",
            "captcha_text" => $d['message']['captcha_text'] ?? null,
            "captcha_id"   => $d['message']['captcha_id']   ?? null,
        ]);
    }
    exit;
}

// ================================================================
// JOB 2 — Proxy get_industries API
// ================================================================
if (isset($_GET['get_industries'])) {
    $ch = curl_init("https://hrms.prathtech.com/api/method/get_industries");
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_TIMEOUT => 10, CURLOPT_USERAGENT => 'Mozilla/5.0']);
    $res = curl_exec($ch); curl_close($ch);
    echo $res ?: json_encode(["message" => []]);
    exit;
}

// ================================================================
// JOB 3 — Proxy get_products API
// ================================================================
if (isset($_GET['get_products'])) {
    $ch = curl_init("https://hrms.prathtech.com/api/method/get_products");
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_TIMEOUT => 10, CURLOPT_USERAGENT => 'Mozilla/5.0']);
    $res = curl_exec($ch); curl_close($ch);
    echo $res ?: json_encode(["message" => []]);
    exit;
}

// ================================================================
// JOB 4 — Submit contact form to HRMS + Send Emails
// ================================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $full_name        = trim($_POST['name']             ?? '');
    $mobile           = trim($_POST['number']           ?? '');
    $email            = trim($_POST['email']            ?? '');
    $message          = trim($_POST['subject']          ?? '');
    $captcha_input    = trim($_POST['captcha_input']    ?? '');
    $captcha_id       = trim($_POST['captcha_id']       ?? '');
    $industry_raw     = trim($_POST['industry']         ?? '');
    $name_of_industry = trim($_POST['name_of_industry'] ?? '');
    $industry          = $industry_raw;
    $productInterested  = trim($_POST['productInterested'] ?? ''); // from API-driven dropdown

    // Server-side validation
    $errors = [];
    if (empty($full_name))                          $errors[] = "Full name is required.";
    if (empty($mobile))                             $errors[] = "Mobile number is required.";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "A valid email is required."; 
    if (empty($message))                            $errors[] = "Message is required.";
    if (empty($captcha_input))                      $errors[] = "Captcha is required.";
    if (!empty($errors)) {
        echo json_encode(["status" => "error", "message" => implode(" ", $errors)]);
        exit;
    }

    // ── Send to HRMS API ──────────────────────────────────────────────────
    // Note: Emails are handled by the HRMS backend after save_contact
    $apiData = [
        'full_name'          => $full_name,
        'mobile'             => $mobile,
        'email'              => $email,
        'message'            => $message,
        'industry'           => $industry,
        'name_of_industry'   => $name_of_industry,
        'product_interested' => $productInterested,
        'captcha_id'         => $captcha_id,
        'captcha_input'      => $captcha_input,
    ];

    $ch = curl_init("https://hrms.prathtech.com/api/method/save_contact");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($apiData),
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_USERAGENT      => 'Mozilla/5.0',
        CURLOPT_HTTPHEADER     => ['Expect:', 'Accept: application/json', 'Content-Type: application/x-www-form-urlencoded'],
    ]);

    $apiResponse = curl_exec($ch);
    $curlError   = curl_error($ch);
    $httpCode    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($apiResponse === false) {
        echo json_encode(["status" => "error", "message" => "Could not reach the server. ($curlError)"]);
        exit;
    }

    $hrmsBody = json_decode($apiResponse, true);

    if ($httpCode >= 200 && $httpCode < 300) {
        // Send admin email using address returned from HRMS API
        echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent successfully."]);
    } else {
        echo json_encode([
            "status"  => "error",
            "message" => $hrmsBody['message'] ?? $hrmsBody['exception'] ?? "HTTP $httpCode error.",
        ]);
    }
    exit;
}

// Fallback
echo json_encode(["status" => "error", "message" => "Invalid request."]);