import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Web Design",
    excerpt: "Exploring how less can be more in modern web development. Discover the principles that guide clean, effective design.",
    image: "https://images.unsplash.com/photo-1620483474144-23931ab57ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTU5MDMxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "October 15, 2025",
    readTime: "5 min read",
    content: `
      <p>Minimalism in web design is more than just a trend—it's a philosophy that prioritizes clarity, functionality, and user experience above all else.</p>
      
      <h3>The Core Principles</h3>
      <p>At its heart, minimalist design is about removing the unnecessary. Every element should serve a purpose, contributing to the overall user experience without adding clutter or confusion.</p>
      
      <p>White space, also known as negative space, is one of the most powerful tools in a minimalist designer's arsenal. It provides visual breathing room, helps guide the user's eye, and creates a sense of sophistication and elegance.</p>
      
      <h3>Typography Matters</h3>
      <p>In minimalist design, typography often becomes the hero. With fewer visual elements competing for attention, the choice of typeface, size, and spacing becomes crucial. A well-chosen font can convey personality and mood while maintaining readability.</p>
      
      <h3>Color as an Accent</h3>
      <p>Minimalist designs often employ monochromatic or limited color palettes. When color is used sparingly, it becomes more impactful, drawing attention to key elements and calls-to-action.</p>
      
      <p>The challenge—and the beauty—of minimalist design lies in achieving maximum impact with minimum elements. It requires careful consideration of every design decision and a deep understanding of user needs.</p>
    `
  },
  {
    id: 2,
    title: "My Journey Into Web Development",
    excerpt: "A personal reflection on the path that led me to become a developer and the lessons learned along the way.",
    image: "https://images.unsplash.com/photo-1590212151175-e58edd96185b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZGVzayUyMHNldHVwfGVufDF8fHx8MTc2MTY2Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "September 28, 2025",
    readTime: "7 min read",
    content: `
      <p>Every developer has a unique story about how they got started. Mine began with curiosity and evolved into a passion that shapes my daily life.</p>
      
      <h3>The Beginning</h3>
      <p>I still remember the first website I built—a simple HTML page with a bright blue background and Comic Sans font. It was objectively terrible, but the thrill of creating something that appeared in a browser was indescribable.</p>
      
      <p>From that moment, I was hooked. I spent countless hours learning CSS, making my pages less eye-searing and more functional. Each small victory, whether centering a div or creating my first responsive layout, felt like a major achievement.</p>
      
      <h3>The Learning Curve</h3>
      <p>Web development has a steep learning curve. There were moments of frustration, times when I questioned whether I was cut out for this. But with each challenge overcome, my confidence grew.</p>
      
      <p>I learned that the key to growth is embracing discomfort. Every error message is a learning opportunity. Every bug is a chance to understand the system better. This mindset shift transformed my approach to development.</p>
      
      <h3>Looking Forward</h3>
      <p>Today, I'm grateful for the journey. The web development landscape continues to evolve, and that's what makes it exciting. There's always something new to learn, a better way to solve a problem, or an innovative approach to try.</p>
    `
  },
  {
    id: 3,
    title: "Building with React: Best Practices",
    excerpt: "A comprehensive guide to writing clean, maintainable React code that scales with your application.",
    image: "https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE1NzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "September 10, 2025",
    readTime: "8 min read",
    content: `
      <p>React has revolutionized how we build user interfaces, but with great power comes great responsibility. Here are the practices I've found most valuable in building scalable React applications.</p>
      
      <h3>Component Organization</h3>
      <p>Keep components small and focused. Each component should do one thing well. If a component is getting too large or handling too many responsibilities, it's time to break it down into smaller pieces.</p>
      
      <h3>State Management</h3>
      <p>Not all state needs to be in a global store. Keep state as local as possible, and only lift it up when multiple components need access to it. This makes your code easier to understand and maintain.</p>
      
      <h3>Performance Optimization</h3>
      <p>Avoid premature optimization, but be aware of common pitfalls. Use React DevTools to identify performance bottlenecks. Memoization with useMemo and useCallback can help, but only when necessary.</p>
      
      <p>Remember: readable code is maintainable code. Clever solutions are impressive, but clear solutions are practical.</p>
    `
  },
  {
    id: 4,
    title: "Work-Life Balance as a Developer",
    excerpt: "Finding harmony between coding passion and personal well-being in a demanding industry.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNjMxODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "August 22, 2025",
    readTime: "6 min read",
    content: `
      <p>The tech industry is notorious for long hours and burnout. Here's what I've learned about maintaining balance while pursuing excellence in development.</p>
      
      <h3>Setting Boundaries</h3>
      <p>It's easy to let work bleed into personal time, especially when you love what you do. But sustainable productivity requires rest. I've learned to set clear boundaries—no coding after 8 PM, and weekends are for recharging.</p>
      
      <h3>The Power of Breaks</h3>
      <p>Some of my best solutions have come to me while taking a walk, not while staring at a screen. Regular breaks aren't a luxury—they're essential for creative problem-solving.</p>
      
      <h3>Continuous Learning</h3>
      <p>Stay curious, but don't feel pressure to learn every new framework. Focus on fundamentals and choose learning opportunities that align with your goals and interests.</p>
      
      <p>Remember: you're not just a developer. You're a person with interests, relationships, and needs outside of code. Honor that.</p>
    `
  }
];

interface BlogProps {
  selectedPost?: number;
  onSelectPost?: (id: number | null) => void;
}

export function Blog({ selectedPost, onSelectPost }: BlogProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <section className="min-h-screen bg-white text-black py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <button
            onClick={() => onSelectPost?.(null)}
            className="flex items-center gap-2 mb-12 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', lineHeight: '1.1' }}>
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="aspect-video mb-12 overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8'
              }}
            />
          </motion.article>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white text-black py-32">
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
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800' }}
          >
            BLOG
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 mb-16 max-w-2xl"
          >
            Thoughts on development, design, and life as a creator
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group cursor-pointer border border-gray-200 hover:border-black transition-all duration-300"
                onClick={() => onSelectPost?.(post.id)}
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl mb-3 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
