import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';

export default function App() {
  const [selectedBlogPost, setSelectedBlogPost] = useState<number | null>(null);

  // Smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor?.href.includes('#')) {
        const id = anchor.href.split('#')[1];
        if (id) {
          e.preventDefault();
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Scroll to top when blog post is selected or deselected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedBlogPost]);

  return (
    <div className="overflow-x-hidden">
      <Navigation />
      
      {!selectedBlogPost ? (
        <>
          <Hero />
          <About />
          <div id="skills">
            <Skills />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="blog">
            <Blog onSelectPost={setSelectedBlogPost} />
          </div>
          <Contact />
        </>
      ) : (
        <div className="pt-20">
          <Blog selectedPost={selectedBlogPost} onSelectPost={setSelectedBlogPost} />
        </div>
      )}
    </div>
  );
}
