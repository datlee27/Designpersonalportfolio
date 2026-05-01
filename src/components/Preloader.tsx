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
            <div className="flex flex-col items-center gap-8">
              <div className="space-y-4 flex flex-col items-center">
                 <div className="flex gap-1 overflow-hidden justify-center">
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
            </div>

            {/* Progress Bar Container */}
            <div className="max-w-md mx-auto w-full space-y-6">
              <div className="flex justify-between items-end font-mono text-[10px] tracking-[0.4em] font-bold">
                <span className="text-accent/60 uppercase">System_Initializing</span>
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
