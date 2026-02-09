import { useState, useEffect } from 'react';

const API_BASE_URL = '/api/index.php';

export interface PostStats {
    views: number;
    likes: number;
    isLiked?: boolean;
}

export type AllStats = Record<string, PostStats>;

// Hook for fetching all stats (List Page)
export function useAllBlogStats() {
    const [stats, setStats] = useState<AllStats>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllStats = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}?endpoint=stats`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setStats(result.data);
                    }
                }
            } catch (error) {
                console.error('Failed to load all stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllStats();
    }, []);

    return { stats, loading };
}

// Hook for single post interactions (Detail Page)
export function usePostAnalytics(postId: string | number) {
    const [stats, setStats] = useState<PostStats>({ views: 0, likes: 0, isLiked: false });

    // Fetch initial stats and like status
    useEffect(() => {
        if (!postId) return;

        const fetchData = async () => {
            try {
                // Get Stats
                const statsRes = await fetch(`${API_BASE_URL}?endpoint=post-stats&post_id=${postId}`);
                const statsData = await statsRes.json();

                // Get Like Status
                const likeRes = await fetch(`${API_BASE_URL}?endpoint=check-like&post_id=${postId}`);
                const likeData = await likeRes.json();

                if (statsData.success) {
                    setStats(prev => ({
                        ...prev,
                        views: statsData.data.views,
                        likes: statsData.data.likes,
                        isLiked: likeData.success ? likeData.data.is_liked : false
                    }));
                }
            } catch (error) {
                console.error('Failed to load post analytics:', error);
            }
        };

        fetchData();
    }, [postId]);

    // Record View with Delay
    useEffect(() => {
        if (!postId) return;

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}?endpoint=view`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_id: postId })
                });
                const result = await response.json();
                if (result.success) {
                    setStats(prev => ({ ...prev, views: result.data.total_views }));
                }
            } catch (error) {
                console.error('Failed to record view:', error);
            }
        }, 3000); // 3 seconds delay per legacy logic

        return () => clearTimeout(timer);
    }, [postId]);

    const toggleLike = async () => {
        try {
            // Optimistic update
            setStats(prev => ({
                ...prev,
                likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
                isLiked: !prev.isLiked
            }));

            const response = await fetch(`${API_BASE_URL}?endpoint=like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId })
            });

            const result = await response.json();
            if (result.success) {
                // Sync with server truth
                setStats(prev => ({
                    ...prev,
                    likes: result.data.total_likes,
                    isLiked: result.data.is_liked
                }));
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
            // Revert on error could go here
        }
    };

    return { stats, toggleLike };
}
