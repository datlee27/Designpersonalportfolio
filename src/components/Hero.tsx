import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const chiselEasing = [0.2, 0, 0, 1] as const;

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-between bg-paper text-ink relative overflow-hidden">
      {/* Background Accent Block */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 0.6, ease: chiselEasing, delay: 0.2 }}
        className="absolute top-20 right-[10%] w-[30vw] h-[40vh] bg-accent chisel-block-accent opacity-20 -z-10"
      />

      <div className="container mx-auto px-6 pt-32 pb-20 flex-grow flex flex-col justify-center">
        <div className="relative group">
          {/* Main Title Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: chiselEasing }}
            className="flex flex-col items-start"
          >
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: chiselEasing }}
              className="px-2 bg-ink text-paper text-sm font-bold uppercase tracking-widest mb-4 misaligned-left"
            >
              Independent Developer
            </motion.span>

            <h1 className="text-huge text-tight leading-[0.85] flex flex-col">
              <motion.span
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ delay: 0.5, duration: 0.5, ease: chiselEasing }}
                className="relative z-10"
              >
                THINK
              </motion.span>
              <motion.span
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ delay: 0.6, duration: 0.5, ease: chiselEasing }}
                className="relative z-20 text-accent misaligned-right "
              >
                MAKE
              </motion.span>
              <motion.span
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ delay: 0.7, duration: 0.5, ease: chiselEasing }}
                className="relative z-30"
              >
                IMPACT
              </motion.span>
            </h1>
          </motion.div>

          {/* Overlapping Description Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: chiselEasing }}
            className="mt-8 md:mt-0 md:absolute md:top-1/2 md:right-0 md:max-w-md bg-paper p-8 border-4 border-ink misaligned-right z-40"
          >
            <p className="text-lg font-bold leading-tight mb-6">
              A creative web developer passionate about building modern, engaging, and user-friendly digital experiences.
            </p>
            <div className="electric-border p-[1px] inline-block">
              <button
                onClick={scrollToWork}
                className="group relative px-6 py-3 bg-ink text-paper font-bold uppercase tracking-tighter hover:bg-accent hover:text-ink transition-colors duration-100 flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mechanical Marquee System */}
      <div className="relative w-full bg-ink text-paper py-4 border-t-8 border-accent overflow-hidden z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 font-heading text-4xl uppercase tracking-tighter italic">
              <span>Fullstack Developer</span>
              <span className="text-accent">★</span>
              <span>UI Designer</span>
              <span className="text-accent px-4 opacity-50">/ / /</span>
              <span>Digital Artisan</span>
              <span className="text-accent px-8">●</span>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}
