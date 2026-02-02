class BlogAnalytics {
    constructor() {
        this.VIEW_DELAY = 3000; // 3 seconds
        this.API_BASE_URL = '/api/index.php';

        this.viewTimers = new Map();
        this.init();
    }

    async init() {
        try {
            // Load all stats from database
            await this.loadAllStats();

            // Initialize view tracking
            this.initializeViewTracking();

            // Initialize like system
            this.initializeLikeSystem();

            // Load liked states
            await this.loadLikedStates();

            console.log('✅ Blog Analytics initialized with MySQL backend');
        } catch (error) {
            console.error('❌ Failed to initialize analytics:', error);
            this.fallbackToLocalStorage();
        }
    }

    // ==================== API CALLS ====================

    async apiCall(endpoint, method = 'GET', data = null) {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            if (data && method !== 'GET') {
                options.body = JSON.stringify(data);
            }

            const url = method === 'GET' && data
                ? `${this.API_BASE_URL}?endpoint=${endpoint}&${new URLSearchParams(data).toString()}`
                : `${this.API_BASE_URL}?endpoint=${endpoint}`;

            const response = await fetch(url, options);
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'API call failed');
            }

            return result.data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // ==================== LOAD STATS ====================

    async loadAllStats() {
        try {
            const stats = await this.apiCall('stats');

            // Display stats for all posts
            Object.keys(stats).forEach(postId => {
                this.displayViewCount(postId, stats[postId].views);
                this.displayLikeCount(postId, stats[postId].likes);
            });

            console.log('📊 Stats loaded:', stats);
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }

    async loadPostStats(postId) {
        try {
            const stats = await this.apiCall('post-stats', 'GET', { post_id: postId });
            this.displayViewCount(postId, stats.views);
            this.displayLikeCount(postId, stats.likes);
            return stats;
        } catch (error) {
            console.error(`Failed to load stats for ${postId}:`, error);
        }
    }

    // ==================== DISPLAY COUNTS ====================

    displayViewCount(postId, count) {
        const viewElements = document.querySelectorAll(`.view-count[data-post-id="${postId}"] .view-number`);
        viewElements.forEach(el => {
            el.textContent = count;
        });
    }

    displayLikeCount(postId, count) {
        const likeElements = document.querySelectorAll(`.like-btn[data-post-id="${postId}"] .like-number`);
        likeElements.forEach(el => {
            el.textContent = count;
        });
    }

    // ==================== VIEW TRACKING ====================

    initializeViewTracking() {
        const currentPostId = this.getCurrentPostId();

        if (currentPostId) {
            // We're on a post detail page
            this.trackPostView(currentPostId);
        } else {
            console.log('📊 Blog listing page - views tracked on post pages');
        }
    }

    getCurrentPostId() {
        const path = window.location.pathname;

        if (path.includes('post-1')) return 'post-1';
        if (path.includes('post-2')) return 'post-2';

        return null;
    }

    trackPostView(postId) {
        // Start timer when page loads
        const timer = setTimeout(async () => {
            await this.recordView(postId);
        }, this.VIEW_DELAY);

        this.viewTimers.set(postId, timer);

        // Clear timers if user leaves before delay
        window.addEventListener('beforeunload', () => {
            this.viewTimers.forEach(timer => clearTimeout(timer));
        });
    }

    async recordView(postId) {
        try {
            const result = await this.apiCall('view', 'POST', { post_id: postId });

            if (result.already_viewed) {
                console.log(`📊 Post ${postId}: Already viewed recently`);
                return;
            }

            // Update UI with new count
            this.animateViewCount(postId, result.total_views);

            console.log(`✅ View recorded for ${postId} (Total: ${result.total_views})`);
        } catch (error) {
            console.error('Failed to record view:', error);
        }
    }

    animateViewCount(postId, newCount) {
        const viewElements = document.querySelectorAll(`.view-count[data-post-id="${postId}"] .view-number`);

        viewElements.forEach(viewElement => {
            viewElement.textContent = newCount;

            // Add animation
            viewElement.style.transform = 'scale(1.2)';
            viewElement.style.color = '#ff6b35';
            setTimeout(() => {
                viewElement.style.transform = 'scale(1)';
                viewElement.style.color = '';
            }, 300);
        });
    }

    // ==================== LIKE SYSTEM ====================

    initializeLikeSystem() {
        const likeButtons = document.querySelectorAll('.like-btn');

        likeButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const postId = btn.dataset.postId;
                await this.toggleLike(postId, btn);
            });
        });
    }

    async loadLikedStates() {
        const likeButtons = document.querySelectorAll('.like-btn');

        for (const btn of likeButtons) {
            const postId = btn.dataset.postId;
            try {
                const result = await this.apiCall('check-like', 'GET', { post_id: postId });
                if (result.is_liked) {
                    this.setLikedState(btn, true);
                }
            } catch (error) {
                console.error(`Failed to check like status for ${postId}:`, error);
            }
        }
    }

    async toggleLike(postId, button) {
        try {
            const result = await this.apiCall('like', 'POST', { post_id: postId });

            // Update UI
            this.setLikedState(button, result.is_liked);
            this.displayLikeCount(postId, result.total_likes);

            // Animation
            this.animateLike(button, result.is_liked);

            console.log(`${result.is_liked ? '❤️' : '💔'} Post ${postId} ${result.is_liked ? 'liked' : 'unliked'} (Total: ${result.total_likes})`);
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    }

    setLikedState(button, isLiked) {
        const svg = button.querySelector('svg');

        if (isLiked) {
            button.classList.add('liked');
            if (svg) {
                svg.style.fill = '#ff6b35';
                svg.style.stroke = '#ff6b35';
            }
        } else {
            button.classList.remove('liked');
            if (svg) {
                svg.style.fill = 'none';
                svg.style.stroke = 'currentColor';
            }
        }
    }

    animateLike(button, isLiked) {
        if (isLiked) {
            // Heart pop animation
            button.style.transform = 'scale(1.3)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);

            // Create floating heart effect
            this.createFloatingHeart(button);
        } else {
            // Subtle shrink animation
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }
    }

    createFloatingHeart(button) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            font-size: 24px;
            pointer-events: none;
            animation: floatUp 1s ease-out forwards;
            left: ${button.getBoundingClientRect().left + 10}px;
            top: ${button.getBoundingClientRect().top}px;
            z-index: 9999;
        `;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    // ==================== FALLBACK TO LOCALSTORAGE ====================

    fallbackToLocalStorage() {
        console.warn('⚠️ Falling back to localStorage mode');
        // Load the old localStorage-based analytics
        const script = document.createElement('script');
        script.src = 'blog-analytics-local.js';
        document.head.appendChild(script);
    }

    // ==================== UTILITY METHODS ====================

    async getAnalytics() {
        try {
            const analytics = await this.apiCall('analytics');
            console.table(analytics);
            return analytics;
        } catch (error) {
            console.error('Failed to get analytics:', error);
        }
    }

    async refreshStats() {
        await this.loadAllStats();
        console.log('🔄 Stats refreshed');
    }
}

// Add floating heart animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.5);
        }
    }

    .like-btn {
        transition: transform 0.2s ease;
        cursor: pointer;
    }

    .like-btn:hover {
        transform: scale(1.1);
    }

    .like-btn.liked svg {
        fill: #ff6b35;
        stroke: #ff6b35;
    }

    .view-number, .like-number {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZE ====================

let analytics;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        analytics = new BlogAnalytics();
        window.blogAnalytics = analytics;
    });
} else {
    analytics = new BlogAnalytics();
    window.blogAnalytics = analytics;
}

console.log('🎉 Blog Analytics System Loaded (MySQL Version)!');
console.log('💡 Debug commands:');
console.log('  - blogAnalytics.getAnalytics() - View all analytics data');
console.log('  - blogAnalytics.refreshStats() - Refresh stats from database');
