<?php
// Start session
session_start();

// FIXED: Set headers for port 5173 (was 3000)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Check if user is logged in
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        echo json_encode([
            "success" => true,
            "logged_in" => true,
            "user" => [
                "id" => $_SESSION['user_id'],
                "name" => $_SESSION['user_name'],
                "email" => $_SESSION['user_email'],
                "donor_type" => $_SESSION['donor_type']
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "logged_in" => false,
            "message" => "Not logged in"
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "logged_in" => false,
        "message" => "Session check failed"
    ]);
}
?>