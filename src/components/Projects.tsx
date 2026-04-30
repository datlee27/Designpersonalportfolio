import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: '01',
    title: "Dev Roadmap Tracking System",
    description: "An advanced learning management platform designed for developers to track a 3-month personalized roadmap. Featuring a dynamic task manager across multiple phases and interactive progress tracking.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775903083/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.23.35_z4qpji.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/datlee27/dev-roadmap",
    deploy: "https://dev-roadmap-brown.vercel.app/",
    status: "Latest"
  },
  {
    id: '02',
    title: "IELTS Writing Practice",
    description: "A specialized training tool designed to simulate the IELTS Computer-based Writing environment. Features a split-screen interface and real-time word counting.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775904892/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.52.52_cb9myu.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Educational"],
    github: "https://github.com/datlee27/Practice-ielts-writing-typing-react",
    status: "Latest"
  },
  {
    id: '03',
    title: "P2P Electric EV Rental",
    description: "Comprehensive P2P electric vehicle rental system with PayOS, OCR, and AI Assistant. A revolutionary approach to urban mobility and sustainable transport.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png",
    tags: ["Spring Boot", "MySQL", "AI", "FullStack"],
    github: "https://github.com/datlee27/ecodanav2",
    status: "2025"
  },
  {
    id: '04',
    title: "AI-Integrated LMS",
    description: "Full-stack Learning Management System built to modernize digital course management. Integrates advanced AI logic for personalized student recommendations.",
    image: "/assets/img/projectlearning.png",
    tags: ["Java", "MySQL", "AI", "FullStack"],
    github: "https://github.com/datlee27/LearningWebsite-1",
    status: "2025"
  },
  {
    id: '05',
    title: "Smart Recycle Bin",
    description: "IoT-enabled smart recycle bin using Arduino. Features hybrid sensor arrays and mechanical waste sorting for sustainable urban environments.",
    image: "/assets/img/projectpic.png",
    tags: ["Arduino", "IoT", "Sensors"],
    github: "https://github.com/datlee27/iot102-smart-recycle-bin",
    status: "2025"
  },
  {
    id: '06',
    title: "Fruit Shop Web App",
    description: "E-commerce platform for high-traffic fruit marketplaces. Features complex cart logic and session management built for speed and reliability.",
    image: "/assets/img/fruitshop.png",
    tags: ["Java Servlets", "JSP", "SQL"],
    github: "https://github.com/datlee27/FruitShopOnline",
    status: "2025"
  }
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const totalSlides = projects.length + 1;
  // Reduce height factor to make the scroll feel "shorter" and more responsive
  const scrollHeightFactor = 85; 
  const translateEnd = -((totalSlides - 1) * 100);
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${translateEnd}vw`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (isMobile) {
    return (
      <section id="projects" className="relative min-h-screen bg-ink py-32 overflow-hidden border-t-8 border-ink">
        {/* Mobile Background - Fixed */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] grayscale brightness-150">
          <img src="/assets/img/projects-bg.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10">
          <div className="px-6 mb-16">
            <span className="text-accent font-mono text-[10px] tracking-[0.8em] uppercase mb-4 block font-bold">Selected Works</span>
            <h2 className="text-6xl font-heading tracking-tighter leading-none uppercase text-white">
              GALLERY<br /><span className="text-accent">PROJECTS</span>
            </h2>
            <div className="w-24 h-1 bg-accent mt-8 shadow-[0_0_10px_var(--accent)]" />
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-6 pb-12">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="flex-shrink-0 w-[85vw] snap-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl relative optimize-gpu"
              >
                <div className="relative h-64 w-full mb-8 overflow-hidden border border-white/20">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-accent text-white px-6 py-2 font-heading text-2xl z-20">
                    #{project.id}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-heading tracking-tight text-white uppercase leading-none">
                      {project.title}
                    </h3>
                    <div className="flex gap-4">
                      {project.deploy && (
                        <a href={project.deploy} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                        <Github size={20} />
                      </a>
                    </div>
                  </div>

                  <p className="text-base text-white/60 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-white/10 text-[8px] font-mono text-white/40 uppercase tracking-widest bg-white/5 font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Visual Label */}
                <div className="absolute -bottom-4 right-4 opacity-10">
                  <span className="font-mono text-[10px] text-white font-bold">MOD_PRJ_0{project.id}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="px-6 flex items-center gap-4 mt-4 opacity-30">
            <div className="h-[1px] flex-1 bg-white" />
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">Swipe to explore</span>
            <div className="h-[1px] flex-1 bg-white" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-ink text-paper"
      style={{ height: `${totalSlides * scrollHeightFactor}vh` }}
    >
      {/* Premium Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/assets/img/projects-bg.png" 
          alt="Technical Background" 
          className="w-full h-full object-cover opacity-20 grayscale brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ x, width: `${totalSlides * 100}vw` }} className="flex h-full">
          {/* Slide 0: Title Page */}
          <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <span className="text-accent font-mono tracking-[1.2em] uppercase text-xs mb-8 block text-center opacity-90 font-bold">Portfolio Selection</span>
              <h2 className="text-[14vw] leading-[0.75] font-heading text-center tracking-tighter uppercase mb-6 drop-shadow-2xl text-white">
                SELECTED<br /><span className="text-accent italic">PROJECTS</span>
              </h2>
              <div className="flex items-center gap-6 justify-center opacity-60">
                <div className="h-[1px] w-32 bg-white" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">Explore Gallery</span>
                <div className="h-[1px] w-32 bg-white" />
              </div>
            </motion.div>
          </div>

          {/* Project Slides */}
          {projects.map((project) => (
            <div key={project.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-12 md:p-24 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center max-w-7xl mx-auto">
                {/* Image Section */}
                <div className="relative group">
                  <div className="absolute -inset-6 bg-accent/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative border border-white/20 bg-white/15 backdrop-blur-md p-5 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-[1.03] group-hover:border-accent/50">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-accent text-white px-8 py-3 font-heading text-3xl z-20">
                      #{project.id}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col relative z-20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-[2px] bg-accent" />
                    <span className="text-accent font-mono text-xs uppercase tracking-[0.6em] font-bold">Case Study</span>
                  </div>
                  
                  <h3 className="text-6xl lg:text-8xl font-heading tracking-tighter leading-[0.85] mb-10 uppercase text-white drop-shadow-md">
                    {project.title}
                  </h3>
                  
                  <p className="text-xl lg:text-2xl font-bold leading-relaxed mb-12 text-white max-w-xl drop-shadow-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-16">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-5 py-2 border border-white/30 text-xs font-mono uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-sm font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-12 items-center">
                    {project.deploy && (
                      <a href={project.deploy} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-white hover:text-accent transition-all font-heading text-2xl uppercase tracking-tighter">
                        View Live <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-white hover:text-accent transition-all font-heading text-2xl uppercase tracking-tighter">
                      Source Code <Github size={24} className="group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Improved Progress Bar */}
        <div className="absolute bottom-12 left-12 right-12 z-50">
          <div className="flex justify-between items-end mb-4 font-mono text-[10px] tracking-[0.5em] uppercase opacity-80 text-white font-bold">
            <span>Scroll Status</span>
            <span className="text-accent">Slide 0{Math.floor(scrollYProgress.get() * totalSlides) + 1} / 0{totalSlides}</span>
          </div>
          <div className="h-[2px] bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent"
              style={{ width: progressWidth, boxShadow: '0 0 20px var(--accent)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
