import { motion } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Clock, ArrowRight, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { blogPosts } from '../data/blogPosts';
import { Navigation } from '../components/Navigation';
import { useAllBlogStats } from '../hooks/useBlogAnalytics';

export function BlogPage() {
    const { stats: allStats } = useAllBlogStats();
    const chiselEasing = [0.2, 0, 0, 1];

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-ink">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 border-b-8 border-ink overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ clipPath: 'inset(100% 0 0 0)' }}
                        animate={{ clipPath: 'inset(0% 0 0 0)' }}
                        transition={{ duration: 0.6, ease: chiselEasing }}
                    >
                        <h1 className="text-huge leading-[0.8] tracking-tighter mb-12">
                            THE<br />INTEL<br /><span className="text-accent italic">ARCHIVE.</span>
                        </h1>
                        <div className="flex flex-wrap gap-8 items-center">
                          <div className="chisel-block-accent p-4 font-heading text-4xl misaligned-left">VOL. 26</div>
                          <div className="h-1 flex-1 bg-ink/10" />
                          <p className="text-2xl font-bold max-w-sm leading-tight uppercase">
                            RAW THOUGHTS ON DEVELOPMENT, DESIGN, AND MECHANICAL SYSTEMS.
                          </p>
                        </div>
                    </motion.div>
                </div>
                
                {/* Background Subject */}
                <div className="absolute top-0 right-0 opacity-5 select-none pointer-events-none translate-x-1/4">
                  <span className="text-[30rem] font-heading leading-none">POSTS</span>
                </div>
            </section>

            {/* Blog List */}
            <section className="py-32">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col gap-32">
                        {blogPosts.map((post, index) => {
                            const postStats = allStats[`post-${post.id}`] || { views: 0, likes: 0 };
                            return (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, ease: chiselEasing, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link to={`/blog/${post.id}`} className="grid md:grid-cols-[450px_1fr] gap-12 items-start">
                                        <div className="chisel-block p-1 relative overflow-hidden h-[350px]">
                                            <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                                            <ImageWithFallback
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale transition-transform duration-700 ease-in-out group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="py-4">
                                            <div className="flex flex-wrap items-center gap-8 font-heading text-2xl text-accent mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-5 h-5" />
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                                <div className="flex items-center gap-6 text-ink/20 group-hover:text-ink transition-colors">
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="w-5 h-5" />
                                                        <span>{postStats.views.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Heart className="w-5 h-5" />
                                                        <span>{postStats.likes.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <h2 className="text-6xl md:text-[5rem] font-heading leading-[0.9] text-ink mb-8 group-hover:text-accent transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="text-2xl font-medium text-ink/80 mb-10 leading-tight line-clamp-2 md:line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 text-4xl font-heading tracking-widest group-hover:gap-8 transition-all">
                                                <span>ENTRY #{post.id}</span>
                                                <ArrowRight className="w-8 h-8 text-accent" />
                                            </div>
                                        </div>
                                    </Link>
                                    
                                    <div className="w-full h-1 bg-ink/10 mt-32" />
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

