<?php
/**
 * Blog Analytics API
 * API endpoints cho hệ thống view và like tracking
 */

require_once 'config.php';

// Get database connection
$db = Database::getInstance()->getConnection();

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

try {
    switch ($endpoint) {

        // ==================== GET ALL POST STATS ====================
        case 'stats':
            if ($method === 'GET') {
                $stmt = $db->query("
                    SELECT 
                        p.post_id,
                        p.title,
                        ps.total_views,
                        ps.total_likes
                    FROM posts p
                    LEFT JOIN post_stats ps ON p.post_id = ps.post_id
                    ORDER BY p.published_date DESC
                ");

                $stats = $stmt->fetchAll();

                // Format response
                $response = [];
                foreach ($stats as $stat) {
                    $response[$stat['post_id']] = [
                        'views' => (int) $stat['total_views'],
                        'likes' => (int) $stat['total_likes'],
                        'title' => $stat['title']
                    ];
                }

                sendResponse(true, $response, 'Stats retrieved successfully');
            }
            break;

        // ==================== GET SINGLE POST STATS ====================
        case 'post-stats':
            if ($method === 'GET') {
                $postId = isset($_GET['post_id']) ? $_GET['post_id'] : '';

                if (!validatePostID($postId)) {
                    sendResponse(false, [], 'Invalid post ID', 400);
                }

                $stmt = $db->prepare("
                    SELECT 
                        ps.total_views,
                        ps.total_likes
                    FROM post_stats ps
                    WHERE ps.post_id = :post_id
                ");
                $stmt->execute(['post_id' => $postId]);
                $stats = $stmt->fetch();

                if ($stats) {
                    sendResponse(true, [
                        'post_id' => $postId,
                        'views' => (int) $stats['total_views'],
                        'likes' => (int) $stats['total_likes']
                    ]);
                } else {
                    sendResponse(false, [], 'Post not found', 404);
                }
            }
            break;

        // ==================== RECORD VIEW ====================
        case 'view':
            if ($method === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $postId = isset($input['post_id']) ? $input['post_id'] : '';

                if (!validatePostID($postId)) {
                    sendResponse(false, [], 'Invalid post ID', 400);
                }

                $sessionId = getSessionID();
                $userIp = getClientIP();
                $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';

                // Check if already viewed in last 24 hours
                $stmt = $db->prepare("
                    SELECT COUNT(*) as count 
                    FROM post_views 
                    WHERE post_id = :post_id 
                    AND session_id = :session_id 
                    AND viewed_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
                ");
                $stmt->execute([
                    'post_id' => $postId,
                    'session_id' => $sessionId
                ]);
                $result = $stmt->fetch();

                if ($result['count'] > 0) {
                    sendResponse(true, ['already_viewed' => true], 'Already viewed in last 24 hours');
                }

                // Record view
                $db->beginTransaction();

                try {
                    // Insert view record
                    $stmt = $db->prepare("
                        INSERT INTO post_views (post_id, user_ip, user_agent, session_id) 
                        VALUES (:post_id, :user_ip, :user_agent, :session_id)
                    ");
                    $stmt->execute([
                        'post_id' => $postId,
                        'user_ip' => $userIp,
                        'user_agent' => $userAgent,
                        'session_id' => $sessionId
                    ]);

                    // Update stats
                    $stmt = $db->prepare("
                        UPDATE post_stats 
                        SET total_views = total_views + 1 
                        WHERE post_id = :post_id
                    ");
                    $stmt->execute(['post_id' => $postId]);

                    $db->commit();

                    // Get updated count
                    $stmt = $db->prepare("SELECT total_views FROM post_stats WHERE post_id = :post_id");
                    $stmt->execute(['post_id' => $postId]);
                    $newCount = $stmt->fetch();

                    sendResponse(true, [
                        'post_id' => $postId,
                        'total_views' => (int) $newCount['total_views']
                    ], 'View recorded successfully');

                } catch (Exception $e) {
                    $db->rollBack();
                    throw $e;
                }
            }
            break;

        // ==================== TOGGLE LIKE ====================
        case 'like':
            if ($method === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $postId = isset($input['post_id']) ? $input['post_id'] : '';

                if (!validatePostID($postId)) {
                    sendResponse(false, [], 'Invalid post ID', 400);
                }

                $sessionId = getSessionID();
                $userIp = getClientIP();

                $db->beginTransaction();

                try {
                    // Check if like exists
                    $stmt = $db->prepare("
                        SELECT is_liked 
                        FROM post_likes 
                        WHERE post_id = :post_id AND session_id = :session_id
                    ");
                    $stmt->execute([
                        'post_id' => $postId,
                        'session_id' => $sessionId
                    ]);
                    $existingLike = $stmt->fetch();

                    if ($existingLike) {
                        // Toggle existing like
                        $newState = !$existingLike['is_liked'];

                        $stmt = $db->prepare("
                            UPDATE post_likes 
                            SET is_liked = :is_liked, updated_at = CURRENT_TIMESTAMP 
                            WHERE post_id = :post_id AND session_id = :session_id
                        ");
                        $stmt->execute([
                            'is_liked' => $newState,
                            'post_id' => $postId,
                            'session_id' => $sessionId
                        ]);

                        // Update stats
                        $increment = $newState ? 1 : -1;
                        $stmt = $db->prepare("
                            UPDATE post_stats 
                            SET total_likes = total_likes + :increment 
                            WHERE post_id = :post_id
                        ");
                        $stmt->execute([
                            'increment' => $increment,
                            'post_id' => $postId
                        ]);

                        $isLiked = $newState;
                    } else {
                        // Create new like
                        $stmt = $db->prepare("
                            INSERT INTO post_likes (post_id, session_id, user_ip, is_liked) 
                            VALUES (:post_id, :session_id, :user_ip, TRUE)
                        ");
                        $stmt->execute([
                            'post_id' => $postId,
                            'session_id' => $sessionId,
                            'user_ip' => $userIp
                        ]);

                        // Update stats
                        $stmt = $db->prepare("
                            UPDATE post_stats 
                            SET total_likes = total_likes + 1 
                            WHERE post_id = :post_id
                        ");
                        $stmt->execute(['post_id' => $postId]);

                        $isLiked = true;
                    }

                    $db->commit();

                    // Get updated count
                    $stmt = $db->prepare("SELECT total_likes FROM post_stats WHERE post_id = :post_id");
                    $stmt->execute(['post_id' => $postId]);
                    $newCount = $stmt->fetch();

                    sendResponse(true, [
                        'post_id' => $postId,
                        'is_liked' => $isLiked,
                        'total_likes' => (int) $newCount['total_likes']
                    ], 'Like toggled successfully');

                } catch (Exception $e) {
                    $db->rollBack();
                    throw $e;
                }
            }
            break;

        // ==================== CHECK LIKE STATUS ====================
        case 'check-like':
            if ($method === 'GET') {
                $postId = isset($_GET['post_id']) ? $_GET['post_id'] : '';

                if (!validatePostID($postId)) {
                    sendResponse(false, [], 'Invalid post ID', 400);
                }

                $sessionId = getSessionID();

                $stmt = $db->prepare("
                    SELECT is_liked 
                    FROM post_likes 
                    WHERE post_id = :post_id AND session_id = :session_id
                ");
                $stmt->execute([
                    'post_id' => $postId,
                    'session_id' => $sessionId
                ]);
                $result = $stmt->fetch();

                sendResponse(true, [
                    'post_id' => $postId,
                    'is_liked' => $result ? (bool) $result['is_liked'] : false
                ]);
            }
            break;

        // ==================== GET ANALYTICS ====================
        case 'analytics':
            if ($method === 'GET') {
                $stmt = $db->query("SELECT * FROM post_analytics");
                $analytics = $stmt->fetchAll();

                sendResponse(true, $analytics, 'Analytics retrieved successfully');
            }
            break;

        default:
            sendResponse(false, [], 'Invalid endpoint', 404);
    }

} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    sendResponse(false, [], 'Server error: ' . $e->getMessage(), 500);
}
