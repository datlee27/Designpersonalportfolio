import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern, fully-featured e-commerce solution with real-time inventory management and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNjMxODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "Next.js", "Stripe", "PostgreSQL"],
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio CMS",
    description: "Content management system designed for creatives to showcase their work with beautiful, customizable templates.",
    image: "https://images.unsplash.com/photo-1590212151175-e58edd96185b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZGVzayUyMHNldHVwfGVufDF8fHx8MTc2MTY2Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["TypeScript", "React", "Tailwind", "Supabase"],
    link: "#",
    github: "#"
  },
  {
    title: "Task Management App",
    description: "Intuitive task manager with team collaboration features, real-time updates, and advanced filtering capabilities.",
    image: "https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjE1NzU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#",
    github: "#"
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics platform with interactive charts, custom reports, and data visualization tools.",
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYxNTk2OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "D3.js", "Express", "Redis"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen bg-black text-white py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800' }}
          >
            PROJECTS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative overflow-hidden border border-gray-800 hover:border-white transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-gray-700 text-sm text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      className="flex items-center gap-2 hover:text-gray-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>View Project</span>
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center gap-2 hover:text-gray-400 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
