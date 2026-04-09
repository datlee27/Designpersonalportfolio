import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

const experiences = [
  {
    title: "Software Engineer",
    company: "FPT University, Da Nang",
    period: "2022 – PRES",
    description: "Currently pursuing a degree in Software Engineering, focusing on modern software development practices and technologies."
  },
  {
    title: "High School",
    company: "Phan Chau Trinh High School, Da Nang",
    period: "2020 – 2022",
    description: "Completed high school education with a focus on natural sciences."
  }
];

export function Experience() {
  const chiselEasing = [0.2, 0, 0, 1];

  return (
    <section id="experience" className="py-32 bg-paper text-ink overflow-hidden border-t-8 border-ink">
      <div className="container mx-auto px-6">
        <div className="mb-24 flex items-center gap-8">
          <motion.h2 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: chiselEasing }}
            className="text-huge leading-none"
          >
            JOURNEY
          </motion.h2>
          <div className="flex-1 h-1 bg-ink" />
          <div className="hidden md:block chisel-block-accent w-24 h-12" />
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: chiselEasing, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full">
                <div className="chisel-block p-10 group hover:misaligned-right transition-transform duration-100">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-accent font-heading text-4xl">{exp.period}</span>
                    <GraduationCap className="w-10 h-10 opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-5xl font-heading mb-4 leading-none tracking-tighter">{exp.title}</h3>
                  <p className="text-xl font-bold uppercase mb-4 text-accent">{exp.company}</p>
                  <p className="text-lg font-medium leading-tight opacity-80">
                    {exp.description}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-32 h-1 bg-ink self-center" />
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

