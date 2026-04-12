import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { usePostAnalytics } from '../hooks/useBlogAnalytics';
import { blogService, Post } from '../services/blogService';

export function BlogPostPage() {
    const { id: slug } = useParams(); // URL parameter is now the slug
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    
    // We'll use the final post_id for analytics once fetched
    const { stats, toggleLike } = usePostAnalytics(post?.post_id || '');
    
    const chiselEasing = [0.2, 0, 0, 1];

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPost = async () => {
            if (slug) {
                const data = await blogService.getPostBySlug(slug);
                setPost(data);
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

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
            <Navigation />

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
                                className="text-huge md:text-[8rem] leading-[0.85] tracking-tighter mb-12"
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
                                className="brutalist-content font-medium text-2xl leading-[1.3] text-ink/90 
                                [&_h2]:text-6xl [&_h2]:font-heading [&_h2]:mt-20 [&_h2]:mb-8 [&_h2]:leading-none
                                [&_h3]:text-4xl [&_h3]:font-heading [&_h3]:mt-16 [&_h3]:mb-6
                                [&_p]:mb-10
                                [&_blockquote]:border-l-[12px] [&_blockquote]:border-accent [&_blockquote]:pl-10 [&_blockquote]:my-16 [&_blockquote]:font-heading [&_blockquote]:text-5xl [&_blockquote]:leading-tight [&_blockquote]:text-ink
                                [&_code]:bg-accent [&_code]:text-ink [&_code]:px-2 [&_code]:py-1 [&_code]:font-bold [&_code]:text-xl
                                [&_ul]:list-none [&_ul_li]:before:content-['■'] [&_ul_li]:before:text-accent [&_ul_li]:before:mr-4 [&_ul_li]:mb-4
                              "
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

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
