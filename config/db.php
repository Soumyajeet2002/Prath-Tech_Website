<?php
$conn = new mysqli("localhost", "root", "", "prath_careers_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
