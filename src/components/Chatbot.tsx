import { useEffect } from 'react';

declare global {
    interface Window {
        chatbase: any;
    }
}

export function Chatbot() {
    useEffect(() => {
        // Check if script is already loaded
        if (document.getElementById('c9zgwCRkU8lje3AUpu6-j')) return;

        // Chatbase Config
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args: any[]) => {
                if (!window.chatbase.q) { window.chatbase.q = [] }
                window.chatbase.q.push(args)
            };
            // Use type assertion to bypass read-only property error if needed, 
            // though standard Proxy assignment should work.
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
            // script.domain = "www.chatbase.co"; // domain prop doesn't exist on HTMLScriptElement type standardly
            script.setAttribute("domain", "www.chatbase.co");
            document.body.appendChild(script);
            console.log("Chatbot loaded!");
        };

        // Lazy load strategies
        const timer = setTimeout(loadChatbot, 5000);

        const onScroll = () => {
            if (window.scrollY > 300) {
                loadChatbot();
                window.removeEventListener('scroll', onScroll);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const onMouseMove = () => {
            loadChatbot();
            document.removeEventListener('mousemove', onMouseMove);
        }
        const mouseTimer = setTimeout(() => {
            document.addEventListener('mousemove', onMouseMove, { once: true, passive: true });
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(mouseTimer);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return null; // No UI needed, script injects iframe
}
