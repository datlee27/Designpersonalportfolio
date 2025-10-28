import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-gray-400 tracking-widest uppercase"
          >
            Portfolio
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
            style={{ 
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              lineHeight: '1.1',
              fontWeight: '800',
              letterSpacing: '-0.02em'
            }}
          >
            WEBSITE
            <br />
            DEVELOPER
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Crafting minimalist, modern web experiences with precision and creativity
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-4 justify-center"
          >
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </button>
            <a
              href="#contact"
              className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
