import { motion, useScroll, useTransform, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: '05',
    title: "Dev Roadmap Tracking System",
    description: "An advanced learning management platform designed for developers to track a 3-month personalized roadmap. Featuring a dynamic task manager across multiple phases, an interactive weekly schedule with drag-and-drop functionality, and a persistent data synchronization system using LocalStorage.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775903083/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.23.35_z4qpji.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "FE"],
    github: "https://github.com/datlee27/dev-roadmap",
    deploy: "https://dev-roadmap-brown.vercel.app/",
    accent: "bg-blue-500",
    status: "Latest"
  },
  {
    id: '06',
    title: "IELTS Writing Typing Practice",
    description: "A specialized training tool designed to simulate the IELTS Computer-based Writing environment. It focuses on improving typing speed and accuracy under exam conditions, featuring a split-screen interface for task prompts and real-time text editing, integrated word counting, and customizable practice sessions.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775904892/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.52.52_cb9myu.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Educational", "FE"],
    github: "https://github.com/datlee27/Practice-ielts-writing-typing-react",
    accent: "bg-emerald-500",
    status: "Latest"
  },
  {
    id: '01',
    title: "P2P Electric EV Rental",
    description: "Developed a comprehensive Peer-to-Peer (P2P) electric vehicle rental system with PayOS, OCR, and AI Assistant. A revolutionary approach to urban mobility connecting EV owners with environmentally conscious commuters through a secure, industrial-grade backend.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png",
    tags: ["Spring Boot", "MySQL", "AI", "FullStack"],
    github: "https://github.com/datlee27/ecodanav2",
    accent: "bg-accent",
    status: "2025"
  },
  {
    id: '02',
    title: "AI-Integrated LMS",
    description: "Built a full-stack Learning Management System designed to modernize digital course management. Integrates advanced AI logic for personalized student recommendations, automated content tagging, and high-performance industrial learning workflows.",
    image: "/assets/img/projectlearning.png",
    tags: ["Java", "MySQL", "AI", "FullStack"],
    github: "https://github.com/datlee27/LearningWebsite-1",
    accent: "bg-ink",
    status: "2025"
  },
  {
    id: '03',
    title: "Smart Recycle Bin",
    description: "Led the engineering and design of a smart recycle bin using Arduino. Features a robust hybrid sensor array (IR, metal, rain) with mechanical waste sorting capabilities. A true experiment in IoT and sustainable brutalist hardware.",
    image: "/assets/img/projectpic.png",
    tags: ["Arduino", "IoT", "Sensors"],
    github: "https://github.com/datlee27/iot102-smart-recycle-bin",
    accent: "bg-accent",
    status: "2025"
  },
  {
    id: '04',
    title: "Fruit Shop Web App",
    description: "E-commerce web application for a high-traffic fruit marketplace using Java Servlets, JSP, and SQL Server. Features complex cart logic, session management, and a high-contrast industrial UI built for speed and reliability.",
    image: "/assets/img/fruitshop.png",
    tags: ["Java Servlets", "JSP", "SQL", "FullStack"],
    github: "https://github.com/datlee27/FruitShopOnline",
    accent: "bg-ink",
    status: "2025"
  }
];

// Theme generator for alternating brutalist backgrounds
const getTheme = (index: number) => {
  const themes = [
    { bg: 'bg-paper', text: 'text-ink', border: 'border-ink' },
    { bg: 'bg-ink', text: 'text-paper', border: 'border-paper' },
    { bg: 'bg-accent', text: 'text-ink', border: 'border-ink' },
  ];
  return themes[index % themes.length];
};

