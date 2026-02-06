<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $number  = trim($_POST['number'] ?? '');
    $subject = trim($_POST['subject'] ?? '');    
    $captcha_input = trim($_POST['captcha_input'] ?? '');

    if (!isset($_SESSION['captcha_code'])) {
        echo json_encode(["status" => "error", "message" => "Captcha session expired"]);
        exit;
    }

    // if (strtolower($captcha_input) !== strtolower($_SESSION['captcha_code'])) {
    if ($captcha_input != $_SESSION['captcha_code']) {
        echo json_encode(["status" => "invalid_captcha", "message" => "Invalid captcha entered"]);
        exit;
    }
    
    if (!preg_match("/^[A-Za-z ]{3,80}$/", $name)) {
        echo json_encode(["status" => "error", "message" => "Invalid name. Only letters & spaces allowed."]);
        exit;
    }

    if (!preg_match("/^[0-9]{10}$/", $number)) {
        echo json_encode(["status" => "error", "message" => "Mobile number must be exactly 10 digits"]);
        exit;
    }

    if (!preg_match("/^[6-9]/", $number)) {
        echo json_encode(["status" => "error", "message" => "Indian mobile numbers must start with 6, 7, 8, or 9"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address"]);
        exit;
    }

    if (strlen($subject) < 10 || strlen($subject) > 1000) {
        echo json_encode(["status" => "error", "message" => "Message must be 10-1000 characters"]);
        exit;
    }

    if (!preg_match("/^[A-Za-z0-9 .,!?@#()\-_\r\n]{10,1000}$/s", $subject)) {
        echo json_encode(["status" => "error", "message" => "Message contains invalid characters"]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'prabhas.khamari@prathtech.com';
        $mail->Password   = 'ujyychndesvgfxbx'; // Gmail App Password         
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // SEND MAIL TO ADMIN
        $mail->setFrom('prabhas.khamari@pprathtech.com', 'PrathTech Website Contact Form');
        $mail->addAddress('prabhas.khamari@prathtech.com');

        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission - Prath Tech";
        $mail->Body = "
            <p>Dear Sir</p>
            <p>We have received a new message via the PrathTech website contact form. Please find the details below.</p>

            <h3 style='margin-top:20px;'>User Details:</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Mobile:</strong> $number</p>

            <h3 style='margin-top:20px;'>Message:</h3>
            <p style='white-space:pre-line;'>$subject</p>
        ";        
        // <hr><p style='font-size:12px;color:#777;'>This is an automated email from Prath Technologies Pvt Ltd.</p>

        $mail->send();

        // SEND CONFIRMATION MAIL TO USER
        $mail->clearAddresses();
        $mail->addAddress($email);
        
        $mail->Subject = "Thank You for Contacting Prath Technologies Private Limited!";
        $mail->Body = "
            <h3>Dear $name,</h3>
            <p>Thank you for contacting us!</p>
            <p>Your message has been received successfully. Our team will get back to you shortly.</p>

            <h4>Your Message:</h4>
            <p style='white-space:pre-line;'>$subject</p>

            <br>
            <p>Regards,<br><strong>Prath Technologies Pvt. Ltd.</strong></p>
        ";

        $mail->send();

        unset($_SESSION['captcha_code']);
        echo json_encode(["status" => "success", "message" => "Details sent successfully"]);
    } 
    catch (Exception $e) {
        unset($_SESSION['captcha_code']);
        echo json_encode(["status" => "error", "message" => "Mailer Error: ".$mail->ErrorInfo]);
    }
} else {
    unset($_SESSION['captcha_code']);
    echo json_encode(["status" => "error", "message" => "Invalid Request"]);
}
