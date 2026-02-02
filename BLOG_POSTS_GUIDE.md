# Hướng Dẫn Quản Lý Blog Posts

## Cách Thêm Bài Post Mới

### Bước 1: Tạo File HTML cho Post
1. Tạo file mới trong thư mục `posts/` với tên `post-X.html` (ví dụ: `post-3.html`)
2. Copy nội dung từ một file post hiện có (ví dụ: `post-1.html`)
3. Cập nhật nội dung bài viết:
   - Thay đổi `<title>` trong `<head>`
   - Cập nhật tiêu đề trong `<h1 class="post-title">`
   - Thay đổi ngày tháng và thời gian đọc
   - Cập nhật ảnh hero (`post-hero-image`)
   - Viết nội dung bài viết trong `<div class="post-body">`
   - Cập nhật `data-post-id` để khớp với ID của post

### Bước 2: Thêm Metadata vào blog-posts-loader.js
Mở file `blog-posts-loader.js` và thêm object mới vào mảng `postsMetadata`:

```javascript
{
    id: 'post-3',                    // ID phải khớp với tên file (post-3.html)
    title: 'Tiêu đề bài viết',      // Tiêu đề hiển thị trên trang blog
    excerpt: 'Mô tả ngắn gọn...',   // Đoạn trích dẫn (2-3 câu)
    date: 'Feb 02, 2026',            // Ngày đăng
    readTime: '10 min read',         // Thời gian đọc ước tính
    image: 'URL_ảnh_thumbnail',      // URL ảnh thumbnail (nên dùng ảnh có tỷ lệ 16:9)
    author: 'Admin',                 // Tên tác giả
    authorAvatar: 'assets/img/about-pic.JPG'  // Ảnh đại diện tác giả
}
```

### Ví dụ Thêm Post Mới:

```javascript
const postsMetadata = [
    // ... các post cũ ...
    {
        id: 'post-3',
        title: 'Building Scalable APIs with Node.js',
        excerpt: 'Learn how to design and build RESTful APIs that can handle millions of requests. We\'ll cover best practices, authentication, and performance optimization.',
        date: 'Feb 02, 2026',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1080',
        author: 'Admin',
        authorAvatar: 'assets/img/about-pic.JPG'
    }
];
```

## Lưu Ý Quan Trọng

### 1. Kích Thước Ảnh
- Tất cả ảnh thumbnail sẽ tự động được cắt về kích thước **400px × 300px**
- Nên chọn ảnh có tỷ lệ khung hình **4:3** hoặc **16:9** để tránh bị cắt xấu
- Ảnh nên có độ phân giải tối thiểu **1080px** chiều rộng

### 2. ID của Post
- ID phải là duy nhất (không trùng với post khác)
- ID phải khớp với tên file HTML (ví dụ: `post-3` → `post-3.html`)
- Sử dụng format: `post-X` với X là số thứ tự

### 3. Thứ Tự Hiển Thị
- Posts sẽ hiển thị theo thứ tự trong mảng `postsMetadata`
- Post đầu tiên trong mảng sẽ hiển thị đầu tiên trên trang
- Để sắp xếp theo ngày mới nhất, đặt post mới ở đầu mảng

### 4. Excerpt (Đoạn Trích)
- Nên giữ độ dài khoảng 2-3 câu (100-150 ký tự)
- Mô tả ngắn gọn, hấp dẫn để thu hút người đọc
- Tránh viết quá dài vì sẽ bị cắt trên giao diện

## Cấu Trúc Thư Mục

```
Designpersonalportfolio/
├── blog.html                    # Trang danh sách blog
├── blog-posts-loader.js         # File quản lý metadata posts (QUAN TRỌNG!)
├── blog-style.css               # CSS cho blog
├── blog-analytics-mysql.js      # Analytics
├── blog-script.js               # Script chung
└── posts/
    ├── post-1.html              # Bài viết 1
    ├── post-2.html              # Bài viết 2
    └── post-3.html              # Bài viết 3 (mới)
```

## Kiểm Tra Sau Khi Thêm Post

1. ✅ File HTML đã được tạo trong thư mục `posts/`
2. ✅ Metadata đã được thêm vào `blog-posts-loader.js`
3. ✅ ID trong metadata khớp với tên file
4. ✅ Ảnh thumbnail hiển thị đúng
5. ✅ Link đến bài viết hoạt động (`/posts/post-X`)
6. ✅ Tiêu đề và excerpt hiển thị chính xác
7. ✅ Analytics (views, likes) hoạt động

## Xóa Post

Để xóa một post:
1. Xóa object tương ứng trong mảng `postsMetadata` (file `blog-posts-loader.js`)
2. (Tùy chọn) Xóa file HTML trong thư mục `posts/`

## Hỗ Trợ

Nếu gặp vấn đề:
- Kiểm tra Console trong DevTools (F12) để xem lỗi JavaScript
- Đảm bảo tất cả các trường trong metadata đều được điền đầy đủ
- Kiểm tra đường dẫn ảnh có chính xác không
- Đảm bảo ID không bị trùng lặp
