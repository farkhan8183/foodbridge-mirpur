<?php
// Set headers for port 5173
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true"); // ADD THIS LINE

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Debug: Log the request method
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);

try {
    // Include DB connection
    include 'db.php';

    // Parse incoming JSON
    $input = file_get_contents("php://input");
    error_log("Raw input: " . $input);
    
    $data = json_decode($input, true);
    error_log("Parsed data: " . print_r($data, true));

    // Check if JSON parsing was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Invalid JSON format"]);
        exit();
    }

    // Validate presence of required fields
    if (
        !isset($data['name']) || !isset($data['email']) || !isset($data['phone']) ||
        !isset($data['address']) || !isset($data['donorType']) || !isset($data['password'])
    ) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        exit();
    }

    // Extract values
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $address = $data['address'];
    $donor_type = $data['donorType'];
    $password = $data['password'];

    // Prepare SQL
    $sql = "INSERT INTO DONOR (name, email, phone, address, donor_type, password) 
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    // Check for prepare error
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "SQL prepare error: " . $conn->error]);
        exit();
    }

    $stmt->bind_param("ssssss", $name, $email, $phone, $address, $donor_type, $password);

    // Execute and respond
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Signup successful"]);
    } else {
        // If duplicate email, MySQL error code is 1062
        if ($conn->errno == 1062) {
            echo json_encode(["success" => false, "message" => "Email already exists."]);
        } else {
            echo json_encode(["success" => false, "message" => "Signup failed: " . $conn->error]);
        }
    }

    // Cleanup
    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>