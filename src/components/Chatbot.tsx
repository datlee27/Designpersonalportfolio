import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
    interface Window {
        chatbase: any;
    }
}

export function Chatbot() {
    const [isVisible, setIsVisible] = useState(false);
    const chiselEasing = [0.2, 0, 0, 1];

    useEffect(() => {
        if (document.getElementById('c9zgwCRkU8lje3AUpu6-j')) return;

        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args: any[]) => {
                if (!window.chatbase.q) { window.chatbase.q = [] }
                window.chatbase.q.push(args)
            };
            window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                    if (prop === "q") { return target.q }
                    return (...args: any[]) => target(prop, ...args)
                }
            });
        }

        const loadChatbot = () => {
            if (document.getElementById('c9zgwCRkU8lje3AUpu6-j')) return;
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "c9zgwCRkU8lje3AUpu6-j";
            script.setAttribute("domain", "www.chatbase.co");
            document.body.appendChild(script);
            setIsVisible(true);
        };

        const timer = setTimeout(loadChatbot, 3000);
        return () => clearTimeout(timer);
    }, []);

    const openChat = () => {
        if (window.chatbase) {
            window.chatbase("open");
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                #chatbase-bubble-button, 
                .chatbase-bubble-window,
                [id^="chatbase-"] { 
                    display: none !important; 
                }
                /* Ensure our button is the only one visible */
            `}} />
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.5, ease: chiselEasing }}
                        onClick={openChat}
                        className="fixed bottom-8 right-8 z-[1000] group"
                        aria-label="Open Chat"
                    >
                        <div className="chisel-block-accent w-20 h-20 p-2 group-hover:misaligned-right transition-transform duration-100 flex items-center justify-center">
                            <img 
                              src="/Users/mac/.gemini/antigravity/brain/ba3d752a-1c6c-4723-99ba-07e13944aa45/brutalist_bot_logo_1775745617617.png" 
                              alt="AI Bot" 
                              className="w-full h-full object-contain filter brightness-0"
                            />
                        </div>
                        {/* Status Label */}
                        <div className="absolute top-0 right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity bg-ink text-paper px-4 py-2 font-heading text-xl whitespace-nowrap misaligned-left">
                          TALK TO INTEL
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
