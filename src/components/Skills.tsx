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
  const chiselEasing = [0.2, 0, 0, 1] as const;

  return (
    <section id="skills" className="relative py-24 md:py-40 bg-ink text-white overflow-hidden border-t-8 border-ink">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 flex flex-col items-end">
          <motion.h2
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: chiselEasing }}
            className="text-huge leading-none text-right uppercase text-white drop-shadow-2xl"
          >
            TECHNICAL<br /><span className="text-accent italic">ARSENAL</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16 md:gap-y-24">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: chiselEasing, delay: index * 0.1 }}
              className="origin-left group"
            >
              <div className="flex items-end gap-4 md:gap-8 mb-6 md:mb-8">
                <span className="text-6xl md:text-huge leading-none font-heading text-accent/10 group-hover:text-accent transition-all duration-500 scale-90 group-hover:scale-100">0{index + 1}</span>
                <div className="flex flex-col">
                  <div className="w-8 h-[2px] bg-accent mb-2" />
                  <h3 className="text-3xl md:text-5xl font-heading leading-none tracking-tighter uppercase text-white group-hover:text-accent transition-colors">
                    {skill.category}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-8 py-3 bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-[0.3em] hover:bg-accent hover:border-accent hover:text-ink transition-all duration-300 backdrop-blur-sm font-bold"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="w-full h-[1px] bg-white/10 mt-16 group-hover:bg-accent/40 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Large Background Subject Element */}
        <div className="absolute -bottom-20 left-0 -translate-x-10 md:-translate-x-20 opacity-5 pointer-events-none select-none">
          <p className="text-[25vw] font-heading leading-none text-white uppercase">SYSTEM</p>
        </div>
      </div>
    </section>
  );
}

