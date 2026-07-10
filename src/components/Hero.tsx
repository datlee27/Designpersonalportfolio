import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Global scroll-driven states
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  // "THINK" - Drifts Left & Up
  const thinkX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const thinkY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const thinkScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // "MAKE" - Central, slow expansion
  const makeScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // "IMPACT" - Drifts Right & Down
  const impactX = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const impactY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const impactScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Background Reactive Elements
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const cinematicEasing = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative min-h-[120vh] flex flex-col items-center pt-40 pb-24 overflow-hidden bg-ink text-paper"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ opacity: glowOpacity, y: glowY, willChange: 'transform, opacity' }}
          className="absolute top-[5%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-accent/10 blur-[80px] pointer-events-none optimize-gpu"
        />
        <motion.div 
          style={{ 
            opacity: glowOpacity, 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
            willChange: 'transform, opacity'
          }}
          className="absolute bottom-[5%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-[80px] pointer-events-none optimize-gpu"
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--paper) 1px, transparent 0)`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      <motion.div 
        style={{ opacity, scale, rotateX, perspective: 1500 }}
        className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center optimize-gpu"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: cinematicEasing }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="h-[1px] w-8 bg-current opacity-20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">
              Technical Artisan & Fullstack Developer
            </span>
            <div className="h-[1px] w-8 bg-current opacity-20" />
          </motion.div>

          <h1 className="relative flex flex-col items-center text-center font-heading leading-[0.8] mb-20 select-none">
            {/* THINK */}
            <motion.div
              style={{ x: thinkX, y: thinkY, scale: thinkScale }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.1 }}
              className="text-[15vw] md:text-[14vw] lg:text-[12vw] tracking-tighter will-change-transform optimize-gpu"
            >
              THINK
            </motion.div>

            {/* MAKE */}
            <motion.div
              style={{ 
                scale: makeScale, 
                WebkitTextStroke: `1px var(--paper)`,
                color: 'transparent'
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.3 }}
              className="text-[15vw] md:text-[14vw] lg:text-[12vw] tracking-tighter italic will-change-transform optimize-gpu pr-[0.3em]"
            >
              MAKE
            </motion.div>

            {/* IMPACT */}
            <motion.div
              style={{ x: impactX, y: impactY, scale: impactScale }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.5 }}
              className="text-[15vw] md:text-[14vw] lg:text-[12vw] tracking-tighter will-change-transform optimize-gpu"
            >
              IMPACT
            </motion.div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: cinematicEasing, delay: 0.7 }}
            className="flex flex-col items-center gap-12"
          >
            <p className="max-w-2xl text-center text-base md:text-lg font-sans leading-relaxed opacity-60">
              Bridging the gap between <span className="text-accent">visionary design</span> and <span className="font-bold">flawless engineering</span>. Building digital systems that resonate and endure.
            </p>

            <a
              href="#projects"
              className="group relative flex flex-col items-center gap-4 py-6 px-16 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 border border-current opacity-10 group-hover:opacity-30 transition-opacity" />
              <div 
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-accent"
              />
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.5em] group-hover:text-ink transition-colors duration-300">
                Initiate Exploration
              </span>
              <ArrowDown className="relative z-10 w-3 h-3 group-hover:translate-y-1 transition-all duration-300 group-hover:text-ink" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Meta Information */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0.1, 0]) }}
        className="absolute bottom-10 left-10 hidden lg:flex flex-col gap-1 text-[9px] font-mono tracking-[0.3em] uppercase"
      >
        <div>System Status: Nominal</div>
        <div className="text-accent">10.7626° N, 106.6602° E</div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      {/* <motion.div 
        className="absolute bottom-0 left-0 h-[2px] z-50 origin-left"
        style={{ 
          width: "100%",
          scaleX: scrollYProgress,
          backgroundColor: colors.accent,
          boxShadow: `0 0 10px ${colors.accent}`
        }}
      /> */}
    </section>
  );
}
