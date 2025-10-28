import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovation Corp",
    period: "2023 - Present",
    description: "Leading the development of modern web applications using React and TypeScript. Mentoring junior developers and establishing best practices.",
    type: "work"
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    period: "2021 - 2023",
    description: "Developed and maintained multiple client projects. Implemented responsive designs and optimized performance across platforms.",
    type: "work"
  },
  {
    title: "Master of Computer Science",
    company: "University of Technology",
    period: "2019 - 2021",
    description: "Specialized in Web Technologies and Human-Computer Interaction. Graduated with honors.",
    type: "education"
  },
  {
    title: "Frontend Developer",
    company: "Creative Agency",
    period: "2019 - 2021",
    description: "Created engaging user interfaces for various clients. Collaborated with designers to bring creative visions to life.",
    type: "work"
  },
  {
    title: "Bachelor of Software Engineering",
    company: "State University",
    period: "2015 - 2019",
    description: "Foundation in software development, algorithms, and data structures. Active member of coding club.",
    type: "education"
  }
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen bg-white text-black py-32">
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
            EXPERIENCE & EDUCATION
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`relative mb-16 md:mb-24 md:grid md:grid-cols-2 md:gap-8 ${
                    index % 2 === 0 ? '' : 'md:grid-flow-dense'
                  }`}
                >
                  {/* Icon */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-black border-4 border-white flex items-center justify-center z-10">
                    {exp.type === 'work' ? (
                      <Briefcase className="w-6 h-6 text-white" />
                    ) : (
                      <GraduationCap className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}>
                    <div className="inline-block bg-black text-white px-4 py-2 mb-4">
                      <p className="text-sm tracking-wider">{exp.period}</p>
                    </div>
                    <h3 className="text-2xl mb-2">{exp.title}</h3>
                    <p className="text-gray-600 mb-4">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
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
