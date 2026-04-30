import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Increase delay to account for Preloader animation
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    } else if (location.pathname === '/' && !location.hash) {
      // Scroll to top if home without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}
