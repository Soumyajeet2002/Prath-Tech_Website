<?php
session_start();

$letters = substr(str_shuffle("abcdefghijklmnopqrstuvwxyz"), 0, 3);
$numbers = substr(str_shuffle("0123456789"), 0, 3);
$captcha = str_shuffle($letters . $numbers);

$_SESSION['captcha_code'] = $captcha;

echo json_encode([
    "captcha" => $captcha
]);
?>
