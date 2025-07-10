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
    error_log("Volunteer Signup data: " . print_r($data, true));

    // Validate input
    if (
        !isset($data['name'], $data['email'], $data['password'], $data['role'],
                 $data['department'], $data['contact'], $data['relevantSkill'],
                 $data['availability'], $data['city'], $data['cnic'])
    ) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    // Extract values
    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];
    $role = $data['role']; // Should be "volunteer"
    
    $department = $data['department'];
    $contact = $data['contact'];
    $relevantSkill = $data['relevantSkill'];
    $availability = $data['availability'];
    $city = $data['city'];
    $cnic = $data['cnic'];

    // Begin transaction
    $conn->begin_transaction();

    // Insert into USERS
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

    $user_id = $conn->insert_id;

    // Insert into VOLUNTEER
    $volStmt = $conn->prepare("INSERT INTO VOLUNTEER (user_id, Department, Contact, Relevant_Skill, Availability, City, CNIC)
                               VALUES (?, ?, ?, ?, ?, ?, ?)");
    if (!$volStmt) throw new Exception("Volunteer insert prepare failed: " . $conn->error);
    $volStmt->bind_param("issssss", $user_id, $department, $contact, $relevantSkill, $availability, $city, $cnic);

    if (!$volStmt->execute()) {
        throw new Exception("Failed to insert into VOLUNTEER: " . $conn->error);
    }

    // Commit
    $conn->commit();

    echo json_encode(["success" => true, "message" => "Volunteer signup successful"]);

    // Cleanup
    $userStmt->close();
    $volStmt->close();
    $conn->close();

} catch (Exception $e) {
    $conn->rollback(); // Rollback on error
    error_log("Volunteer Signup error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
