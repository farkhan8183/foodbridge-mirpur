<?php
// IMPORTANT: Make sure there are NO spaces or characters before this opening PHP tag

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers FIRST
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Start output buffering to prevent any unwanted output
ob_start();

try {
    // Include database connection
    include 'db.php';

    // Get and decode input
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    
    // Log the received data for debugging
    error_log("Recipient signup data received: " . print_r($data, true));

    // Check if JSON decode was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON input: " . json_last_error_msg());
    }

    // Validate required fields
    if (!isset($data['organizationName']) || !isset($data['contactPerson']) || 
        !isset($data['email']) || !isset($data['phone']) || !isset($data['address']) || 
        !isset($data['dailyNeed']) || !isset($data['password']) || !isset($data['role'])) {
        
        ob_clean(); // Clear any output buffer
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    // Extract and sanitize data
    $organizationName = trim($data['organizationName']);
    $contactPerson = trim($data['contactPerson']);
    $email = trim(strtolower($data['email']));
    $phone = trim($data['phone']);
    $address = trim($data['address']);
    $dailyNeed = intval($data['dailyNeed']);
    $password = $data['password']; // Store password as plain text
    $role = $data['role'];

    // Server-side validation
    if (empty($organizationName) || empty($contactPerson) || empty($email) || 
        empty($phone) || empty($address) || $dailyNeed <= 0 || empty($password)) {
        
        ob_clean();
        echo json_encode(["success" => false, "message" => "All fields are required and daily need must be positive"]);
        exit();
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        ob_clean();
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit();
    }

    // Password validation
    if (strlen($password) < 6) {
        ob_clean();
        echo json_encode(["success" => false, "message" => "Password must be at least 6 characters long"]);
        exit();
    }

    // Phone validation
    if (!preg_match('/^[\d\s\-\+\(\)]{10,}$/', $phone)) {
        ob_clean();
        echo json_encode(["success" => false, "message" => "Invalid phone number format"]);
        exit();
    }

    // Role validation
    if ($role !== 'recipient') {
        ob_clean();
        echo json_encode(["success" => false, "message" => "Invalid role specified"]);
        exit();
    }

    // Begin transaction
    $conn->begin_transaction();

    // Check if email already exists
    $checkEmailStmt = $conn->prepare("SELECT id FROM USERS WHERE email = ?");
    if (!$checkEmailStmt) {
        throw new Exception("Email check prepare failed: " . $conn->error);
    }
    
    $checkEmailStmt->bind_param("s", $email);
    $checkEmailStmt->execute();
    $emailResult = $checkEmailStmt->get_result();
    
    if ($emailResult->num_rows > 0) {
        ob_clean();
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        $checkEmailStmt->close();
        $conn->rollback();
        exit();
    }
    $checkEmailStmt->close();

    // Insert into USERS table (password stored as plain text)
    $userStmt = $conn->prepare("INSERT INTO USERS (name, email, password, role) VALUES (?, ?, ?, ?)");
    if (!$userStmt) {
        throw new Exception("User insert prepare failed: " . $conn->error);
    }
    
    $userStmt->bind_param("ssss", $organizationName, $email, $password, $role);

    if (!$userStmt->execute()) {
        throw new Exception("Failed to insert into USERS: " . $userStmt->error);
    }

    // Get the user ID
    $user_id = $conn->insert_id;
    $userStmt->close();

    // Validate user_id
    if (!$user_id) {
        throw new Exception("Failed to get user ID after insert");
    }

    // Insert into RECIPIENT table
    $recipientStmt = $conn->prepare("INSERT INTO RECIPIENT (user_id, Daily_Need, Address, Contact, contact_person) VALUES (?, ?, ?, ?, ?)");
    if (!$recipientStmt) {
        throw new Exception("Recipient insert prepare failed: " . $conn->error);
    }
    
    $recipientStmt->bind_param("iisss", $user_id, $dailyNeed, $address, $phone, $contactPerson);

    if (!$recipientStmt->execute()) {
        throw new Exception("Failed to insert into RECIPIENT: " . $recipientStmt->error);
    }
    $recipientStmt->close();

    // Commit transaction
    $conn->commit();

    // Log success
    error_log("Recipient registration successful for email: " . $email . " with user_id: " . $user_id);

    // Clear output buffer and send success response
    ob_clean();
    echo json_encode([
        "success" => true, 
        "message" => "Recipient registration successful",
        "user_id" => $user_id
    ]);

} catch (Exception $e) {
    // Rollback transaction on error
    if (isset($conn)) {
        $conn->rollback();
    }
    
    // Log the error
    error_log("Recipient signup error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    // Clear output buffer and send error response
    ob_clean();
    
    // Send appropriate error message
    if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed: " . $e->getMessage()]);
    }
    
} finally {
    // Close connections
    if (isset($conn)) {
        $conn->close();
    }
}

// End output buffering and flush
ob_end_flush();
?>