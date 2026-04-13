const BLOG_API_URL = '/api/index.php';

export interface Post {
    post_id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    published_date: string;
    read_time: number;
    image_url: string;
    created_at?: string;
    total_views?: number;
    total_likes?: number;
    total_comments?: number;
}

export type PostCreateInput = Omit<Post, 'post_id' | 'created_at' | 'total_views' | 'total_likes'>;

export const blogService = {
    async getAllPosts(): Promise<Post[]> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=posts`);
            const result = await response.json();
            return result.success ? result.data : [];
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            return [];
        }
    },

    async getPostBySlug(slug: string): Promise<Post | null> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=post&slug=${slug}`);
            const result = await response.json();
            return result.success ? result.data : null;
        } catch (error) {
            console.error('Failed to fetch post by slug:', error);
            return null;
        }
    },

    async getPostById(postId: string): Promise<Post | null> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=post&post_id=${postId}`);
            const result = await response.json();
            return result.success ? result.data : null;
        } catch (error) {
            console.error('Failed to fetch post by id:', error);
            return null;
        }
    },

    async createPost(post: PostCreateInput): Promise<{ success: boolean; postId?: string; message?: string }> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
            const result = await response.json();
            return {
                success: result.success,
                postId: result.data?.post_id,
                message: result.message
            };
        } catch (error) {
            console.error('Failed to create post:', error);
            return { success: false, message: 'Server error during creation' };
        }
    },

    async updatePost(postId: string, post: PostCreateInput): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=post&post_id=${postId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
            const result = await response.json();
            return {
                success: result.success,
                message: result.message
            };
        } catch (error) {
            console.error('Failed to update post:', error);
            return { success: false, message: 'Server error during update' };
        }
    },

    async deletePost(postId: string): Promise<boolean> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=post&post_id=${postId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Failed to delete post:', error);
            return false;
        }
    },

    async recordView(postId: string): Promise<void> {
        try {
            await fetch(`${BLOG_API_URL}?endpoint=view`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId })
            });
        } catch (error) {
            console.error('Failed to record view:', error);
        }
    },

    async toggleLike(postId: string): Promise<{ success: boolean; is_liked?: boolean; total_likes?: number }> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId })
            });
            const result = await response.json();
            return {
                success: result.success,
                is_liked: result.data?.is_liked,
                total_likes: result.data?.total_likes
            };
        } catch (error) {
            console.error('Failed to toggle like:', error);
            return { success: false };
        }
    },

    async checkLikeStatus(postId: string): Promise<boolean> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=check-like&post_id=${postId}`);
            const result = await response.json();
            return result.success ? result.data.is_liked : false;
        } catch (error) {
            console.error('Failed to check like status:', error);
            return false;
        }
    }
};
