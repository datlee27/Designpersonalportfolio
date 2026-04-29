import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { blogService, Post } from '../services/blogService';

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const chiselEasing = [0.2, 0, 0, 1] as const;

  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await blogService.getAllPosts();
      setPosts(data.slice(0, 2));
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (loading) return null;


  return (
    <section id="blog" className="py-32 bg-paper text-ink overflow-hidden border-t-8 border-ink">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <motion.h2
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: chiselEasing }}
            className="text-huge leading-none"
          >
            LATEST<br />INSIGHTS
          </motion.h2>
          <div className="text-right hidden md:block">
            <Link
              to="/blog"
              className="group flex items-center gap-4 bg-ink text-paper px-8 py-4 font-heading text-2xl hover:bg-accent hover:text-ink transition-colors duration-100"
            >
              ALL POSTS <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-24">
          {posts.map((post, index) => (
            <motion.article
              key={post.post_id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: chiselEasing, delay: index * 0.1 }}
              className={`relative group ${index % 2 !== 0 ? 'md:self-end' : ''}`}
            >
              <Link to={`/blog/${post.slug}`} className="block max-w-5xl">
                <div className="grid md:grid-cols-[1fr_400px] gap-8 bg-paper border-4 border-ink p-4 hover:misaligned-right transition-transform duration-100">
                  <div className="order-2 md:order-1 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-6 font-bold text-sm tracking-tighter text-accent">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.published_date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.read_time} min read</span>
                      </div>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight tracking-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xl font-medium leading-tight mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-2xl font-heading tracking-widest group-hover:gap-8 transition-all">
                      <span>READ TRANSCRIPT</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="order-1 md:order-2 h-80 overflow-hidden border-4 border-ink misaligned-left">
                    <ImageWithFallback
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Asymmetrical Accent block for depth */}
                <div className={`absolute -z-10 w-32 h-32 bg-accent/20 -bottom-8 ${index % 2 === 0 ? 'left-0 -translate-x-4 md:-translate-x-8' : 'right-0 translate-x-4 md:translate-x-8'} chisel-block-accent`} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

