-- ==================== BLOG ANALYTICS DATABASE SCHEMA ====================
-- Tạo tables cho hệ thống blog analytics
-- 
-- HƯỚNG DẪN:
-- 1. Trong phpMyAdmin, chọn một trong 3 databases có sẵn:
--    - ryxeydlbhosting_datdocidvn
--    - ryxeydlbhosting_datdocidvn_1
--    - ryxeydlbhosting_datdocidvn_2
-- 2. Sau đó chạy script này (bỏ qua phần CREATE DATABASE)
-- 3. Cập nhật tên database trong api/config.php

-- SỬ DỤNG DATABASE CÓ SẴN (không cần tạo mới)
-- USE ryxeydlbhosting_datdocidvn;  -- Chọn database của bạn

-- ==================== TABLE: admins ====================
-- Lưu thông tin quản trị viên
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Mật khẩu mặc định là 'admin123' (hash bên dưới là cho admin123)
INSERT IGNORE INTO admins (username, password_hash) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- ==================== TABLE: posts ====================
-- Lưu thông tin các bài viết
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(100) DEFAULT 'Admin',
    published_date DATE,
    read_time INT DEFAULT 5,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_post_id (post_id),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== TABLE: post_stats ====================
-- Lưu thống kê views và likes cho mỗi bài viết
CREATE TABLE IF NOT EXISTS post_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    total_views INT DEFAULT 0,
    total_likes INT DEFAULT 0,
    total_comments INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    UNIQUE KEY unique_post_stats (post_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== TABLE: post_views ====================
-- Lưu lịch sử views (để tracking và analytics)
CREATE TABLE IF NOT EXISTS post_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    user_ip VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(100),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_viewed_at (viewed_at),
    INDEX idx_session_id (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== TABLE: post_likes ====================
-- Lưu thông tin likes của users
CREATE TABLE IF NOT EXISTS post_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    user_ip VARCHAR(45),
    session_id VARCHAR(100) NOT NULL,
    is_liked BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_like (post_id, session_id),
    INDEX idx_post_id (post_id),
    INDEX idx_session_id (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== TABLE: post_comments ====================
-- Lưu bình luận và phản hồi của bài viết
CREATE TABLE IF NOT EXISTS post_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    parent_id INT DEFAULT NULL,
    author_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES post_comments(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==================== INSERT SAMPLE DATA ====================
-- Thêm dữ liệu mẫu cho 2 bài viết

INSERT INTO posts (post_id, title, slug, excerpt, published_date, read_time, image_url) VALUES
('post-1', 'Modern React Patterns', 'modern-react-patterns', 
 'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading...', 
 '2025-10-20', 5, 
 'https://images.unsplash.com/photo-1543058871-74a1d669ba70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
 
('post-2', 'Mastering CSS Grid', 'mastering-css-grid', 
 'A comprehensive guide to CSS Grid Layout and how to create complex responsive layouts with ease. Learn the fundamentals and advanced techniques...', 
 '2025-10-15', 8, 
 'https://images.unsplash.com/photo-1558655146-d09347e92766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080');

-- Khởi tạo stats cho các bài viết
INSERT INTO post_stats (post_id, total_views, total_likes) VALUES
('post-1', 0, 0),
('post-2', 0, 0);

-- ==================== STORED PROCEDURES ====================

-- Procedure để tăng view count
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS increment_view_count(IN p_post_id VARCHAR(50))
BEGIN
    UPDATE post_stats 
    SET total_views = total_views + 1 
    WHERE post_id = p_post_id;
END //
DELIMITER ;

-- Procedure để toggle like
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS toggle_like(
    IN p_post_id VARCHAR(50),
    IN p_session_id VARCHAR(100),
    IN p_user_ip VARCHAR(45)
)
BEGIN
    DECLARE like_exists INT;
    DECLARE current_state BOOLEAN;
    
    -- Check if like exists
    SELECT COUNT(*), COALESCE(MAX(is_liked), FALSE) INTO like_exists, current_state
    FROM post_likes 
    WHERE post_id = p_post_id AND session_id = p_session_id;
    
    IF like_exists > 0 THEN
        -- Toggle existing like
        UPDATE post_likes 
        SET is_liked = NOT current_state, updated_at = CURRENT_TIMESTAMP
        WHERE post_id = p_post_id AND session_id = p_session_id;
        
        -- Update stats
        IF current_state THEN
            UPDATE post_stats SET total_likes = total_likes - 1 WHERE post_id = p_post_id;
        ELSE
            UPDATE post_stats SET total_likes = total_likes + 1 WHERE post_id = p_post_id;
        END IF;
    ELSE
        -- Create new like
        INSERT INTO post_likes (post_id, session_id, user_ip, is_liked) 
        VALUES (p_post_id, p_session_id, p_user_ip, TRUE);
        
        -- Update stats
        UPDATE post_stats SET total_likes = total_likes + 1 WHERE post_id = p_post_id;
    END IF;
END //
DELIMITER ;

-- ==================== VIEWS ====================

-- View để lấy thống kê tổng hợp
CREATE OR REPLACE VIEW post_analytics AS
SELECT 
    p.post_id,
    p.title,
    p.slug,
    p.published_date,
    ps.total_views,
    ps.total_likes,
    ps.total_comments,
    (SELECT COUNT(*) FROM post_views pv WHERE pv.post_id = p.post_id AND pv.viewed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) as views_last_7_days,
    (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.post_id AND pl.is_liked = TRUE AND pl.updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) as likes_last_7_days
FROM posts p
LEFT JOIN post_stats ps ON p.post_id = p.post_id;

-- ==================== INDEXES FOR PERFORMANCE ====================
-- Đã tạo indexes trong các table definitions ở trên

-- ==================== DONE ====================
SELECT 'Database schema created successfully!' as status;
