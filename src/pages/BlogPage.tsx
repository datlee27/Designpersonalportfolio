import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Eye, Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { blogService, Post } from '../services/blogService';
import { Navigation } from '../components/Navigation';

export function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const chiselEasing = [0.2, 0, 0, 1];

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await blogService.getAllPosts();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-paper flex items-center justify-center font-heading text-4xl uppercase tracking-widest animate-pulse">
            Retrieving Intel Archive...
        </div>
    );

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-ink">
            <Navigation />

            {/* Header Area */}
            <header className="pt-48 pb-20 border-b-8 border-ink">
                <div className="container mx-auto px-6 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: chiselEasing }}
                    >
                        <h1 className="text-8xl font-heading leading-none tracking-tighter mb-4">THE_FEED</h1>
                        <p className="font-bold text-ink/40 uppercase tracking-widest text-xs">
                            Continuous stream of consciousness & technological exploration.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Threads Container */}
            <main className="py-20">
                <div className="container mx-auto px-6 max-w-2xl">
                    <div className="relative">
                        {/* The Vertical "Thread" Line */}
                        <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-ink/10 -z-10" />

                        <div className="flex flex-col gap-16">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.post_id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.4, ease: chiselEasing, delay: index * 0.05 }}
                                    className="relative"
                                >
                                    <div className="flex gap-6">
                                        {/* "Avatar" area */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-14 h-14 bg-ink border-4 border-accent chisel-block flex items-center justify-center text-paper font-heading text-2xl">
                                                {post.author[0]}
                                            </div>
                                            {/* Connector to next post if not last */}
                                            {index !== posts.length - 1 && (
                                                <div className="flex-grow w-1 bg-ink/10 my-4" />
                                            )}
                                        </div>

                                        {/* Content area */}
                                        <div className="flex-1 pb-12 border-b-2 border-ink/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-heading text-2xl tracking-tighter">{post.author}</span>
                                                    <span className="text-xs font-bold opacity-30 uppercase">{post.published_date}</span>
                                                </div>
                                                <MoreHorizontal className="w-6 h-6 opacity-20 hover:opacity-100 cursor-pointer transition-opacity" />
                                            </div>

                                            <Link to={`/blog/${post.slug}`} className="group">
                                                <h2 className="text-4xl font-heading leading-none tracking-tighter mb-6 group-hover:text-accent transition-colors duration-100">
                                                    {post.title}
                                                </h2>
                                                
                                                <p className="text-xl font-medium text-ink/80 leading-tight mb-8">
                                                    {post.excerpt}
                                                </p>

                                                {post.image_url && (
                                                    <div className="mb-8 border-4 border-ink misaligned-right overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                                        <ImageWithFallback 
                                                            src={post.image_url} 
                                                            alt={post.title}
                                                            className="w-full h-auto aspect-video object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </Link>

                                            {/* Interactivity Bar - Threads Style */}
                                            <div className="flex items-center gap-10">
                                                <button className="flex items-center gap-2 group/btn">
                                                    <Heart className="w-6 h-6 group-hover/btn:text-[#ff3040] group-hover/btn:fill-[#ff3040] transition-all" />
                                                    <span className="text-sm font-bold opacity-40 group-hover/btn:opacity-100">{post.total_likes}</span>
                                                </button>
                                                <button className="flex items-center gap-2 group/btn">
                                                    <MessageSquare className="w-6 h-6 group-hover/btn:text-accent transition-all" />
                                                    <span className="text-sm font-bold opacity-40 group-hover/btn:opacity-100">REPLY</span>
                                                </button>
                                                <button className="flex items-center gap-2 group/btn">
                                                    <Eye className="w-6 h-6 group-hover/btn:text-accent transition-all" />
                                                    <span className="text-sm font-bold opacity-40 group-hover/btn:opacity-100">{post.total_views}</span>
                                                </button>
                                                <button className="flex items-center gap-2 group/btn">
                                                    <Share2 className="w-6 h-6 group-hover/btn:text-accent transition-all" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="py-20 border-t-8 border-ink">
                <div className="container mx-auto px-6 text-center">
                    <p className="font-heading text-huge opacity-10 select-none">END_OF_TRANSCRIPT</p>
                </div>
            </footer>
        </div>
    );
}
