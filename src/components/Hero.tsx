import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and fade effects for smooth transitions
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
  // Subtle rotation without jitter
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 3]);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cinematicEasing = [0.16, 1, 0.3, 1] as const;

  // OKLCH Design Tokens - Sharper accents
  const colors = {
    bg: 'oklch(14% 0.015 260)', // Slightly lighter black for depth
    accent: 'oklch(70% 0.18 250)',
    accentGlow: 'oklch(70% 0.18 250 / 0.1)', // More transparent
    text: 'oklch(98% 0.01 260)',
    textMuted: 'oklch(60% 0.02 260)',
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center pt-40 pb-24 overflow-hidden"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Light Leak / Glow - Reduced blur for sharpness */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            x: [-15, 15, -15],
            y: [-15, 15, -15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[80px] pointer-events-none"
          style={{ backgroundColor: colors.accentGlow }}
        />
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            x: [15, -15, 15],
            y: [15, -15, 15]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: colors.accentGlow }}
        />
        
        {/* Subtle Technical Texture - Sharper, less hazy */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.text} 1px, transparent 0)`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale, rotateX, perspective: 1500 }}
        className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Label with technical detail */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: cinematicEasing }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-8 bg-current opacity-20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">
              Technical Artisan & Fullstack Developer
            </span>
            <div className="h-[1px] w-8 bg-current opacity-20" />
          </motion.div>

          {/* Main Cinematic Headline */}
          <h1 className="relative flex flex-col items-center text-center font-heading leading-[0.8] mb-16 select-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.1 }}
              className="text-[18vw] md:text-[14vw] lg:text-[12vw] tracking-tighter"
            >
              THINK
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.3 }}
              className="text-[18vw] md:text-[14vw] lg:text-[12vw] tracking-tighter italic"
              style={{ 
                WebkitTextStroke: `1px ${colors.text}`,
                color: 'transparent'
              }}
            >
              MAKE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.5 }}
              className="text-[18vw] md:text-[14vw] lg:text-[12vw] tracking-tighter"
            >
              IMPACT
            </motion.div>
          </h1>

          {/* Call to Action & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: cinematicEasing, delay: 0.7 }}
            className="flex flex-col items-center gap-12"
          >
            <p className="max-w-2xl text-center text-base md:text-lg font-sans leading-relaxed opacity-60">
              Bridging the gap between <span style={{ color: colors.accent }}>visionary design</span> and <span className="font-bold">flawless engineering</span>. Building digital systems that resonate and endure.
            </p>

            <button
              onClick={scrollToWork}
              className="group relative flex flex-col items-center gap-4 py-5 px-12 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 border border-current opacity-10 group-hover:opacity-30 transition-opacity" />
              <div 
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"
                style={{ backgroundColor: colors.accent }}
              />
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] group-hover:text-black transition-colors duration-300">
                Initiate Exploration
              </span>
              <ArrowDown className="relative z-10 w-3 h-3 group-hover:translate-y-1 transition-all duration-300 group-hover:text-black" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Meta Information */}
      <div className="absolute bottom-10 left-10 hidden lg:flex flex-col gap-1 opacity-10 text-[9px] font-mono tracking-[0.3em] uppercase">
        <div>System Status: Nominal</div>
        <div style={{ color: colors.accent }}>10.7626° N, 106.6602° E</div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-end gap-1 opacity-10 text-[9px] font-mono tracking-[0.3em] uppercase text-right">
        <div>Scroll to Explore</div>
        <div className="w-8 h-[1px] bg-current opacity-30" />
      </div>

      {/* Scroll Progress Bar (Bottom) */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] z-50 origin-left"
        style={{ 
          width: "100%",
          scaleX: scrollYProgress,
          backgroundColor: colors.accent,
          boxShadow: `0 0 10px ${colors.accent}`
        }}
      />
    </section>
  );
}
