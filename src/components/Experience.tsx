import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    title: "Software Engineer",
    company: "FPT University, Da Nang",
    period: "Sep 2022 – Present",
    description: "Currently pursuing a degree in Software Engineering, focusing on modern software development practices and technologies.",
    type: "education" // It says education in title in html but "Software Engineer" as well. I'll treat as education based on legacy context
  },
  {
    title: "High School",
    company: "Phan Chau Trinh High School, Da Nang",
    period: "2020 – Jul 2022",
    description: "Completed high school education with a focus on natural sciences.",
    type: "education"
  }
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="min-h-screen bg-white text-black py-32 font-sans">
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
            EDUCATION
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#E0E0E0] md:-translate-x-1/2" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`relative mb-16 md:mb-24 md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:grid-flow-dense'
                    }`}
                >
                  {/* Icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-black border-4 border-white flex items-center justify-center z-10 shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}>
                    <div className={`inline-block bg-black text-white px-4 py-2 mb-4 hover:bg-[#FF5722] transition-colors duration-300`}>
                      <p className="text-sm tracking-widest uppercase font-medium">{exp.period}</p>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <p className="text-gray-500 font-medium mb-4">{exp.company}</p>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