const getTagTheme = (bg: string) => {
  if (bg === 'bg-ink') return 'bg-paper text-ink';
  return 'bg-ink text-paper';
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Total slides = 1 (Title Page) + all projects
  const totalSlides = projects.length + 1;
  const translateEnd = -((totalSlides - 1) * 100);
  
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `${translateEnd}vw`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // ─── MOBILE: Vertical stacking full-screen blocks ───
  if (isMobile) {
    return (
      <section id="projects" className="bg-paper text-ink border-t-8 border-ink overflow-hidden">
        {/* Title Page */}
        <div className="min-h-[60vh] flex items-center justify-center border-b-8 border-ink bg-paper p-6">
           <h2 className="text-[18vw] leading-none font-heading text-center tracking-tighter">
             SELECTED<br />WORKS
           </h2>
        </div>

        {/* Project Pages */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectSlide key={project.id} project={project} index={index} isMobile={true} />
          ))}
        </div>
      </section>
    );
  }

  // ─── DESKTOP: Sticky horizontal full-screen scroll ───
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-paper text-ink border-t-8 border-ink"
      style={{ height: `${totalSlides * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex" style={{ overflow: 'clip' }}>
        
        {/* Horizontal scroll track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full w-full"
        >
          {/* Slide 0: Title Page */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-paper text-ink border-r-8 border-ink p-12">
             <h2 className="text-[15vw] leading-[0.8] font-heading text-center tracking-tighter">
               SELECTED<br />WORKS
             </h2>
          </div>

          {/* Slide 1+: Project Pages */}
          {projects.map((project, index) => (
             <ProjectSlide key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Global Progress Bar Overlay (mix-blend-difference allows it to be visible on any background) */}
        <div className="absolute bottom-8 left-8 right-8 z-50 pointer-events-none mix-blend-difference">
          <div className="h-4 bg-white/20 relative overflow-hidden border-2 border-white">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              style={{ width: progressWidth }}
            />
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              {[...Array(totalSlides)].map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-white/20" />
              ))}
            </div>
          </div>
          <div className="mt-2 flex justify-between font-heading text-lg tracking-tighter text-white/50">
            <span>START_00%</span>
            <span>SLIDE_{Math.round(progressWidth.get() as number)}%</span>
            <span>END_100%</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Project Full-Screen Slide Component ───
function ProjectSlide({ project, index, isMobile }: { project: typeof projects[0], index: number, isMobile?: boolean }) {
  // Theme starts from index 1 because Title is index 0
  const theme = getTheme(index + 1);
  const tagTheme = getTagTheme(theme.bg);

  return (
    <div className={`${isMobile ? 'w-full min-h-screen border-b-8' : 'w-screen h-screen border-r-8'} flex-shrink-0 flex flex-col md:flex-row ${theme.bg} ${theme.text} ${theme.border}`}>
      
      {/* Left/Top: Image Side */}
      <div className={`w-full md:w-1/2 ${isMobile ? 'h-[45vh]' : 'h-full'} border-b-8 md:border-b-0 relative flex items-center justify-center p-8 md:p-16 lg:p-24`}>
         <div className={`relative w-full h-full overflow-hidden border-8 ${theme.border} shadow-[8px_8px_0px_0px_currentColor] grayscale hover:grayscale-0 transition-all duration-500 group`}>
             <ImageWithFallback
               src={project.image}
               alt={project.title}
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
             />
             {/* Brutalist Decorators inside Image */}
             <div className={`absolute top-4 left-4 ${theme.bg} ${theme.text} px-3 py-1 font-heading text-2xl border-4 ${theme.border}`}>
                #{project.id}
             </div>
             {project.status && (
                <div className={`absolute top-4 right-4 px-3 py-1 font-bold text-xs uppercase tracking-widest border-4 ${theme.border} shadow-[4px_4px_0px_0px_currentColor] ${project.status.toLowerCase() === 'latest' ? 'bg-[#e84c4c] text-ink' : theme.bg}`}>
                   {project.status}
                </div>
             )}
         </div>
      </div>

      {/* Right/Bottom: Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:p-16 lg:px-24 h-full relative">
         <div className="max-w-2xl">
             <div className="flex justify-between items-start mb-8">
                <h3 className="text-4xl lg:text-6xl font-heading tracking-tighter leading-none pr-8 uppercase">
                   {project.title}
                </h3>
                <div className="flex gap-4 shrink-0">
                   {project.deploy && (
                     <a href={project.deploy} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity active:scale-90 transform">
                       <ExternalLink className="w-8 h-8 lg:w-10 lg:h-10" />
                     </a>
                   )}
                   <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity active:scale-90 transform">
                     <Github className="w-8 h-8 lg:w-10 lg:h-10" />
                   </a>
                </div>
             </div>

             <div className="text-lg lg:text-xl font-bold leading-relaxed mb-12 opacity-90">
                {project.description}
             </div>

             <div className="flex flex-wrap gap-3 mt-auto">
                {project.tags.map(tag => (
                   <span key={tag} className={`px-5 py-2 border-4 ${theme.border} text-xs lg:text-sm font-bold uppercase tracking-widest ${tagTheme}`}>
                     {tag}
                   </span>
                ))}
             </div>
         </div>
      </div>

    </div>
  );
}
