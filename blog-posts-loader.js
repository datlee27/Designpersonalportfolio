// Cấu hình metadata cho các bài post
const postsMetadata = [
    {
        id: 'post-1',
        title: 'Modern React Patterns',
        excerpt: 'Exploring advanced React patterns and best practices for building scalable applications in 2025. Learn about hooks, context API, and state management solutions.',
        date: 'Oct 20, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1543058871-74a1d669ba70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYxNTg2NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'Admin',
        authorAvatar: 'assets/img/about-pic.JPG'
    },
    {
        id: 'post-2',
        title: 'Mastering CSS Grid',
        excerpt: 'A comprehensive guide to CSS Grid Layout and how to create complex responsive layouts with ease. Learn the fundamentals and advanced techniques.',
        date: 'Oct 15, 2025',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWdufGVufDF8fHx8MTc2MTU2NDczOXww&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'Admin',
        authorAvatar: 'assets/img/about-pic.JPG'
    },
    {
        id: 'post-3',
        title: 'Building Scalable APIs with Node.js',
        excerpt: 'Learn how to design and build RESTful APIs that can handle millions of requests. We will cover best practices, authentication, and performance optimization.',
        date: 'Feb 02, 2026',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxub2RlanMlMjBhcGl8ZW58MHx8fHwxNzM4NDg2NTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'Admin',
        authorAvatar: 'assets/img/about-pic.JPG'
    }
];

// Hàm tạo HTML cho một blog post card
function createPostCard(post) {
    return `
        <article class="blog-post-card" data-post-id="${post.id}">
            <a href="/posts/${post.id}" class="post-image-link">
                <div class="post-image-wrapper">
                    <img src="${post.image}" alt="${post.title}" class="post-image">
                </div>
            </a>
            <div class="post-content">
                <div class="post-author">
                    <div class="author-avatar">
                        <img src="${post.authorAvatar}" alt="${post.author}">
                    </div>
                    <div class="author-info">
                        <span class="author-name">${post.author}</span>
                        <span class="post-date">${post.date} • ${post.readTime}</span>
                    </div>
                </div>
                <a href="/posts/${post.id}" class="post-link">
                    <h3 class="post-title">${post.title}</h3>
                </a>
                <p class="post-excerpt">
                    ${post.excerpt}
                </p>
                <div class="post-stats">
                    <span class="stat-item view-count" data-post-id="${post.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span class="view-number">0</span> views
                    </span>
                    <button class="like-btn" data-post-id="${post.id}" aria-label="Like post">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-number">0</span>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Hàm render tất cả các posts
function renderPosts() {
    const postsContainer = document.querySelector('.blog-posts .container');

    if (!postsContainer) {
        console.error('Blog posts container not found');
        return;
    }

    // Xóa nội dung cũ
    postsContainer.innerHTML = '';

    // Render từng post
    postsMetadata.forEach(post => {
        postsContainer.innerHTML += createPostCard(post);
    });
}

// Khởi tạo khi DOM đã load
document.addEventListener('DOMContentLoaded', function () {
    renderPosts();
});

// Export để có thể sử dụng ở nơi khác nếu cần
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { postsMetadata, createPostCard, renderPosts };
}
