import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { blogPosts } from '../data/blogPosts';
import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { usePostAnalytics } from '../hooks/useBlogAnalytics';

export function BlogPostPage() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === Number(id));
    const analyticsId = `post-${id}`;
    const { stats, toggleLike } = usePostAnalytics(analyticsId);
    const chiselEasing = [0.2, 0, 0, 1];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-ink font-heading bg-paper">
                <div className="text-center">
                    <h2 className="text-huge mb-4">404</h2>
                    <Link to="/blog" className="text-accent underline font-bold text-2xl uppercase">Back to Archive</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-ink pb-32">
            <Navigation />

            <section className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-4 mb-16 text-ink/40 hover:text-ink transition-colors font-heading text-2xl group"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                        BACK TO INDEX
                    </Link>

                    <motion.article
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <header className="mb-24 relative">
                            <motion.h1 
                                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                                transition={{ duration: 0.6, ease: chiselEasing }}
                                className="text-huge md:text-[10rem] leading-[0.85] tracking-tighter mb-12 mix-blend-multiply"
                            >
                                {post.title}
                            </motion.h1>

                            <div className="grid md:grid-cols-3 gap-8 items-start">
                                <div className="chisel-block-accent p-6 misaligned-left">
                                    <h2 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Metadata</h2>
                                    <div className="flex flex-col gap-2 font-heading text-2xl">
                                      <div className="flex items-center gap-2">
                                          <Calendar className="w-5 h-5" />
                                          <span>{post.date}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <Clock className="w-5 h-5" />
                                          <span>{post.readTime}</span>
                                      </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-8 border-l-8 border-ink pl-8 py-4">
                                        <button
                                            onClick={toggleLike}
                                            className={`flex items-center gap-4 transition-colors font-heading text-4xl ${stats.isLiked ? 'text-accent' : 'hover:text-accent'}`}
                                        >
                                            <Heart className={`w-8 h-8 ${stats.isLiked ? 'fill-current' : ''}`} />
                                            <span>{stats.likes.toLocaleString()} INTERESTED</span>
                                        </button>
                                        <div className="h-1 flex-1 bg-ink/10" />
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="relative mb-24 chisel-block p-1 md:p-4 overflow-hidden min-h-[500px]">
                           <div className="absolute inset-0 bg-accent/20 mix-blend-hard-light z-10 pointer-events-none" />
                            <ImageWithFallback
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover filter grayscale"
                            />
                        </div>

                        <div className="max-w-4xl mx-auto">
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

                        <footer className="mt-32 pt-16 border-t-8 border-ink flex flex-col md:flex-row justify-between items-center gap-12">
                            <div className="text-huge leading-none font-heading opacity-10 select-none">END TRANSCRIPT</div>
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

