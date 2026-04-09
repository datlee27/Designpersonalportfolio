import { motion } from 'motion/react';

const skills = [
  {
    category: "WEB DEV",
    items: ["JAVA", "JS", "HTML5", "CSS3", "SPRING", "TYPESCRIPT", "C#"]
  },
  {
    category: "DATA & API",
    items: ["SQL", "RETSFUL", "SWAGGER"]
  },
  {
    category: "AI & DESIGN",
    items: ["LM STUDIO", "FIGMA"]
  },
  {
    category: "HARDWARE (IOT)",
    items: ["ARDUINO", "SENSORS", "MOTORS"]
  },
  {
    category: "TOOLS ",
    items: ["GIT", "BOOTSTRAP", "VITE"]
  }
];

export function Skills() {
  const chiselEasing = [0.2, 0, 0, 1];

  return (
    <section id="skills" className="py-32 bg-paper text-ink overflow-hidden border-t-8 border-ink">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <motion.h2
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: chiselEasing }}
            className="text-huge leading-none text-right"
          >
            SKILLS /<br />TOOLS
          </motion.h2>
          <div className="w-full h-8 bg-ink mt-8 misaligned-left" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: chiselEasing, delay: index * 0.1 }}
              className="origin-left group"
            >
              <div className="flex items-end gap-6 mb-4">
                <span className="text-huge leading-none font-heading text-accent/20 group-hover:text-accent transition-colors duration-100">0{index + 1}</span>
                <h3 className="text-5xl font-heading mb-2 leading-none tracking-tighter">{skill.category}</h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    className="px-6 py-2 bg-ink text-paper font-bold tracking-tighter hover:bg-accent hover:text-ink transition-colors duration-100"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="w-full h-1 bg-ink/10 mt-12" />
            </motion.div>
          ))}
        </div>

        {/* Large Background Subject Element */}
        <div className="absolute -bottom-20 -left-20 opacity-5 pointer-events-none select-none">
          <p className="text-[20rem] font-heading leading-none">CORE</p>
        </div>
      </div>
    </section>
  );
}

