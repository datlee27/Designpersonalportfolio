import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { blogPosts } from '../data/blogPosts';

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Only show first 2 posts
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <section id="blog" className="min-h-screen bg-white text-black py-32 font-sans">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', letterSpacing: '-0.02em' }}
          >
            LATEST INSIGHTS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 mb-16 max-w-2xl"
          >
            Thoughts on development, design, and life as a creator
          </motion.p>

          <div className="grid grid-cols-1 gap-12">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group bg-white rounded-lg overflow-hidden border border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/blog/${post.id}`} className="grid md:grid-cols-[400px_1fr] gap-0 md:gap-10">
                  <div className="h-[250px] md:h-[300px] overflow-hidden relative">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 md:p-0 md:py-8 md:pr-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold font-serif italic mb-4 text-black group-hover:text-[#FF5722] transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-[#FF5722] font-semibold group-hover:gap-4 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/blog"
              className="inline-block px-10 py-4 bg-black text-white font-medium hover:bg-[#FF5722] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View All Posts
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
