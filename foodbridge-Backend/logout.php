<?php
// Start session
session_start();

// FIXED: Set headers for port 5173 (was 3000)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Destroy session
    session_unset();
    session_destroy();
    
    // Start new session to send response
    session_start();
    
    echo json_encode([
        "success" => true,
        "message" => "Logged out successfully"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Logout failed"
    ]);
}
?>