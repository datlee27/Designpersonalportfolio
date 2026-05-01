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
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        const step = Math.random() > 0.8 ? 2 : 1;
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll lock
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lock-scroll'));
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(new CustomEvent('unlock-scroll'));
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(new CustomEvent('unlock-scroll'));
    };
  }, [isLoading]);

  const name = "DAT LEE".split("");

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'inset(50% 0 50% 0)',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-ink z-[9999] flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Grainy Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100" />
          
          {/* Scanning Line Effect */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-accent/20 blur-[2px] z-50 pointer-events-none"
          />

          
         

          <div className="relative w-full max-w-5xl px-8 md:px-12 space-y-16">
            {/* Brand Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="space-y-4">
                 <motion.div
                   initial={{ width: 0 }}
                   animate={{ width: '100%' }}
                   transition={{ duration: 1, ease: chiselEasing }}
                   className="h-[1px] bg-accent/30"
                 />
                 <div className="flex gap-1 overflow-hidden">
                   {name.map((char, i) => (
                     <motion.span
                       key={i}
                       initial={{ y: '100%' }}
                       animate={{ y: 0 }}
                       transition={{ 
                         duration: 0.8, 
                         ease: chiselEasing, 
                         delay: i * 0.05 
                       }}
                       className={`text-6xl md:text-9xl font-heading text-white leading-none ${char === ' ' ? 'mr-6' : ''}`}
                     >
                       {char}
                     </motion.span>
                   ))}
                   <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                    className="text-accent text-4xl md:text-6xl self-start"
                   >★</motion.span>
                 </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-left md:text-right font-mono text-[9px] text-white/30 space-y-1"
              >
                <div className="flex items-center gap-2 justify-start md:justify-end">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <p>TERMINAL_SESSION: ACTIVE</p>
                </div>
                <p>PROTOCOL_V.03_BYPASS</p>
                <p className="text-accent/50 uppercase">Lat: 16.0544 / Lng: 108.2022</p>
              </motion.div>
            </div>

            {/* Progress Bar Container */}
            <div className="space-y-6">
              <div className="flex justify-between items-end font-mono text-[10px] tracking-[0.4em] font-bold">
                <div className="flex gap-4">
                  <span className="text-accent">CORE_INIT</span>
                  <span className="text-white/20">|</span>
                  <span className="text-white/60 animate-pulse">
                    {progress < 30 ? 'LOADING_ASSETS' : progress < 70 ? 'COMPILING_SHADERS' : 'FINALIZING_LAYOUT'}
                  </span>
                </div>
                <span className="text-accent text-2xl">{progress}%</span>
              </div>
              
              <div className="h-[2px] w-full bg-white/5 relative">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-0 left-0 h-full bg-accent origin-left shadow-[0_0_20px_var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[8px] text-white/20 uppercase tracking-widest border-t border-white/5 pt-6">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 ${progress > 20 ? 'bg-accent' : 'bg-white/10'}`} />
                  <span>Brutalist_UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 ${progress > 50 ? 'bg-accent' : 'bg-white/10'}`} />
                  <span>Motion_Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 ${progress > 80 ? 'bg-accent' : 'bg-white/10'}`} />
                  <span>Cinematic_Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 ${progress === 100 ? 'bg-accent' : 'bg-white/10'}`} />
                  <span>Ready_State</span>
                </div>
              </div>
            </div>

            {/* Decorative Corner Markers */}
            <div className="absolute -top-12 -left-4 w-12 h-12 border-t border-l border-accent/30" />
            <div className="absolute -bottom-12 -right-4 w-12 h-12 border-b border-r border-accent/30" />
          </div>

          {/* Footer Meta */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center font-mono text-[8px] text-white/10 uppercase tracking-widest pointer-events-none">
             <div className="flex gap-8">
               <p>© 2026 TECHNICAL_ARTISAN</p>
               <p className="hidden md:block">BUILD_HASH: 0X4F3A2B</p>
             </div>
             <p className="animate-pulse">Awaiting final handshake...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
