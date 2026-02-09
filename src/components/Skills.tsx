import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Database, Palette, Cpu, PenTool } from 'lucide-react';

const skills = [
  {
    category: "Web Development & Programming",
    icon: Code2,
    items: ["Java", "JavaScript", "HTML5", "CSS3", "JSP"]
  },
  {
    category: "Database & API",
    icon: Database,
    items: ["SQL Server", "MySQL", "RESTful API (Swagger)"]
  },
  {
    category: "AI & Design",
    icon: Palette,
    items: ["AI Integration", "LM Studio", "Figma"]
  },
  {
    category: "Hardware (IoT)",
    icon: Cpu,
    items: ["Arduino", "Sensors (IR, Metal, Rain)", "Motors (Stepper, Servo)"]
  },
  {
    category: "Tools & Others",
    icon: PenTool,
    items: ["Git", "Bootstrap"]
  }
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="min-h-screen bg-black text-white py-32 font-sans">
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
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', letterSpacing: '-0.02em' }}
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
                    <Icon className="w-12 h-12 text-white group-hover:scale-110 group-hover:text-[#FF5722] transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl mb-4 font-bold">{skill.category}</h3>
                  <ul className="space-y-2 text-gray-400">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white group-hover:bg-[#FF5722] transition-colors" />
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
