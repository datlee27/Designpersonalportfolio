import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft, Eye, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { blogPosts } from '../data/blogPosts';
import { useEffect } from 'react';
import { BlogNavigation } from '../components/BlogNavigation';
import { BlogFooter } from '../components/BlogFooter';
import { usePostAnalytics } from '../hooks/useBlogAnalytics';

export function BlogPostPage() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === Number(id));

    // Map numeric ID to legacy string ID format
    const analyticsId = `post-${id}`;
    const { stats, toggleLike } = usePostAnalytics(analyticsId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-black font-sans bg-[#F5F5F5]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <Link to="/blog" className="text-[#FF5722] hover:underline font-medium">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333333]">
            <BlogNavigation />

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 mb-12 text-[#666666] hover:text-[#FF5722] transition-colors font-medium group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className="mb-12 text-center">
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#666666] mb-6 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#999999]" />
                                    <span>{post.date}</span>
                                </div>
                                <span className="w-1 h-1 bg-[#999999] rounded-full"></span>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#999999]" />
                                    <span>{post.readTime}</span>
                                </div>
                                <span className="w-1 h-1 bg-[#999999] rounded-full hidden sm:block"></span>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5" title="Views">
                                        <Eye className="w-4 h-4 text-[#999999]" />
                                        <span>{stats.views.toLocaleString()}</span>
                                    </div>
                                    <button
                                        onClick={toggleLike}
                                        className={`flex items-center gap-1.5 transition-colors ${stats.isLiked ? 'text-[#FF5722]' : 'hover:text-[#FF5722]'}`}
                                        title="Like this post"
                                    >
                                        <Heart className={`w-4 h-4 ${stats.isLiked ? 'fill-current' : ''}`} />
                                        <span>{stats.likes.toLocaleString()}</span>
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-[40px] md:text-[56px] font-black italic text-[#333333] leading-tight mb-8">
                                {post.title}
                            </h1>

                            <div className="w-[60px] h-[3px] bg-[#FF5722] mx-auto"></div>
                        </header>

                        <div className="relative h-[400px] md:h-[600px] w-full mb-16 rounded-lg overflow-hidden shadow-2xl">
                            <ImageWithFallback
                                src={post.image}
                                alt={post.title}
                                width={1200}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none text-[#333333] 
                            prose-headings:font-bold prose-headings:italic prose-headings:text-[#333333]
                            prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-[#FF5722] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-[#333333]
                            prose-blockquote:border-l-4 prose-blockquote:border-[#FF5722] prose-blockquote:bg-white prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-[#666666]
                            prose-code:text-[#FF5722] prose-code:bg-[#fff] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
                            prose-li:mb-2
                        ">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        <div className="mt-16 pt-8 border-t border-[#E0E0E0] flex justify-between items-center">
                            <div className="text-sm text-[#999999] italic">
                                Thanks for reading!
                            </div>
                            <div className="flex gap-4">
                                {/* Share buttons placeholder */}
                            </div>
                        </div>

                    </motion.article>
                </div>
            </section>

            <BlogFooter />
        </div>
    );
}
