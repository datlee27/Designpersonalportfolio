import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'HOME', href: '/#hero', coord: '00' },
  { name: 'ABOUT', href: '/#about', coord: '01' },
  { name: 'SKILLS', href: '/#skills', coord: '02' },
  { name: 'PROJECTS', href: '/#projects', coord: '03' },
  { name: 'BLOG', href: '/blog', coord: '04' },
  { name: 'CONTACT', href: '/#contact', coord: '05' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');


  // Smooth scroll interpolation for the frame contraction
  const smoothY = useSpring(scrollY, {
    stiffness: 80,
    damping: 40,
    restDelta: 0.001
  });

  // Frame padding: 16px at top -> 4px on scroll
 
  const borderOpacity = useTransform(smoothY, [0, 200], [0, 1]);
  
  // Logo scale: 1.2 at top -> 0.9 on scroll
  const logoScale = useTransform(smoothY, [0, 150], [1.2, 0.9]);

  const chiselEasing = [0.2, 0, 0, 1] as const;

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <>
      {/* Viewport Overlay (No border, just layout container) */}
      <div className="fixed inset-0 pointer-events-none z-[998] p-6 md:p-8">
        <div className="w-full h-full relative">
          {/* Top-Left: Logo */}
          <div className="absolute top-0 left-0 pointer-events-auto origin-top-left">
            <motion.div style={{ scale: logoScale }}>
              <Link 
                to="/" 
                onClick={handleLogoClick}
                className={`text-[32px] font-heading leading-none tracking-tighter hover:text-accent transition-colors duration-300 flex flex-col ${isBlog ? 'text-accent' : 'text-white'}`}
              >
                <span>DAT LEE</span>
                <span className={`text-[10px] font-mono tracking-widest opacity-60 mt-1 ${isBlog ? 'text-accent' : 'text-accent'}`}>.</span>
              </Link>
            </motion.div>
          </div>

          {/* Top-Right: Desktop Navigation */}
          <div className="hidden md:flex absolute top-0 right-0 pointer-events-auto flex-col items-end gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center gap-4 text-[14px] font-heading tracking-[0.2em] hover:text-accent transition-all duration-300 ${isBlog ? 'text-accent/60' : 'text-white/40'}`}
              >
                <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">[{item.coord}]</span>
                <span className="group-hover:translate-x-[-8px] transition-transform">{item.name}</span>
                <div className={`w-2 h-2 rounded-full border transition-all ${isBlog ? 'border-accent/40 group-hover:bg-accent group-hover:border-accent' : 'border-accent/20 group-hover:bg-accent group-hover:border-accent'}`} />
              </Link>
            ))}
          </div>


         
        </div>
      </div>

      {/* Mobile Menu Trigger */}
      <motion.button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`md:hidden fixed top-6 right-6 z-[1000] p-2 rounded-none active:scale-95 transition-all ${isBlog ? 'bg-accent text-white' : 'bg-accent text-ink'}`}
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-ink/98 backdrop-blur-2xl flex flex-col p-12"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-12 right-12 text-white hover:text-accent transition-colors"
            >
              <X className="w-10 h-10" />
            </button>

            <div className="mt-20 flex flex-col gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: chiselEasing }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-6xl font-heading tracking-tighter text-white hover:text-accent transition-colors flex items-baseline gap-4"
                  >
                    <span className="text-xl font-mono text-accent/40">{item.coord}</span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

      
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
