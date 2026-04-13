<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    unset($_SESSION['captcha_code']);
    echo json_encode(["status" => "error", "message" => "Invalid Request"]);
    exit;
}

// --- Input sanitization ---
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$number  = trim($_POST['number'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$captcha_input = trim($_POST['captcha_input'] ?? '');

// --- Captcha check ---
if (!isset($_SESSION['captcha_code'])) {
    echo json_encode(["status" => "error", "message" => "Captcha session expired"]);
    exit;
}
if ($captcha_input != $_SESSION['captcha_code']) {
    echo json_encode(["status" => "invalid_captcha", "message" => "Invalid captcha entered"]);
    exit;
}

// --- Validation ---
if (!preg_match("/^[A-Za-z ]{3,80}$/", $name)) {
    echo json_encode(["status" => "error", "message" => "Invalid name. Only letters & spaces allowed."]);
    exit;
}
if (!preg_match("/^[0-9]{10}$/", $number) || !preg_match("/^[6-9]/", $number)) {
    echo json_encode(["status" => "error", "message" => "Invalid mobile number. Must be 10 digits starting with 6-9."]);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address"]);
    exit;
}
if (strlen($subject) < 10 || strlen($subject) > 1000 || !preg_match("/^[A-Za-z0-9 .,!?@#()\-_\r\n]{10,1000}$/s", $subject)) {
    echo json_encode(["status" => "error", "message" => "Message must be 10-1000 characters and contain valid characters"]);
    exit;
}

// --- Send Admin Email ---
try {
    $mailAdmin = new PHPMailer(true);
    $mailAdmin->isSMTP();
    $mailAdmin->Host       = 'smtp.gmail.com';
    $mailAdmin->SMTPAuth   = true;
    $mailAdmin->Username   = 'notification@prathtech.com';
    $mailAdmin->Password   = 'hulzhnjtgohnaoya';
    $mailAdmin->SMTPSecure = 'tls';
    $mailAdmin->Port       = 587;

    $mailAdmin->setFrom('notification@prathtech.com', 'PrathTech Website Contact Form');
    $mailAdmin->addAddress('hradmin@prathtech.com');   // testing email 

    $mailAdmin->isHTML(true);
    $mailAdmin->Subject = "New Contact Form Submission - Prath Tech";
    $mailAdmin->Body = "
        <p>Dear Sir,</p>
        <p>We have received a new message via the PrathTech website contact form. Please find the details below.</p>
        <h3>User Details:</h3>
        <p><strong>Name:</strong> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</p>
        <p><strong>Mobile:</strong> " . htmlspecialchars($number, ENT_QUOTES, 'UTF-8') . "</p>
        <h3>Message:</h3>
        <p>" . nl2br(htmlspecialchars($subject, ENT_QUOTES, 'UTF-8')) . "</p>
    ";
    $mailAdmin->send();
} catch (Exception $e) {
    unset($_SESSION['captcha_code']);
    echo json_encode(["status" => "error", "message" => "Admin mail failed: " . $mailAdmin->ErrorInfo]);
    exit;
}

// --- Send User Confirmation Email ---
try {
    $mailUser = new PHPMailer(true);
    $mailUser->isSMTP();
    $mailUser->Host       = 'smtp.gmail.com';
    $mailUser->SMTPAuth   = true;
    $mailUser->Username   = 'notification@prathtech.com';
    $mailUser->Password   = 'hulzhnjtgohnaoya';
    $mailUser->SMTPSecure = 'tls';
    $mailUser->Port       = 587;

    $mailUser->setFrom('notification@prathtech.com', 'PrathTech Website Contact Form');
    $mailUser->addAddress($email);

    $mailUser->isHTML(true);
    $mailUser->Subject = "Thank You for Contacting Prath Technologies!";
    $mailUser->Body = "
        <h3>Dear " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ",</h3>
        <p>Thank you for contacting us. Our team will get back to you shortly.</p>
        <h4>Your Message:</h4>
        <p>" . nl2br(htmlspecialchars($subject, ENT_QUOTES, 'UTF-8')) . "</p>
        <p>Regards,<br><strong>Prath Technologies Pvt. Ltd.</strong></p>
    ";
    $mailUser->send();
} catch (Exception $e) {
    unset($_SESSION['captcha_code']);
    echo json_encode(["status" => "error", "message" => "User mail failed: " . $mailUser->ErrorInfo]);
    exit;
}

unset($_SESSION['captcha_code']);
echo json_encode(["status" => "success", "message" => "Details sent successfully"]);
