import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useFluidCursor } from '../hooks/useFluidCursor';

export function Hero() {
  // Use the fluid cursor hook with default settings
  const canvasRef = useFluidCursor();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden font-sans">
      {/* Canvas for fluid cursor effect */}
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        style={{ zIndex: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full" />
      </motion.div>

      <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
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
            className="mb-6 text-gray-400 tracking-widest uppercase font-medium"
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
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Passionate about merging web development and graphic design to create engaging digital experiences.
            With a solid foundation in software development and design, I bring both technical expertise and creativity to every project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-white text-black font-medium hover:bg-[#FF5722] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
            <a
              href="#contact"
              className="px-8 py-4 border border-white font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ zIndex: 20 }}
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 hover:text-[#FF5722] transition-colors duration-300"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
