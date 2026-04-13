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
        // ==================== GET ALL POSTS (New) ====================
        case 'posts':
            if ($method === 'GET') {
                try {
                    // Thử lấy bài viết và nối với các bảng thống kê
                    $sql = "SELECT p.*, 
                            COALESCE(s.total_likes, 0) as total_likes, 
                            COALESCE(s.total_views, 0) as total_views 
                            FROM posts p 
                            LEFT JOIN post_stats s ON p.post_id = s.post_id 
                            ORDER BY p.published_date DESC";
                    
                    $stmt = $db->query($sql);
                    if (!$stmt) {
                        // Nếu JOIN lỗi, thử lấy bài viết thuần túy
                        $stmt = $db->query("SELECT * FROM posts ORDER BY published_date DESC");
                    }
                    
                    $posts = $stmt->fetchAll();
                    sendResponse(true, $posts, 'Posts retrieved successfully');
                } catch (Exception $e) {
                    sendResponse(false, [], 'SQL Error: ' . $e->getMessage(), 500);
                }
            } elseif ($method === 'POST') {
                if (!isAdmin()) {
                    sendResponse(false, [], 'Unauthorized', 401);
                }

                $input = json_decode(file_get_contents('php://input'), true);
                $title = $input['title'] ?? '';
                $slug = $input['slug'] ?? '';
                $excerpt = $input['excerpt'] ?? '';
                $content = $input['content'] ?? '';
                $author = $input['author'] ?? 'Admin';
                $published_date = $input['published_date'] ?? date('Y-m-d');
                $read_time = $input['read_time'] ?? 5;
                $image_url = $input['image_url'] ?? '';

                // Generate a unique post_id
                $stmt = $db->query("SELECT MAX(CAST(SUBSTRING(post_id, 6) AS UNSIGNED)) as max_id FROM posts");
                $maxId = $stmt->fetch()['max_id'] ?? 0;
                $postId = 'post-' . ($maxId + 1);

                $db->beginTransaction();
                try {
                    $insertPost = $db->prepare("
                        INSERT INTO posts (post_id, title, slug, excerpt, content, author, published_date, read_time, image_url) 
                        VALUES (:post_id, :title, :slug, :excerpt, :content, :author, :published_date, :read_time, :image_url)
                    ");
                    $insertPost->execute([
                        'post_id' => $postId,
                        'title' => $title,
                        'slug' => $slug,
                        'excerpt' => $excerpt,
                        'content' => $content,
                        'author' => $author,
                        'published_date' => $published_date,
                        'read_time' => $read_time,
                        'image_url' => $image_url
                    ]);

                    $insertStats = $db->prepare("INSERT INTO post_stats (post_id) VALUES (:post_id)");
                    $insertStats->execute(['post_id' => $postId]);

                    $db->commit();
                    sendResponse(true, ['post_id' => $postId], 'Post created successfully', 201);
                } catch (Exception $e) {
                    $db->rollBack();
                    throw $e;
                }
            }
            break;

        // ==================== SINGLE POST CRUD (New) ====================
        case 'post':
            $postId = $_GET['post_id'] ?? '';
            $slug = $_GET['slug'] ?? '';

            if ($method === 'GET') {
                if ($postId) {
                    $stmt = $db->prepare("SELECT * FROM posts WHERE post_id = :post_id");
                    $stmt->execute(['post_id' => $postId]);
                } elseif ($slug) {
                    $stmt = $db->prepare("SELECT * FROM posts WHERE slug = :slug");
                    $stmt->execute(['slug' => $slug]);
                } else {
                    sendResponse(false, [], 'Missing post_id or slug', 400);
                }

                $post = $stmt->fetch();
                if ($post) {
                    sendResponse(true, $post);
                } else {
                    sendResponse(false, [], 'Post not found', 404);
                }
            } elseif ($method === 'PUT') {
                if (!isAdmin()) {
                    sendResponse(false, [], 'Unauthorized', 401);
                }

                $input = json_decode(file_get_contents('php://input'), true);
                if (!$postId) {
                    sendResponse(false, [], 'Missing post_id', 400);
                }

                $stmt = $db->prepare("
                    UPDATE posts SET 
                        title = :title, slug = :slug, excerpt = :excerpt, content = :content, 
                        author = :author, published_date = :published_date, read_time = :read_time, image_url = :image_url 
                    WHERE post_id = :post_id
                ");
                $stmt->execute([
                    'title' => $input['title'],
                    'slug' => $input['slug'],
                    'excerpt' => $input['excerpt'],
                    'content' => $input['content'],
                    'author' => $input['author'] ?? 'Admin',
                    'published_date' => $input['published_date'],
                    'read_time' => $input['read_time'],
                    'image_url' => $input['image_url'],
                    'post_id' => $postId
                ]);

                sendResponse(true, [], 'Post updated successfully');
            } elseif ($method === 'DELETE') {
                if (!isAdmin()) {
                    sendResponse(false, [], 'Unauthorized', 401);
                }

                if (!$postId) {
                    sendResponse(false, [], 'Missing post_id', 400);
                }

                $stmt = $db->prepare("DELETE FROM posts WHERE post_id = :post_id");
                $stmt->execute(['post_id' => $postId]);

                sendResponse(true, [], 'Post deleted successfully');
            }
            break;

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

        // ==================== COMMENTS ENDPOINT ====================
        case 'comments':
            if ($method === 'GET') {
                $postId = $_GET['post_id'] ?? '';
                if (!$postId) {
                    sendResponse(false, [], 'Missing post_id', 400);
                }

                $stmt = $db->prepare("SELECT * FROM post_comments WHERE post_id = :post_id ORDER BY created_at ASC");
                $stmt->execute(['post_id' => $postId]);
                $comments = $stmt->fetchAll();

                sendResponse(true, $comments);
            } elseif ($method === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
                $postId = $input['post_id'] ?? '';
                $parentId = $input['parent_id'] ?? null;
                $authorName = $input['author_name'] ?? '';
                $content = $input['content'] ?? '';
                $sessionId = getSessionID();

                if (!$postId || !$authorName || !$content) {
                    sendResponse(false, [], 'Missing required fields', 400);
                }

                // CHECK FOR BANNED WORDS
                $lowercaseContent = mb_strtolower($content, 'UTF-8');
                foreach (BANNED_WORDS as $word) {
                    if (strpos($lowercaseContent, mb_strtolower($word, 'UTF-8')) !== false) {
                        sendResponse(false, [], 'Bình luận chứa nội dung không phù hợp (Banned word: ' . $word . ')', 403);
                    }
                }

                $db->beginTransaction();
                try {
                    $stmt = $db->prepare("
                        INSERT INTO post_comments (post_id, parent_id, author_name, content, session_id) 
                        VALUES (:post_id, :parent_id, :author_name, :content, :session_id)
                    ");
                    $stmt->execute([
                        'post_id' => $postId,
                        'parent_id' => $parentId,
                        'author_name' => $authorName,
                        'content' => $content,
                        'session_id' => $sessionId
                    ]);

                    // Update comment count in stats
                    $updateStats = $db->prepare("UPDATE post_stats SET total_comments = total_comments + 1 WHERE post_id = :post_id");
                    $updateStats->execute(['post_id' => $postId]);

                    $db->commit();
                    sendResponse(true, ['id' => $db->lastInsertId()], 'Comment posted successfully');
                } catch (Exception $e) {
                    $db->rollBack();
                    throw $e;
                }
            } elseif ($method === 'DELETE') {
                if (!isAdmin()) {
                    sendResponse(false, [], 'Unauthorized', 401);
                }

                $commentId = $_GET['id'] ?? '';
                if (!$commentId) {
                    sendResponse(false, [], 'Missing comment id', 400);
                }

                $db->beginTransaction();
                try {
                    // Get post_id first to update stats
                    $stmt = $db->prepare("SELECT post_id FROM post_comments WHERE id = :id");
                    $stmt->execute(['id' => $commentId]);
                    $comment = $stmt->fetch();

                    if (!$comment) {
                        sendResponse(false, [], 'Comment not found', 404);
                    }

                    // Delete comment (Cascade will handle replies if set up, or we do it manually)
                    $stmt = $db->prepare("DELETE FROM post_comments WHERE id = :id");
                    $stmt->execute(['id' => $commentId]);

                    // Update stats
                    $updateStats = $db->prepare("UPDATE post_stats SET total_comments = GREATEST(0, total_comments - 1) WHERE post_id = :post_id");
                    $updateStats->execute(['post_id' => $comment['post_id']]);

                    $db->commit();
                    sendResponse(true, [], 'Comment deleted successfully');
                } catch (Exception $e) {
                    $db->rollBack();
                    throw $e;
                }
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
