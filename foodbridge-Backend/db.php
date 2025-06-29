<?php
$host = 'localhost';
$user = 'root';      // default for local
$pass = '';          // MAMP might use 'root'
$db   = 'foodbridge'; // database name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    // For API endpoints, don't echo - instead handle the error properly
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Remove this line - it's corrupting your JSON responses:
// echo "Connected successfully";
?>