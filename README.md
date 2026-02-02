# 🎯 Blog Analytics System - README

## 📁 Cấu Trúc Thư Mục

```
Designpersonalportfolio/
├── api/
│   ├── index.php           # API endpoints chính
│   ├── config.php          # Cấu hình database
│   └── .htaccess          # Apache configuration
├── database/
│   └── schema.sql         # Database schema
├── posts/
│   ├── post-1.html        # Bài viết 1
│   └── post-2.html        # Bài viết 2
├── blog.html              # Trang danh sách blog
├── blog-analytics.js      # Analytics (localStorage version)
├── blog-analytics-mysql.js # Analytics (MySQL version)
├── blog-script.js         # UI features
├── DATABASE_SETUP.md      # Hướng dẫn cài đặt MySQL
└── README.md              # File này
```

## 🚀 Quick Start

### Phiên Bản 1: localStorage (Đang Dùng)

**Ưu điểm:**
- ✅ Không cần server
- ✅ Setup đơn giản
- ✅ Hoạt động ngay lập tức

**Nhược điểm:**
- ❌ Dữ liệu chỉ lưu trên trình duyệt
- ❌ Không đồng bộ giữa các users
- ❌ Mất dữ liệu khi clear browser

**Cách dùng:**
```html
<!-- Trong blog.html và posts/*.html -->
<script src="blog-analytics.js"></script>
```

### Phiên Bản 2: MySQL (Khuyến Nghị)

**Ưu điểm:**
- ✅ Dữ liệu lưu trên server
- ✅ Đồng bộ giữa tất cả users
- ✅ Analytics chi tiết
- ✅ Không mất dữ liệu

**Nhược điểm:**
- ❌ Cần PHP + MySQL
- ❌ Setup phức tạp hơn

**Cách dùng:**
1. Đọc file `DATABASE_SETUP.md`
2. Setup database
3. Thay đổi script import:
```html
<!-- Trong blog.html và posts/*.html -->
<script src="blog-analytics-mysql.js"></script>
```

## 📊 Tính Năng

### 1. View Tracking
- ✅ Đếm views sau 3 giây
- ✅ Chống spam (24h cooldown)
- ✅ Tracking theo session
- ✅ Hiển thị real-time

### 2. Like System
- ✅ Toggle like/unlike
- ✅ Animation đẹp mắt
- ✅ Lưu trạng thái
- ✅ Đồng bộ giữa pages

### 3. Analytics
- ✅ Total views/likes
- ✅ Views theo thời gian
- ✅ Top posts
- ✅ User behavior tracking

## 🎨 Demo

### Console Commands

```javascript
// Xem analytics (localStorage version)
blogAnalytics.getAnalytics()

// Xóa tất cả dữ liệu
blogAnalytics.clearAllData()

// Thêm dữ liệu demo
blogAnalytics.simulateActivity("post-1", 100, 20)

// Xem analytics (MySQL version)
await blogAnalytics.getAnalytics()

// Refresh stats từ database
await blogAnalytics.refreshStats()
```

## 🔧 Cấu Hình

### Thay đổi thời gian đếm view

**localStorage version** (`blog-analytics.js`):
```javascript
this.VIEW_DELAY = 3000; // milliseconds
```

**MySQL version** (`blog-analytics-mysql.js`):
```javascript
this.VIEW_DELAY = 3000; // milliseconds
```

### Thay đổi API URL

Trong `blog-analytics-mysql.js`:
```javascript
this.API_BASE_URL = '/api/index.php';
```

### Thay đổi database credentials

Trong `api/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'blog_portfolio');
define('DB_USER', 'root');
define('DB_PASS', '');
```

## 📱 Responsive Design

Hệ thống hoạt động tốt trên:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ Tất cả browsers hiện đại

## 🔐 Bảo Mật

### localStorage Version
- Session-based tracking
- No sensitive data stored

### MySQL Version
- Prepared statements (SQL injection protection)
- Session-based authentication
- IP tracking
- CORS configuration
- Rate limiting ready

## 📈 Performance

### localStorage Version
- ⚡ Instant load
- ⚡ No server requests
- ⚡ Minimal overhead

### MySQL Version
- 🚀 Optimized queries
- 🚀 Database indexes
- 🚀 Cached results
- 🚀 Async API calls

## 🐛 Debugging

### Bật debug mode

```javascript
// Trong console
localStorage.setItem('debug', 'true')
```

### Kiểm tra API

```bash
# Test stats endpoint
curl http://localhost/api/index.php?endpoint=stats

# Test view recording
curl -X POST http://localhost/api/index.php?endpoint=view \
  -H "Content-Type: application/json" \
  -d '{"post_id":"post-1"}'
```

### Kiểm tra database

```sql
-- Xem tất cả stats
SELECT * FROM post_stats;

-- Xem views gần đây
SELECT * FROM post_views 
ORDER BY viewed_at DESC 
LIMIT 10;

-- Xem likes
SELECT * FROM post_likes 
WHERE is_liked = TRUE;
```

## 📚 API Documentation

### GET /api/index.php?endpoint=stats
Lấy stats của tất cả bài viết

**Response:**
```json
{
  "success": true,
  "data": {
    "post-1": {"views": 125, "likes": 23},
    "post-2": {"views": 89, "likes": 15}
  }
}
```

### POST /api/index.php?endpoint=view
Ghi nhận view

**Request:**
```json
{"post_id": "post-1"}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "post_id": "post-1",
    "total_views": 126
  }
}
```

### POST /api/index.php?endpoint=like
Toggle like

**Request:**
```json
{"post_id": "post-1"}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "post_id": "post-1",
    "is_liked": true,
    "total_likes": 24
  }
}
```

## 🎓 Học Thêm

### Technologies Used
- **Frontend:** Vanilla JavaScript (ES6+)
- **Backend:** PHP 7.4+
- **Database:** MySQL 5.7+
- **API:** RESTful
- **Storage:** localStorage / MySQL

### Concepts Covered
- AJAX/Fetch API
- RESTful API design
- Database design
- Session management
- Event handling
- Animations
- Responsive design

## 🤝 Contributing

Muốn cải thiện hệ thống?
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - Free to use and modify

## 💬 Support

Gặp vấn đề? Kiểm tra:
1. `DATABASE_SETUP.md` - Hướng dẫn chi tiết
2. Console logs - Xem lỗi JavaScript
3. Network tab - Kiểm tra API calls
4. Database logs - Xem lỗi SQL

---

**Made with ❤️ for your portfolio blog**