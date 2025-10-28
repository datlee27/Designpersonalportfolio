import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Palette, Database, Smartphone, Zap, Globe } from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Motion/Framer"]
  },
  {
    category: "Design",
    icon: Palette,
    items: ["Figma", "UI/UX Design", "Responsive Design", "Design Systems"]
  },
  {
    category: "Backend",
    icon: Database,
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  {
    category: "Mobile",
    icon: Smartphone,
    items: ["React Native", "Progressive Web Apps", "Mobile-First Design"]
  },
  {
    category: "Performance",
    icon: Zap,
    items: ["Optimization", "SEO", "Core Web Vitals", "Accessibility"]
  },
  {
    category: "Tools",
    icon: Globe,
    items: ["Git", "Docker", "CI/CD", "Testing", "Webpack"]
  }
];

export function Skills() {
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
            SKILLS
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="border border-gray-800 p-8 hover:border-white transition-all duration-300 group"
                >
                  <div className="mb-6">
                    <Icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl mb-4">{skill.category}</h3>
                  <ul className="space-y-2 text-gray-400">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
