// ==================== VIEW & LIKE TRACKING SYSTEM ====================

/**
 * Blog Analytics System
 * - View tracking: Count after 8 seconds, prevent spam with localStorage
 * - Like system: Toggle like/unlike with localStorage persistence
 */

class BlogAnalytics {
    constructor() {
        this.VIEW_DELAY = 8000; // 8 seconds
        this.STORAGE_PREFIX = 'blog_';
        this.viewTimers = new Map();
        this.init();
    }

    init() {
        this.initializeViewTracking();
        this.initializeLikeSystem();
        this.loadLikedStates();
    }

    // ==================== VIEW TRACKING ====================

    initializeViewTracking() {
        const posts = document.querySelectorAll('[data-post-id]');

        posts.forEach(post => {
            const postId = post.dataset.postId;

            // Check if already viewed in last 24 hours
            if (this.hasViewedRecently(postId)) {
                console.log(`📊 Post ${postId}: Already viewed recently`);
                return;
            }

            // Start timer when page loads
            const timer = setTimeout(() => {
                this.recordView(postId);
            }, this.VIEW_DELAY);

            this.viewTimers.set(postId, timer);
        });

        // Clear timers if user leaves before 8 seconds
        window.addEventListener('beforeunload', () => {
            this.viewTimers.forEach(timer => clearTimeout(timer));
        });
    }

    hasViewedRecently(postId) {
        const key = `${this.STORAGE_PREFIX}view_${postId}`;
        const lastView = localStorage.getItem(key);

        if (!lastView) return false;

        const lastViewTime = parseInt(lastView);
        const now = Date.now();
        const hoursPassed = (now - lastViewTime) / (1000 * 60 * 60);

        // Return true if viewed within last 24 hours
        return hoursPassed < 24;
    }

    recordView(postId) {
        // Save view timestamp
        const key = `${this.STORAGE_PREFIX}view_${postId}`;
        localStorage.setItem(key, Date.now().toString());

        // Update view count in UI
        this.incrementViewCount(postId);

        // In production, send to backend
        this.sendViewToBackend(postId);

        console.log(`✅ View recorded for post: ${postId}`);
    }

    incrementViewCount(postId) {
        const viewElement = document.querySelector(`.view-count[data-post-id="${postId}"] .view-number`);
        if (viewElement) {
            const currentCount = parseInt(viewElement.textContent);
            viewElement.textContent = currentCount + 1;

            // Add animation
            viewElement.style.transform = 'scale(1.2)';
            viewElement.style.color = 'var(--primary-orange)';
            setTimeout(() => {
                viewElement.style.transform = 'scale(1)';
                viewElement.style.color = '';
            }, 300);
        }
    }

    sendViewToBackend(postId) {
        // Simulate API call
        // In production, replace with actual endpoint
        /*
        fetch('/api/posts/view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: postId,
                timestamp: Date.now()
            })
        })
        .then(response => response.json())
        .then(data => console.log('View recorded:', data))
        .catch(error => console.error('Error recording view:', error));
        */
        console.log(`📤 Would send view to backend: POST /api/posts/${postId}/view`);
    }

    // ==================== LIKE SYSTEM ====================

