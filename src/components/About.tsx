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

  return (
    <section id="about" className="relative border-t-8 border-ink bg-ink text-paper">
      {/*
        Scroll container: 400vh tall creates the scrollable area.
        The sticky child inside stays pinned to viewport.
      */}
      <div ref={containerRef} style={{ height: '400vh' }} className="relative">
        {/* Sticky viewport — stays pinned while user scrolls through the 400vh */}
        <div
          className="sticky top-0 h-screen bg-ink text-paper"
          style={{ overflow: 'clip' }}
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen">
            <img src="/assets/img/screen2.png" alt="" className="w-full h-full object-cover" />
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
            <h2 className="text-huge leading-none font-heading">THE MAKER</h2>

            <motion.div
              style={{ scaleX: dividerScaleX }}
              className="w-48 h-2 bg-paper mt-8 origin-left"
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
              <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

                {/* Left: Introduction text — slides from left */}
                <motion.div
                  style={{ x: slide2LeftX }}
                  className="flex-1 space-y-6"
                >
                  <p className="text-3xl md:text-4xl font-bold leading-none tracking-tighter uppercase">
                    HI, I'M <span className="text-accent">DAT LEE</span>.
                  </p>

                  <div className="w-full h-2 bg-paper" />

                  <p className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight">
                    I'M A PASSIONATE DEVELOPER DEDICATED TO CREATING BOLD, FUNCTIONAL, AND USER-CENTERED DIGITAL EXPERIENCES.
                  </p>

                  <p className="text-lg md:text-xl font-medium leading-tight text-paper/80 uppercase tracking-tight">
                    I DON'T JUST CODE; I STAMP BRAND IDENTITY INTO THE WEB.
                  </p>

                  <div className="flex gap-4 pt-4">
                    <div className="w-12 h-12 bg-accent chisel-block-accent" />
                    <div className="w-24 h-12 bg-paper text-ink p-4 relative" style={{ clipPath: 'polygon(0.5% 1%, 99% 0%, 100% 98%, 1% 100%, 0% 2%)' }} />
                  </div>
                </motion.div>

                {/* Right: Portrait image — slides from right */}
                <motion.div
                  style={{ x: slide2RightX }}
                  className="flex-1 relative w-full max-w-md md:max-w-none"
                >
                  <div className="relative z-10 border-8 border-paper p-4 bg-ink misaligned-right shadow-[16px_16px_0px_0px_var(--paper)]">
                    <ImageWithFallback
                      src="https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg"
                      alt="Professional portrait"
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </div>
                  {/* Chisel Accent Underlay with parallax */}
                  <motion.div
                    style={{ y: accentY }}
                    className="absolute top-10 right-0 w-full h-full bg-accent -z-10 chisel-block-accent translate-x-4 md:translate-x-10"
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
            <h2 className="text-5xl md:text-7xl lg:text-8xl max-w-4xl mx-auto font-heading leading-none capitalize">
              MY APPROACH COMBINES TECHNICAL RIGOR WITH BRUTALIST AESTHETICS
            </h2>

            <motion.div
              style={{ scaleX: divider3ScaleX }}
              className="w-64 h-2 bg-accent mt-10 origin-center"
            />

            <p className="text-xl md:text-2xl font-bold mt-10 max-w-2xl mx-auto uppercase tracking-tight text-paper/70">
              ENSURING EVERY PROJECT IS A RAW STATEMENT OF INTENT.
            </p>
          </motion.div>

          {/* Decorative Stamp */}
          <motion.div 
            style={{ skew: skewVelocity }}
            className="absolute bottom-20 right-10 rotate-12 opacity-30 pointer-events-none hidden md:block"
          >
            <p className="font-heading text-huge text-transparent" style={{ WebkitTextStroke: '2px var(--paper)' }}>DAT LEE</p>
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
    <section id="about" className="relative border-t-8 border-ink bg-ink text-paper py-20">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen">
        <img src="/assets/img/screen2.png" alt="" className="w-full h-full object-cover" />
      </div>

      {/* SLIDE 1 */}
      <div className="flex flex-col justify-center items-center text-center px-6 py-12 z-10 relative">
        <h2 className="text-huge leading-none font-heading">THE MAKER</h2>
        <div className="w-32 h-2 bg-paper mt-6" />
      </div>

      {/* SLIDE 2 */}
      <div className="container mx-auto px-6 py-16 relative z-20">
        <div className="flex flex-col gap-12 items-center">
          {/* Introduction text */}
          <div className="w-full space-y-6">
            <p className="text-2xl font-bold leading-none tracking-tighter uppercase">
              HI, I'M <span className="text-accent">DAT LEE</span>.
            </p>
            <div className="w-full h-1 bg-paper" />
            <p className="text-lg font-bold leading-tight uppercase tracking-tight">
              I'M A PASSIONATE DEVELOPER DEDICATED TO CREATING BOLD, FUNCTIONAL, AND USER-CENTERED DIGITAL EXPERIENCES.
            </p>
            <p className="text-base font-medium leading-tight text-paper/80 uppercase tracking-tight">
              I DON'T JUST CODE; I STAMP BRAND IDENTITY INTO THE WEB.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-10 h-10 bg-accent chisel-block-accent" />
              <div className="w-20 h-10 bg-paper text-ink p-4 relative" style={{ clipPath: 'polygon(0.5% 1%, 99% 0%, 100% 98%, 1% 100%, 0% 2%)' }} />
            </div>
          </div>

          {/* Portrait image */}
          <div className="relative w-full max-w-sm mt-8">
            <div className="relative z-10 border-4 border-paper p-3 bg-ink misaligned-right shadow-[12px_12px_0px_0px_var(--paper)]">
              <ImageWithFallback
                src="https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg"
                alt="Professional portrait"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div className="absolute top-6 right-0 w-full h-full bg-accent -z-10 chisel-block-accent translate-x-4" />
          </div>
        </div>
      </div>

      {/* SLIDE 3 */}
      <div className="flex flex-col justify-center items-center text-center px-6 py-20 z-30 relative max-w-4xl mx-auto">
        <h2 className="text-3xl font-heading leading-none capitalize">
          MY APPROACH COMBINES TECHNICAL RIGOR WITH BRUTALIST AESTHETICS
        </h2>
        <div className="w-48 h-2 bg-accent mt-8" />
        <p className="text-lg font-bold mt-8 uppercase tracking-tight text-paper/70">
          ENSURING EVERY PROJECT IS A RAW STATEMENT OF INTENT.
        </p>
      </div>
    </section>
  );
}
