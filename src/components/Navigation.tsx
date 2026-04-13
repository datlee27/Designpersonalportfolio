import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'HOME', href: '/#hero' },
  { name: 'ABOUT', href: '/#about' },
  { name: 'SKILLS', href: '/#skills' },
  { name: 'PROJECTS', href: '/#projects' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT', href: '/#contact' },

];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const chiselEasing = [0.2, 0, 0, 1] as const;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: chiselEasing }}
        className={`fixed top-0 left-0 right-0 z-[999] border-b-4 border-ink transition-colors duration-100 ${isScrolled || location.pathname !== '/' ? 'bg-ink py-4' : 'bg-ink py-6'
          }`}

      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-paper text-4xl font-heading tracking-tighter hover:text-accent transition-colors">
              DAT LEE<span className="text-accent italic">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-paper px-6 py-2 font-heading text-xl hover:bg-accent hover:text-ink transition-colors duration-75"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-paper p-2 border-2 border-paper"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: chiselEasing }}
            className="fixed inset-0 z-40 bg-ink md:hidden flex flex-col items-center justify-center gap-12"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={item.href}
                  className="text-paper text-6xl font-heading tracking-tighter hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

