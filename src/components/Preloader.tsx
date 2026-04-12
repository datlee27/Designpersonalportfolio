import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const chiselEasing: [number, number, number, number] = [0.2, 0, 0, 1];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.6, ease: chiselEasing }}
          className="fixed inset-0 bg-ink z-[9999] flex flex-col justify-center items-center overflow-hidden"
        >
          <div className="relative">
            <motion.div 
               initial={{ opacity: 0, scale: 2 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.3, ease: chiselEasing, delay: 0.2 }}
               className="text-[12vw] font-heading text-paper tracking-tighter leading-none"
            >
              DAT LEE<span className="text-accent">★</span>
            </motion.div>
            
            {/* Ink Skip Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: chiselEasing, delay: 0.5 }}
              className="w-full h-4 bg-accent mt-4 origin-left misaligned-right"
            />
          </div>

          <div className="absolute bottom-10 left-10 flex gap-2">
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                className="w-8 h-8 bg-paper chisel-block"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

