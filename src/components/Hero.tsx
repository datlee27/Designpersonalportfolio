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
  const thinkX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const thinkY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const thinkSpacing = useTransform(scrollYProgress, [0, 1], ["-0.05em", "0.1em"]);

  // "MAKE" - Slips further left and scales
  const makeX = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const makeScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const makeSpacing = useTransform(scrollYProgress, [0, 1], ["-0.02em", "0.15em"]);

  // "IMPACT" - Drifts Right & Down
  const impactX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const impactY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const impactSpacing = useTransform(scrollYProgress, [0, 1], ["-0.05em", "0.1em"]);

  // Side Block Motion
  const sideX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Background Reactive Elements
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.2]);
  const blueprintOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.05]);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cinematicEasing = [0.16, 1, 0.3, 1] as const;

  const colors = {
    bg: 'oklch(14% 0.015 260)',
    accent: 'oklch(70% 0.18 250)',
    accentGlow: 'oklch(70% 0.18 250 / 0.15)',
    text: 'oklch(98% 0.01 260)',
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative min-h-[140vh] flex flex-col pt-24 md:pt-32 pb-24 overflow-hidden"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Glows */}
        <motion.div 
          style={{ opacity: glowOpacity, backgroundColor: colors.accentGlow }}
          className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] rounded-full blur-[120px] pointer-events-none optimize-gpu"
        />
        <motion.div 
          style={{ 
            opacity: glowOpacity, 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]),
            backgroundColor: colors.accentGlow 
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none optimize-gpu"
        />
        
        {/* Blueprint Pattern */}
        <motion.div 
          style={{ opacity: blueprintOpacity }}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        >
          <img 
            src="/assets/img/blueprint.png" 
            alt="" 
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>

        {/* Technical Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ 
            backgroundImage: `linear-gradient(to right, ${colors.text} 1px, transparent 1px), linear-gradient(to bottom, ${colors.text} 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
      </div>

      <motion.div 
        style={{ opacity, scale, rotateX, perspective: 2000 }}
        className="container mx-auto px-6 relative z-10 flex-grow flex flex-col optimize-gpu"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Main Typography Block */}
          <div className="lg:col-span-8 flex flex-col pt-12">
            <h1 className="relative flex flex-col items-start font-heading leading-[0.75] select-none">
              {/* THINK */}
              <motion.div
                style={{ x: thinkX, y: thinkY, letterSpacing: thinkSpacing }}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: cinematicEasing, delay: 0.1 }}
                className="text-[18vw] md:text-[16vw] lg:text-[14vw] tracking-tighter will-change-transform optimize-gpu"
              >
                THINK
              </motion.div>

              {/* MAKE */}
              <motion.div
                style={{ 
                  x: makeX,
                  scale: makeScale, 
                  letterSpacing: makeSpacing,
                  WebkitTextStroke: `1px ${colors.text}`,
                  color: 'transparent'
                }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: cinematicEasing, delay: 0.3 }}
                className="text-[18vw] md:text-[16vw] lg:text-[14vw] tracking-tighter italic will-change-transform optimize-gpu ml-[1.5em] lg:ml-[2em]"
              >
                MAKE
              </motion.div>

              {/* IMPACT */}
              <motion.div
                style={{ x: impactX, y: impactY, letterSpacing: impactSpacing }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: cinematicEasing, delay: 0.5 }}
                className="text-[18vw] md:text-[16vw] lg:text-[14vw] tracking-tighter will-change-transform optimize-gpu"
              >
                IMPACT
              </motion.div>
            </h1>
          </div>

          {/* Side Info Block */}
          <motion.div
            style={{ x: sideX, opacity: sideOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.8 }}
            className="lg:col-span-4 flex flex-col gap-8 lg:pt-32"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-accent" style={{ backgroundColor: colors.accent }} />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] opacity-80">
                  Technical Artisan & Fullstack Developer
                </span>
              </div>
              
              <p className="max-w-xs text-sm md:text-base font-sans leading-relaxed opacity-60">
                I build scalable digital products with clean code, thoughtful design, and real-world impact.
              </p>
            </div>

            <button
              onClick={scrollToWork}
              className="group self-start flex items-center gap-4 py-2 text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-300"
            >
              <span className="group-hover:text-accent transition-colors duration-300">
                View Projects
              </span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Industrial Accents */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0.2, 0]) }}
        className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-2 text-[9px] font-mono tracking-[0.3em] uppercase opacity-20"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
          <span>System Status: Operational</span>
        </div>
        <div>Coordinates: 10.7626° N, 106.6602° E</div>
      </motion.div>
    </section>
  );
}
