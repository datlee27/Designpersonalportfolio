import { ReactNode, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { pathname, hash } = useLocation();

    // Brutalist scroll behavior (snap/auto instead of smooth)
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor?.hash && anchor.pathname === window.location.pathname) {
                const id = anchor.hash.replace('#', '');
                if (id) {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'auto' });
                        window.history.pushState(null, '', anchor.hash);
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    // Handle initial hash scroll or scroll to top on route change
    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [pathname, hash]);

    return (
      <div className="flex flex-col min-h-screen overflow-x-hidden selection:bg-accent selection:text-ink bg-paper">
          <Navigation />
          <main className="flex-grow">
              {children}
          </main>
          <footer className="bg-ink text-paper border-t-8 border-accent mt-auto relative z-10">
              <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                  <p className="font-heading text-2xl tracking-tighter">© {new Date().getFullYear()} DAT LEE</p>
                  <p className="text-accent font-bold uppercase tracking-widest text-xs">BRUTALIST SYSTEM v1.0</p>
              </div>
              
              {/* Official Branding Marquee at the very bottom */}
              <div className="w-full bg-paper text-ink py-2 overflow-hidden border-t-2 border-ink">
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-4 font-bold text-[10px] uppercase tracking-widest">
                      DAT LEE © 2026 ・ BRUTALIST BY DESIGN ・ INK ON PAPER ・ TRUTH IN ARCHITECTURE ・ 
                    </span>
                  ))}
                </div>
              </div>
          </footer>
      </div>
    );
}
