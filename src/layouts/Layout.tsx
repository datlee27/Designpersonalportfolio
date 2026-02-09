import { ReactNode, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { pathname, hash } = useLocation();

    // Smooth scroll behavior
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            // Only intercept hash links on the same page
            if (anchor?.hash && anchor.pathname === window.location.pathname) {
                const id = anchor.hash.replace('#', '');
                if (id) {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        // Update URL hash without jumping
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
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, hash]);

    return (
        <div className="overflow-x-hidden">
            <Navigation />
            <main>
                {children}
            </main>
            <footer className="bg-black text-white py-8 text-center">
                <div className="container mx-auto px-6">
                    <p>© {new Date().getFullYear()} Portfolio. Designed & Built with passion.</p>
                </div>
            </footer>
        </div>
    );
}
