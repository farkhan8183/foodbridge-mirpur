<?php
// Start session
session_start();

// Set headers for port 5173
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
    // Include DB connection
    include 'db.php';

    // Parse incoming JSON
    $input = file_get_contents("php://input");
    error_log("Login attempt - Raw input: " . $input);
    
    $data = json_decode($input, true);

    // Check if JSON parsing was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Invalid JSON format"]);
        exit();
    }

    // Validate presence of required fields
    if (!isset($data['email']) || !isset($data['password'])) {
        echo json_encode(["success" => false, "message" => "Email and password are required"]);
        exit();
    }

    $email = trim($data['email']);
    $password = $data['password'];

    error_log("Login attempt for email: " . $email);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit();
    }

    // Prepare SQL to find user - Using DONOR table name
    $sql = "SELECT id, name, email, donor_type, password FROM DONOR WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        error_log("SQL prepare error: " . $conn->error);
        echo json_encode(["success" => false, "message" => "Database error"]);
        exit();
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    error_log("Query executed, rows found: " . $result->num_rows);

    if ($result->num_rows === 0) {
        error_log("No user found with email: " . $email);
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        exit();
    }

    $user = $result->fetch_assoc();
    error_log("User found: " . $user['name']);

    // Simple plain text password comparison (NO HASHING)
    if ($password !== $user['password']) {
        error_log("Password mismatch - Input: '$password' vs Stored: '" . $user['password'] . "'");
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        exit();
    }

    error_log("Password match successful");

    // CREATE SESSION
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['donor_type'] = $user['donor_type'];
    $_SESSION['logged_in'] = true;

    error_log("Session created for user: " . $user['name']);

    // Login successful - return user data and session info
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "donor_type" => $user['donor_type']
        ],
        "session_id" => session_id()
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>