<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        echo json_encode([
            "success" => true,
            "logged_in" => true,
            "user" => [
                "id" => $_SESSION['user_id'],
                "name" => $_SESSION['user_name'],
                "email" => $_SESSION['user_email'],
                "role" => $_SESSION['user_role'],
                "data" => $_SESSION['user_data'] ?? null // ✅ Return role-specific data
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
