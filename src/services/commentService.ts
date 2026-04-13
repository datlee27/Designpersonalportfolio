const BLOG_API_URL = '/api/index.php';

export interface Comment {
    id: number;
    post_id: string;
    parent_id: number | null;
    author_name: string;
    content: string;
    created_at: string;
    replies?: Comment[];
}

export interface PostCommentInput {
    post_id: string;
    parent_id?: number | null;
    author_name: string;
    content: string;
}

export const commentService = {
    async getComments(postId: string): Promise<Comment[]> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=comments&post_id=${postId}`);
            const result = await response.json();
            
            if (!result.success) return [];
            
            // Build threaded tree
            const flatComments: Comment[] = result.data;
            const commentMap: Record<number, Comment> = {};
            const tree: Comment[] = [];

            flatComments.forEach(c => {
                commentMap[c.id] = { ...c, replies: [] };
            });

            flatComments.forEach(c => {
                if (c.parent_id && commentMap[c.parent_id]) {
                    commentMap[c.parent_id].replies?.push(commentMap[c.id]);
                } else {
                    tree.push(commentMap[c.id]);
                }
            });

            return tree;
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            return [];
        }
    },

    async postComment(comment: PostCommentInput): Promise<{ success: boolean; message?: string }> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            });
            const result = await response.json();
            return {
                success: result.success,
                message: result.message
            };
        } catch (error) {
            console.error('Failed to post comment:', error);
            return { success: false, message: 'Server error' };
        }
    },

    async deleteComment(commentId: number): Promise<boolean> {
        try {
            const response = await fetch(`${BLOG_API_URL}?endpoint=comments&id=${commentId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Failed to delete comment:', error);
            return false;
        }
    }
};
