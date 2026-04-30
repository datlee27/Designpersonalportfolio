import { motion, useScroll, useTransform, useVelocity, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useIsMobile } from '../hooks/useIsMobile';

// ═════════════════════════════════════════════════════════════════════
// Orchestrator — delegates to the correct variant, no layout logic
// ═════════════════════════════════════════════════════════════════════
export function About() {
  const isMobile = useIsMobile(1024);
  return isMobile ? <AboutMobile /> : <AboutDesktop />;
}

// ═════════════════════════════════════════════════════════════════════
// Desktop variant — scroll-driven slide transitions (400vh sticky)
// ═════════════════════════════════════════════════════════════════════
function AboutDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the tall scrollable area
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [15, -15]);

  // ── Slide 1: "THE MAKER" ──
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.20, 0.30], [1, 1, 0]);
  const slide1Y = useTransform(scrollYProgress, [0, 0.20, 0.30], [0, 0, -80]);
  const slide1Scale = useTransform(scrollYProgress, [0.20, 0.30], [1, 0.92]);

  // ── Slide 2: Introduction + Image ──
  const slide2Opacity = useTransform(scrollYProgress, [0.30, 0.45, 0.60, 0.70], [0, 1, 1, 0]);
  const slide2LeftX = useTransform(scrollYProgress, [0.30, 0.45, 0.60, 0.70], [-100, 0, 0, -100]);
  const slide2RightX = useTransform(scrollYProgress, [0.30, 0.45, 0.60, 0.70], [100, 0, 0, 100]);

  // ── Slide 3: Summary ──
  const slide3Opacity = useTransform(scrollYProgress, [0.70, 0.85, 1], [0, 1, 1]);
  const slide3Y = useTransform(scrollYProgress, [0.70, 0.85], [40, 0]);

  // Divider lines
  const dividerScaleX = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const divider3ScaleX = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  // Parallax for accent block behind image
  const accentY = useTransform(scrollYProgress, [0.30, 0.70], [60, -60]);

  // Colorization specific transforms
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]);

  return (
    <section id="about" className="relative border-t-8 border-ink bg-ink text-paper">
      {/*
        Scroll container: 400vh tall creates the scrollable area.
      */}
      <div ref={containerRef} style={{ height: '400vh' }} className="relative">
        <div
          className="sticky top-0 h-screen bg-ink text-white"
          style={{ overflow: 'clip' }}
        >
          {/* Layered Technical Background */}
          <div className="absolute inset-0 z-0 optimize-gpu">
            {/* Blueprint Texture */}
            <div className="absolute inset-0 opacity-10 grayscale brightness-150">
              <img src="/assets/img/blueprint.png" alt="" className="w-full h-full object-cover grayscale brightness-150" />
            </div>
            {/* Navy Ambient Glows */}
            <motion.div 
              style={{ opacity: bgOpacity }}
              className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-accent/40 rounded-full blur-[120px] optimize-gpu" 
            />
            <motion.div 
              style={{ opacity: bgOpacity }}
              className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-accent/30 rounded-full blur-[100px] optimize-gpu" 
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink opacity-80" />
          </div>

          {/* ═══════════════════════════════════════════════
              SLIDE 1 — "THE MAKER" title, centered
              ═══════════════════════════════════════════════ */}
          <motion.div
            style={{
              opacity: slide1Opacity,
              y: slide1Y,
              scale: slide1Scale,
              skew: skewVelocity
            }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10"
          >
             <span className="text-accent font-mono tracking-[1.2em] uppercase text-[10px] mb-8 block font-bold">Evolution Analysis</span>
            <h2 className="text-huge leading-none font-heading text-white drop-shadow-2xl">THE MAKER</h2>

            <motion.div
              style={{ scaleX: dividerScaleX }}
              className="w-48 h-2 bg-accent mt-8 origin-left"
            />
          </motion.div>

          {/* ═══════════════════════════════════════════════
              SLIDE 2 — Image (right) + Introduction text (left)
              ═══════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: slide2Opacity }}
            className="absolute inset-0 flex items-center z-20"
          >
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-12 lg:gap-32 items-center">

                {/* Left: Introduction text — slides from left */}
                <motion.div
                  style={{ x: slide2LeftX }}
                  className="flex-1 space-y-10"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-[2px] bg-accent" />
                      <span className="text-accent font-mono text-xs uppercase tracking-[0.5em] font-bold">Identity</span>
                    </div>
                    <p className="text-4xl md:text-6xl font-heading leading-none tracking-tighter uppercase text-white">
                      HI, I'M <span className="text-accent">DAT LEE</span>.
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-white/20" />

                  <p className="text-2xl md:text-3xl font-bold leading-tight uppercase tracking-tight text-white/90">
                    I'M A PASSIONATE DEVELOPER DEDICATED TO CREATING BOLD, FUNCTIONAL, AND USER-CENTERED DIGITAL EXPERIENCES.
                  </p>

                  <p className="text-xl md:text-2xl font-medium leading-tight text-paper/60 uppercase tracking-tight italic">
                    I don't just code; I stamp brand identity into the web.
                  </p>

                  <div className="flex gap-6 pt-4">
                    <div className="w-16 h-16 bg-accent chisel-block-accent flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-ink opacity-40" />
                    </div>
                    <div className="w-32 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center" style={{ clipPath: 'polygon(0.5% 1%, 99% 0%, 100% 98%, 1% 100%, 0% 2%)' }}>
                       <span className="font-mono text-[10px] text-accent tracking-widest font-bold">ARCH-01</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Portrait image — slides from right */}
                <motion.div
                  style={{ x: slide2RightX }}
                  className="flex-1 relative w-full max-w-md md:max-w-none"
                >
                  <div className="relative z-10 border-[12px] border-white/10 backdrop-blur-xl p-4 bg-white/5 shadow-[24px_24px_64px_-16px_rgba(0,0,0,0.7)] group">
                    <ImageWithFallback
                      src="https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg"
                      alt="Professional portrait"
                      className="w-full aspect-[3/4] object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Chisel Accent Underlay with parallax */}
                  <motion.div
                    style={{ y: accentY }}
                    className="absolute top-10 right-0 w-full h-full bg-accent -z-10 chisel-block-accent translate-x-4 md:translate-x-12 opacity-80"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              SLIDE 3 — Summary/conclusion text, centered
              ═══════════════════════════════════════════════ */}
          <motion.div
            style={{
              opacity: slide3Opacity,
              y: slide3Y,
            }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-30"
          >
             <div className="w-24 h-[2px] bg-accent mb-12" />
            <h2 className="text-5xl md:text-8xl lg:text-9xl max-w-6xl mx-auto font-heading leading-[0.85] uppercase text-white drop-shadow-2xl">
              TECHNICAL RIGOR<br />MEETS <span className="text-accent italic">BRUTALIST</span><br />AESTHETICS
            </h2>

            <motion.div
              style={{ scaleX: divider3ScaleX }}
              className="w-64 h-[4px] bg-accent mt-16 origin-center"
            />

            <p className="text-xl md:text-3xl font-bold mt-16 max-w-3xl mx-auto uppercase tracking-tighter text-paper/50">
              Ensuring every project is a raw statement of intent.
            </p>
          </motion.div>

          {/* Decorative Stamp */}
          <motion.div 
            style={{ skew: skewVelocity }}
            className="absolute bottom-20 left-10 -rotate-6 opacity-10 pointer-events-none hidden md:block"
          >
            <p className="font-heading text-huge text-white">AUTHENTICITY</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// Mobile variant — simple stacked layout, no scroll hooks
// ═════════════════════════════════════════════════════════════════════
function AboutMobile() {
  return (
    <section id="about" className="relative border-t-8 border-ink bg-ink text-white py-32 overflow-hidden">
      {/* Background Layers - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none optimize-gpu">
        <div className="absolute inset-0 opacity-10 grayscale brightness-150">
          <img src="/assets/img/blueprint.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent/20 to-transparent blur-3xl optimize-gpu" />
      </div>

      <div className="relative z-10">
        {/* SLIDE 1 */}
        <div className="flex flex-col justify-center items-center text-center px-6 py-12">
          <span className="text-accent font-mono text-[10px] tracking-[1em] uppercase mb-4 font-bold">Analysis</span>
          <h2 className="text-huge leading-none font-heading text-white">THE MAKER</h2>
          <div className="w-24 h-1 bg-accent mt-6 shadow-[0_0_10px_var(--accent)]" />
        </div>

        {/* SLIDE 2 */}
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col gap-16 items-center">
            {/* Introduction text */}
            <div className="w-full space-y-8">
              <div className="space-y-4">
                <div className="w-8 h-[2px] bg-accent" />
                <p className="text-4xl font-heading leading-none tracking-tighter uppercase text-white">
                  HI, I'M <span className="text-accent">DAT LEE</span>.
                </p>
              </div>
              
              <div className="w-full h-[1px] bg-white/10" />
              
              <p className="text-xl font-bold leading-tight uppercase tracking-tight text-white/90">
                I'M A PASSIONATE DEVELOPER DEDICATED TO CREATING BOLD, FUNCTIONAL, AND USER-CENTERED DIGITAL EXPERIENCES.
              </p>
              
              <p className="text-base font-medium leading-tight text-paper/50 uppercase tracking-tight italic">
                I don't just code; I stamp brand identity into the web.
              </p>
              
              <div className="flex gap-4 pt-4">
                <div className="w-12 h-12 bg-accent chisel-block-accent flex items-center justify-center">
                   <div className="w-6 h-6 border border-ink/30" />
                </div>
                <div className="w-24 h-12 bg-white/5 border border-white/10 flex items-center justify-center" style={{ clipPath: 'polygon(0.5% 1%, 99% 0%, 100% 98%, 1% 100%, 0% 2%)' }}>
                   <span className="font-mono text-[8px] text-accent tracking-tighter font-bold">ARCH-01</span>
                </div>
              </div>
            </div>

            {/* Portrait image */}
            <div className="relative w-full max-w-sm mt-8">
              <div className="relative z-10 border-8 border-white/10 backdrop-blur-xl p-3 bg-white/5 shadow-[16px_16px_40px_-10px_rgba(0,0,0,0.5)]">
                <ImageWithFallback
                  src="https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg"
                  alt="Professional portrait"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              <div className="absolute top-6 right-0 w-full h-full bg-accent -z-10 chisel-block-accent translate-x-4 opacity-50" />
            </div>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="flex flex-col justify-center items-center text-center px-6 py-20 max-w-4xl mx-auto">
          <div className="w-12 h-[2px] bg-accent mb-8" />
          <h2 className="text-4xl font-heading leading-none uppercase text-white italic">
            TECHNICAL RIGOR MEETS BRUTALIST AESTHETICS
          </h2>
          <div className="w-48 h-1 bg-accent mt-8" />
          <p className="text-base font-bold mt-8 uppercase tracking-tight text-paper/40">
            Ensuring every project is a raw statement of intent.
          </p>
        </div>
      </div>
    </section>
  );
}
