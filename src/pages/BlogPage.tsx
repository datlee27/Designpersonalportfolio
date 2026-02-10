import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { blogPosts } from '../data/blogPosts';
import { BlogNavigation } from '../components/BlogNavigation';
import { BlogFooter } from '../components/BlogFooter';
import { useAllBlogStats } from '../hooks/useBlogAnalytics';

export function BlogPage() {
    const heroRef = useRef(null);
    const { stats: allStats } = useAllBlogStats();

    // Custom cursor follower (simplified version of legacy effect)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#fff] font-sans">
            <BlogNavigation />

            {/* Hero Section */}
            <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black text-white">
                <div className="absolute inset-0 z-0 opacity-40">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
                        alt="Background"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />

                <div className="relative z-20 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-none mb-2 tracking-tighter">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">The Developer's</span>
                            <span className="block text-[#FF5722] italic">Journey</span>
                        </h1>
                        <div className="inline-block px-4 py-1 border border-white/30 rounded-full backdrop-blur-sm mt-6">
                            <span className="text-sm font-medium tracking-widest uppercase">Tech Blog & Insights</span>
                        </div>
                    </motion.div>
                </div>


            </section>

            {/* Featured Header */}
            <section className="pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[2px] w-12 bg-[#FF5722]"></div>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-[#333333]">Featured Stories</h2>
                    </div>
                </div>
            </section>

            {/* Blog List */}
            <section className="pb-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="space-y-16">
                        {blogPosts.map((post, index) => {
                            const postStats = allStats[`post-${post.id}`] || { views: 0, likes: 0 };
                            return (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link to={`/blog/${post.id}`} className="grid md:grid-cols-[400px_1fr] gap-8 md:gap-12 items-center">
                                        <div className="aspect-[4/3] md:aspect-[4/3] overflow-hidden rounded-sm relative">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                                            <ImageWithFallback
                                                src={post.image}
                                                alt={post.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="py-4">
                                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest text-[#999999] uppercase mb-4">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 bg-[#DDDDDD] rounded-full"></span>
                                                <span>{post.readTime}</span>
                                                <span className="w-1 h-1 bg-[#DDDDDD] rounded-full hidden sm:block"></span>
                                                <div className="flex items-center gap-3 normal-case tracking-normal">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span>{postStats.views.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-3.5 h-3.5" />
                                                        <span>{postStats.likes.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-black italic text-[#333333] mb-4 group-hover:text-[#FF5722] transition-colors leading-tight">
                                                {post.title}
                                            </h2>

                                            <p className="text-[#666666] mb-6 leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-2 text-[#333333] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                                                <span>Read Article</span>
                                                <ArrowRight className="w-4 h-4 text-[#FF5722]" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <BlogFooter />

            {/* Fixed Social Sidebar (Right) */}
            <div className="hidden md:flex flex-col gap-3 fixed right-8 top-1/2 -translate-y-1/2 z-50">
                <a
                    href="https://github.com/datlee27"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#FF5722] transition-colors bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-sm hover:shadow-md"
                    title="GitHub"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a
                    href="https://www.facebook.com/le.van.at.760768"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-[#FF5722] transition-colors bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-sm hover:shadow-md"
                    title="Facebook"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
            </div>
        </div>
    );
}
