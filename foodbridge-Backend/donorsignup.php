<?php
// Set CORS headers
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
    include 'db.php';

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    error_log("Signup data: " . print_r($data, true));

    // Validate input
    if (
        !isset($data['name'], $data['email'], $data['password'], $data['phone'], $data['address'], $data['donorType'], $data['role'])
    ) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];
    $role = $data['role']; // This should be "donor"
    $phone = $data['phone'];
    $address = $data['address'];
    $donor_type = $data['donorType'];

    // Begin transaction
    $conn->begin_transaction();

    // 1. Insert into USERS table
    $userStmt = $conn->prepare("INSERT INTO USERS (name, email, password, role) VALUES (?, ?, ?, ?)");
    if (!$userStmt) throw new Exception("User insert prepare failed: " . $conn->error);
    $userStmt->bind_param("ssss", $name, $email, $password, $role);

    if (!$userStmt->execute()) {
        if ($conn->errno == 1062) {
            echo json_encode(["success" => false, "message" => "Email already exists."]);
        } else {
            throw new Exception("Failed to insert into USERS: " . $conn->error);
        }
        $conn->rollback();
        exit();
    }

    $user_id = $conn->insert_id; // Get inserted user ID

    // 2. Insert into DONOR table
    $donorStmt = $conn->prepare("INSERT INTO DONOR (user_id, phone, address, donor_type) VALUES (?, ?, ?, ?)");
    if (!$donorStmt) throw new Exception("Donor insert prepare failed: " . $conn->error);
    $donorStmt->bind_param("isss", $user_id, $phone, $address, $donor_type);

    if (!$donorStmt->execute()) {
        throw new Exception("Failed to insert into DONOR: " . $conn->error);
    }

    // Commit transaction
    $conn->commit();

    echo json_encode(["success" => true, "message" => "Signup successful"]);

    // Cleanup
    $userStmt->close();
    $donorStmt->close();
    $conn->close();

} catch (Exception $e) {
    $conn->rollback(); // Rollback on error
    error_log("Signup error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
