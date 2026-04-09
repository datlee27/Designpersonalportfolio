import { motion } from 'motion/react';
import { useRef } from 'react';
import { Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: '01',
    title: "P2P Electric EV Rental",
    description: "Developed a comprehensive Peer-to-Peer (P2P) electric vehicle rental system with PayOS, OCR, and AI Assistant.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png",
    tags: ["Spring Boot", "MySQL", "AI"],
    github: "https://github.com/datlee27/ecodanav2",
    accent: "bg-accent"
  },
  {
    id: '02',
    title: "AI-Integrated LMS",
    description: "Built a full-stack Learning Management System modernize course management. Integrates AI for recommendations.",
    image: "/assets/img/projectlearning.png",
    tags: ["Java", "MySQL", "AI"],
    github: "https://github.com/datlee27/LearningWebsite-1",
    accent: "bg-ink"
  },
  {
    id: '03',
    title: "Smart Recycle Bin",
    description: "Led the design of a smart recycle bin using Arduino. Features IR, metal, and rain sensors.",
    image: "/assets/img/projectpic.png",
    tags: ["Arduino", "IoT", "Sensors"],
    github: "https://github.com/datlee27/iot102-smart-recycle-bin",
    accent: "bg-accent"
  },
  {
    id: '04',
    title: "Fruit Shop Web App",
    description: "E-commerce web application for a fruit shop using Java Servlets, JSP, and SQL Server.",
    image: "/assets/img/fruitshop.png",
    tags: ["Java Servlets", "JSP", "SQL"],
    github: "https://github.com/datlee27/FruitShopOnline",
    accent: "bg-ink"
  }
];

export function Projects() {
  const chiselEasing = [0.2, 0, 0, 1];

  return (
    <section id="projects" className="py-32 bg-paper text-ink overflow-hidden border-t-8 border-ink">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-4 border-ink pb-8">
          <motion.h2 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: chiselEasing }}
            className="text-huge leading-none"
          >
            SELECTED<br />WORKS
          </motion.h2>
          <div className="text-right hidden md:block">
            <p className="font-bold uppercase text-2xl tracking-tighter">PROJECT ARCHIVE (2024—2025)</p>
            <p className="text-accent font-heading text-xl">Brutalist. Functional. Raw.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: chiselEasing, delay: (index % 2) * 0.1 }}
              className={`relative group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              {/* Vertical Accent Stripe */}
              <div className={`absolute -left-4 top-0 w-2 h-full ${project.accent} group-hover:w-4 transition-all duration-100`} />
              
              <div className="relative border-4 border-ink bg-paper overflow-hidden">
                <div className="h-64 sm:h-80 overflow-hidden border-b-4 border-ink grayscale group-hover:grayscale-0 transition-all duration-100">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-heading text-4xl text-ink/30 italic">/{project.id}</span>
                    <div className="flex gap-4">
                      <a href={project.github} className="hover:text-accent transition-colors">
                        <Github className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-heading mb-4 tracking-tighter">{project.title}</h3>
                  <p className="text-lg font-medium leading-tight mb-8">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-ink text-paper text-xs font-bold uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corner Stamp */}
                <div className="absolute top-0 right-0 p-2 bg-ink text-paper font-heading text-sm transform origin-top-right rotate-90 translate-x-full group-hover:translate-x-0 transition-transform duration-200">
                  VIEW PROJECT
                </div>
              </div>

              {/* Background Shadow Block (Brutalist Offset) */}
              <div className="absolute -z-10 bg-ink/5 top-4 left-4 w-full h-full pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

