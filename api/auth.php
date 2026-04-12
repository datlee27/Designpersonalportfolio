<?php
/**
 * Admin Authentication API
 * Xử lý đăng nhập và kiểm tra quyền admin
 */

require_once 'config.php';

// Initial check for session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$db = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

try {
    switch ($endpoint) {
        case 'login':
            if ($method === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $username = isset($input['username']) ? trim($input['username']) : '';
                $password = isset($input['password']) ? $input['password'] : '';

                if (empty($username) || empty($password)) {
                    sendResponse(false, [], 'Username and password are required', 400);
                }

                $stmt = $db->prepare("SELECT * FROM admins WHERE username = :username");
                if (!$stmt->execute(['username' => $username])) {
                    sendResponse(false, [], 'Database query failed', 500);
                }
                
                $admin = $stmt->fetch();

                if (!$admin) {
                    sendResponse(false, [], 'Debug: User "' . $username . '" not found in database', 401);
                }

                if (password_verify($password, $admin['password_hash'])) {
                    $_SESSION['admin_id'] = $admin['id'];
                    $_SESSION['admin_username'] = $admin['username'];
                    $_SESSION['is_admin'] = true;

                    sendResponse(true, [
                        'username' => $admin['username'],
                        'logged_in' => true
                    ], 'Login successful');
                } else {
                    sendResponse(false, [], 'Debug: Password mismatch for user "' . $username . '"', 401);
                }
            }
            break;

        case 'logout':
            $_SESSION = [];
            session_destroy();
            sendResponse(true, [], 'Logged out successfully');
            break;

        case 'check':
            $isLoggedIn = isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true;
            sendResponse(true, [
                'logged_in' => $isLoggedIn,
                'username' => $isLoggedIn ? $_SESSION['admin_username'] : null
            ]);
            break;

        default:
            sendResponse(false, [], 'Invalid endpoint', 404);
    }
} catch (Exception $e) {
    error_log("Auth API Error: " . $e->getMessage());
    sendResponse(false, [], 'Server error: ' . $e->getMessage(), 500);
}
