import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds minimum load time

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed inset-0 bg-black z-[9999] flex justify-center items-center"
                >
                    <div className="flex text-2xl font-bold text-white tracking-[0.2em]">
                        {['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'].map((letter, index) => (
                            <motion.span
                                key={index}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    delay: index * 0.1,
                                    ease: "easeInOut"
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