    initializeLikeSystem() {
        const likeButtons = document.querySelectorAll('.like-btn');

        likeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const postId = btn.dataset.postId;
                this.toggleLike(postId, btn);
            });
        });
    }

    loadLikedStates() {
        const likeButtons = document.querySelectorAll('.like-btn');

        likeButtons.forEach(btn => {
            const postId = btn.dataset.postId;
            const isLiked = this.isPostLiked(postId);

            if (isLiked) {
                this.setLikedState(btn, true);
            }
        });
    }

    isPostLiked(postId) {
        const key = `${this.STORAGE_PREFIX}like_${postId}`;
        return localStorage.getItem(key) === 'true';
    }

    toggleLike(postId, button) {
        const isCurrentlyLiked = this.isPostLiked(postId);
        const newLikedState = !isCurrentlyLiked;

        // Update localStorage
        const key = `${this.STORAGE_PREFIX}like_${postId}`;
        localStorage.setItem(key, newLikedState.toString());

        // Update UI
        this.setLikedState(button, newLikedState);
        this.updateLikeCount(button, newLikedState);

        // Send to backend
        this.sendLikeToBackend(postId, newLikedState);

        // Animation
        this.animateLike(button, newLikedState);

        console.log(`${newLikedState ? '❤️' : '💔'} Post ${postId} ${newLikedState ? 'liked' : 'unliked'}`);
    }

    setLikedState(button, isLiked) {
        if (isLiked) {
            button.classList.add('liked');
            button.querySelector('svg').style.fill = 'var(--primary-orange)';
            button.querySelector('svg').style.stroke = 'var(--primary-orange)';
        } else {
            button.classList.remove('liked');
            button.querySelector('svg').style.fill = 'none';
            button.querySelector('svg').style.stroke = 'currentColor';
        }
    }

    updateLikeCount(button, isLiked) {
        const countSpan = button.querySelector('.like-number');
        if (countSpan) {
            const currentCount = parseInt(countSpan.textContent);
            const newCount = isLiked ? currentCount + 1 : currentCount - 1;
            countSpan.textContent = Math.max(0, newCount); // Prevent negative counts
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
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            animation: floatUp 1s ease-out forwards;
            left: ${button.offsetLeft}px;
            top: ${button.offsetTop}px;
        `;

        button.parentElement.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }

    sendLikeToBackend(postId, isLiked) {
        // Simulate API call
        // In production, replace with actual endpoint
        /*
        fetch(`/api/posts/${postId}/like`, {
            method: isLiked ? 'POST' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timestamp: Date.now()
            })
        })
        .then(response => response.json())
        .then(data => console.log('Like updated:', data))
        .catch(error => console.error('Error updating like:', error));
        */
        console.log(`📤 Would send to backend: ${isLiked ? 'POST' : 'DELETE'} /api/posts/${postId}/like`);
    }

    // ==================== UTILITY METHODS ====================

    clearAllData() {
        // For debugging: clear all blog data
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.STORAGE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
        console.log('🗑️ All blog analytics data cleared');
    }

    getAnalytics() {
        // For debugging: show all analytics data
        const analytics = {
            views: {},
            likes: {}
        };

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(`${this.STORAGE_PREFIX}view_`)) {
                const postId = key.replace(`${this.STORAGE_PREFIX}view_`, '');
                analytics.views[postId] = new Date(parseInt(localStorage.getItem(key)));
            } else if (key.startsWith(`${this.STORAGE_PREFIX}like_`)) {
                const postId = key.replace(`${this.STORAGE_PREFIX}like_`, '');
                analytics.likes[postId] = localStorage.getItem(key) === 'true';
            }
        });

        return analytics;
    }
}

// ==================== OTHER FEATURES ====================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');

        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email) {
            // Show success message
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            emailInput.value = '';
        }
    });
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe blog cards
document.querySelectorAll('.blog-post-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < 600) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to post images
document.querySelectorAll('.post-image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', () => {
        wrapper.style.cursor = 'pointer';
    });
});

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
            transform: translateY(-50px) scale(1.5);
        }
    }

    .like-btn {
        transition: transform 0.2s ease;
    }

    .like-btn.liked svg {
        fill: var(--primary-orange);
        stroke: var(--primary-orange);
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZE ====================

// Initialize analytics system
const analytics = new BlogAnalytics();

// Expose to window for debugging
window.blogAnalytics = analytics;

console.log('🎉 Blog page loaded successfully!');
console.log('📊 Analytics system initialized');
console.log('💡 Debug commands:');
console.log('  - blogAnalytics.getAnalytics() - View all analytics data');
console.log('  - blogAnalytics.clearAllData() - Clear all analytics data');
