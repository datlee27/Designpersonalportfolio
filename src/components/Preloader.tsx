import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const chiselEasing: [number, number, number, number] = [0.2, 0, 0, 1];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: chiselEasing }}
          className="fixed inset-0 bg-ink z-[9999] flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Technical Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="/assets/img/blueprint.png" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative w-full max-w-4xl px-12 space-y-12">
            {/* Brand Header */}
            <div className="flex justify-between items-end">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: chiselEasing }}
              >
                 <span className="text-accent font-mono text-xs tracking-[0.5em] font-bold block mb-2">SYSTEM_AUTH</span>
                 <h1 className="text-6xl md:text-8xl font-heading text-white tracking-tighter leading-none">
                  DAT LEE<span className="text-accent">★</span>
                </h1>
              </motion.div>
              <div className="text-right font-mono text-[10px] text-white/40 hidden md:block">
                <p>LAT: 16.0544° N</p>
                <p>LNG: 108.2022° E</p>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-[10px] text-accent tracking-[0.5em] font-bold">
                <span>INITIALIZING_CORE</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-0 left-0 h-full bg-accent origin-left shadow-[0_0_15px_var(--accent)]"
                />
              </div>
              <div className="flex justify-between font-mono text-[8px] text-white/20 uppercase tracking-widest">
                <span>Memory_Check: OK</span>
                <span>Security_Layer: ACTIVE</span>
                <span>Graphics_Engine: CINEMATIC</span>
              </div>
            </div>

            {/* Decorative Corner Markers */}
            <div className="absolute -top-20 -left-10 w-20 h-20 border-t-2 border-l-2 border-accent/20" />
            <div className="absolute -bottom-20 -right-10 w-20 h-20 border-b-2 border-r-2 border-accent/20" />
          </div>

          {/* Scrolling Technical Text */}
          <div className="absolute bottom-10 left-10 h-20 overflow-hidden font-mono text-[8px] text-white/10 leading-relaxed uppercase pointer-events-none hidden lg:block">
             <p className="animate-pulse">Loading modules: core.ui.brutalist...</p>
             <p className="animate-pulse delay-75">Establishing connection: secure_link_01...</p>
             <p className="animate-pulse delay-150">Compiling assets: technical_artisan_brand...</p>
             <p className="animate-pulse delay-300">Ready for deployment.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
