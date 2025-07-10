<?php
session_start();

// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    include 'db.php';

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Invalid JSON format"]);
        exit();
    }

    if (!isset($data['email']) || !isset($data['password'])) {
        echo json_encode(["success" => false, "message" => "Email and password are required"]);
        exit();
    }

    $email = trim($data['email']);
    $password = $data['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit();
    }

    // Step 1: Get user from USERS table
    $sql = "SELECT id, name, email, password, role FROM USERS WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        exit();
    }

    $user = $result->fetch_assoc();

    // Check password (plaintext match)
    if ($password !== $user['password']) {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        exit();
    }

    // Step 2: Fetch full role-specific data
    $role = $user['role'];
    $extraData = [];

    if ($role === 'donor') {
        $roleSql = "SELECT * FROM DONOR WHERE user_id = ?";
    } elseif ($role === 'recipient') {
        $roleSql = "SELECT * FROM RECIPIENT WHERE user_id = ?";
    } elseif ($role === 'volunteer') {
        $roleSql = "SELECT * FROM VOLUNTEER WHERE user_id = ?";
    } else {
        echo json_encode(["success" => false, "message" => "Invalid user role"]);
        exit();
    }

    $roleStmt = $conn->prepare($roleSql);
    $roleStmt->bind_param("i", $user['id']);
    $roleStmt->execute();
    $roleResult = $roleStmt->get_result();
    $extraData = $roleResult->fetch_assoc();

    // Step 3: Store everything in session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['user_data'] = $extraData;  // ✅ Store full role-specific data
    $_SESSION['logged_in'] = true;

    // Step 4: Respond with everything
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "role" => $user['role'],
            "data" => $extraData  // ✅ Full donor/recipient/volunteer row
        ],
        "session_id" => session_id()
    ]);

    $stmt->close();
    $roleStmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>
