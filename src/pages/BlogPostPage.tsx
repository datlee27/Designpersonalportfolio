import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, ArrowLeft, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { usePostAnalytics } from '../hooks/useBlogAnalytics';
import { blogService, Post } from '../services/blogService';
import { commentService, Comment } from '../services/commentService';
import { authService } from '../services/authService';

export function BlogPostPage() {
    const { id: slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [commentForm, setCommentForm] = useState({ name: '', content: '' });

    // We'll use the final post_id for analytics once fetched
    const statsResult = usePostAnalytics(post?.post_id || '');
    const stats = statsResult.stats;
    const toggleLike = statsResult.toggleLike;

    const chiselEasing = [0.2, 0, 0, 1] as const;

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            if (slug) {
                const data = await blogService.getPostBySlug(slug);
                setPost(data);
                if (data) {
                    const commentData = await commentService.getComments(data.post_id);
                    setComments(commentData);
                }

                // Check admin status
                const auth = await authService.checkAuth();
                setIsAdmin(auth.logged_in);

                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post || !commentForm.name || !commentForm.content) return;

        setSubmitting(true);
        const result = await commentService.postComment({
            post_id: post.post_id,
            parent_id: replyTo,
            author_name: commentForm.name,
            content: commentForm.content
        });

        if (result.success) {
            setCommentForm({ name: '', content: '' });
            setReplyTo(null);
            // Refresh comments
            const updated = await commentService.getComments(post.post_id);
            setComments(updated);
        } else {
            alert(result.message || 'Failed to post comment');
        }
        setSubmitting(false);
    };

    const handleDeleteComment = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this comment? This cannot be undone.')) return;

        const success = await commentService.deleteComment(id);
        if (success && post) {
            const updated = await commentService.getComments(post.post_id);
            setComments(updated);
        } else {
            alert('Failed to delete comment');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-ink font-heading bg-paper animate-pulse">
                <div className="text-center">
                    <h2 className="text-huge mb-4 tracking-tighter">LOADING_INTEL</h2>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-ink font-heading bg-paper">
                <div className="text-center">
                    <h2 className="text-huge mb-4">404</h2>
                    <p className="font-bold uppercase tracking-widest mb-8 opacity-40">Record Not Found in Archive</p>
                    <Link to="/blog" className="bg-ink text-paper px-8 py-4 font-heading text-2xl hover:bg-accent hover:text-ink transition-colors">Back to Archive</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-ink pb-32">
            <Header />

            <section className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-4 mb-16 text-ink/40 hover:text-ink transition-colors font-heading text-2xl group"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                        BACK TO FEED
                    </Link>

                    <motion.article
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Header Metadata */}
                        <header className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-ink border-2 border-accent chisel-block flex items-center justify-center text-paper font-heading text-xl">
                                    {post.author[0]}
                                </div>
                                <div>
                                    <div className="font-heading text-2xl leading-none">{post.author}</div>
                                    <div className="text-xs font-bold opacity-30 uppercase tracking-widest">PUBLISHED_{post.published_date}</div>
                                </div>
                            </div>

                            <motion.h1
                                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                                transition={{ duration: 0.6, ease: chiselEasing }}
                                className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-12 font-sans"
                            >
                                {post.title}
                            </motion.h1>

                            <div className="flex flex-wrap items-center gap-12 py-8 border-y-4 border-ink/5 mb-16">
                                <div className="flex items-center gap-2 font-bold text-sm tracking-widest opacity-40 uppercase">
                                    <Clock className="w-5 h-5" />
                                    <span>{post.read_time} MIN READ</span>
                                </div>
                                <div className="h-1 flex-1 bg-ink/5" />
                                <div className="flex items-center gap-8">
                                    <button
                                        onClick={toggleLike}
                                        className={`flex items-center gap-3 font-heading text-3xl transition-colors ${stats.isLiked ? 'text-[#ff3040]' : 'hover:text-[#ff3040]'}`}
                                    >
                                        <Heart className={`w-8 h-8 ${stats.isLiked ? 'fill-current' : ''}`} />
                                        <span>{stats.likes.toLocaleString()}</span>
                                    </button>
                                    <button className="hover:text-accent transition-colors">
                                        <Share2 className="w-7 h-7" />
                                    </button>
                                    <button className="hover:text-accent transition-colors">
                                        <MoreHorizontal className="w-7 h-7" />
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.image_url && (
                            <div className="relative mb-24 chisel-block p-1 md:p-4 overflow-hidden border-4 border-ink">
                                <ImageWithFallback
                                    src={post.image_url}
                                    alt={post.title}
                                    className="w-full h-auto aspect-video object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        )}

                        {/* Post Content */}
                        <div className="max-w-3xl mx-auto">
                            <div
                                className="brutalist-content font-medium text-xl md:text-2xl leading-relaxed text-ink/80 
                                [&_h2]:text-4xl [&_h2]:md:text-5xl [&_h2]:font-bold [&_h2]:mt-20 [&_h2]:mb-8 [&_h2]:leading-snug [&_h2]:font-sans [&_h2]:tracking-tight
                                [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:mt-16 [&_h3]:mb-6 [&_h3]:font-sans
                                [&_p]:mb-10
                                [&_blockquote]:border-l-[8px] md:border-l-[12px] [&_blockquote]:border-accent [&_blockquote]:pl-10 [&_blockquote]:my-16 [&_blockquote]:font-medium [&_blockquote]:text-3xl md:text-4xl [&_blockquote]:leading-tight [&_blockquote]:text-ink/80
                                [&_code]:bg-accent/20 [&_code]:text-accent [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-sm [&_code]:font-mono [&_code]:text-lg
                                [&_ul]:list-none [&_ul_li]:before:content-['■'] [&_ul_li]:before:text-accent [&_ul_li]:before:mr-4 [&_ul_li]:mb-4
                              "
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

                        {/* Comment Section */}
                        <section className="mt-32 pt-20 border-t-8 border-ink">
                            <h3 className="text-6xl font-heading mb-16 tracking-tighter">DISCUSSION_LOG</h3>

                            {/* Comment Form */}
                            <form onSubmit={handleSubmitComment} className="mb-24 bg-ink/5 p-8 border-4 border-ink misaligned-right">
                                <h4 className="text-2xl font-bold uppercase tracking-widest mb-6">
                                    {replyTo ? `Replying to comment #${replyTo}` : 'Add to Archive'}
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Identification (Name)"
                                        required
                                        value={commentForm.name}
                                        onChange={e => setCommentForm({ ...commentForm, name: e.target.value })}
                                        className="bg-paper border-4 border-ink p-4 font-bold focus:misaligned-left outline-none"
                                    />
                                </div>
                                <textarea
                                    placeholder="Message/Insight..."
                                    required
                                    rows={4}
                                    value={commentForm.content}
                                    onChange={e => setCommentForm({ ...commentForm, content: e.target.value })}
                                    className="w-full bg-paper border-4 border-ink p-4 font-bold focus:misaligned-right outline-none mb-6"
                                />
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="bg-ink text-paper px-8 py-4 font-heading text-2xl hover:bg-accent hover:text-ink transition-all disabled:opacity-50"
                                    >
                                        {submitting ? 'PROCESSING...' : 'TRANSMIT'}
                                    </button>
                                    {replyTo && (
                                        <button
                                            type="button"
                                            onClick={() => setReplyTo(null)}
                                            className="px-8 py-4 font-bold uppercase tracking-widest text-sm opacity-40 hover:opacity-100"
                                        >
                                            Cancel Reply
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Comment List */}
                            <div className="flex flex-col gap-12">
                                {comments.length === 0 ? (
                                    <p className="font-bold opacity-30 uppercase tracking-widest italic">No insights logged yet. Be the first.</p>
                                ) : (
                                    comments.map(comment => (
                                        <CommentItem
                                            key={comment.id}
                                            comment={comment}
                                            isAdmin={isAdmin}
                                            onReply={(id) => {
                                                setReplyTo(id);
                                                window.scrollTo({ top: document.querySelector('form')?.offsetTop ? document.querySelector('form')!.offsetTop - 200 : 0, behavior: 'smooth' });
                                            }}
                                            onDelete={handleDeleteComment}
                                        />
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Post Footer */}
                        <footer className="mt-32 pt-16 border-t-8 border-ink flex flex-col md:flex-row justify-between items-center gap-12">
                            <div className="flex items-center gap-6">
                                <div className="text-huge leading-none font-heading opacity-10 select-none">END</div>
                                <div className="text-sm font-bold opacity-30 uppercase tracking-tighter">TRANSCRIPT_INDEX_{post.post_id}</div>
                            </div>
                            <Link
                                to="/blog"
                                className="group flex items-center gap-4 bg-ink text-paper px-12 py-6 font-heading text-4xl hover:bg-accent hover:text-ink transition-colors"
                            >
                                INDEX <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                            </Link>
                        </footer>
                    </motion.article>
                </div>
            </section>
        </div>
    );
}

// Recursive Comment Component
function CommentItem({ comment, onReply, onDelete, isAdmin, depth = 0 }: {
    comment: Comment;
    onReply: (id: number) => void;
    onDelete: (id: number) => void;
    isAdmin: boolean;
    depth?: number;
}) {
    return (
        <div className={`flex flex-col gap-6 ${depth > 0 ? 'ml-8 md:ml-16 border-l-4 border-ink/5 pl-6 md:pl-10 mt-8' : ''}`}>
            <div className="flex gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-ink border-2 border-accent chisel-block flex items-center justify-center text-paper font-heading text-lg shrink-0">
                    {comment.author_name[0] || '?'}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="font-heading text-xl">{comment.author_name}</span>
                        <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-lg md:text-xl text-ink/70 leading-relaxed bg-ink/5 p-4 md:p-6 border-2 border-ink md:misaligned-right">
                        {comment.content}
                    </p>
                    <div className="flex gap-6 mt-4">
                        <button
                            onClick={() => onReply(comment.id)}
                            className="text-xs font-bold uppercase tracking-widest text-accent hover:underline"
                        >
                            Reply
                        </button>
                        {isAdmin && (
                            <button
                                onClick={() => onDelete(comment.id)}
                                className="text-xs font-bold uppercase tracking-widest text-[#ff3040] hover:underline"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="flex flex-col">
                    {comment.replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            onReply={onReply}
                            onDelete={onDelete}
                            isAdmin={isAdmin}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
