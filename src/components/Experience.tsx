import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
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

function StackingCard({
  exp,
  index,
  containerRef,
}: {
  exp: typeof experiences[0];
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cardStart = (index * 0.4); 
  const cardEnd = ((index + 1) * 0.4);

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, 0.9, 1],
    [1, 1, 0.95, 0.9]
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, 0.9, 1],
    [1, 1, 0.8, 0.6]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="sticky w-full optimize-gpu"
      data-card-index={index}
    >
      <div
        style={{ top: `calc(20vh + ${index * 2.5}rem)` }}
        className="sticky"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative group">
            <div className="absolute -left-4 md:-left-12 top-1/2 w-4 md:w-12 h-[2px] bg-accent/30 group-hover:bg-accent transition-colors" />
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 group-hover:border-accent/50 transition-all duration-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors optimize-gpu" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <span className="text-accent font-mono text-sm tracking-[0.3em] font-bold uppercase">{exp.period}</span>
                  <div className="w-12 h-[2px] bg-accent/50" />
                </div>
                <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-accent opacity-20 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12" />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-heading mb-4 md:mb-6 leading-none tracking-tighter text-white uppercase italic">
                {exp.title}
              </h3>
              
              <p className="text-xl md:text-2xl font-bold uppercase mb-4 md:mb-6 text-accent tracking-widest">{exp.company}</p>
              
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white/60 max-w-2xl">
                {exp.description}
              </p>

              <div className="absolute bottom-4 right-8 opacity-10">
                <span className="font-mono text-xs tracking-tighter uppercase">MOD-EXP-0{index + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const chiselEasing = [0.2, 0, 0, 1] as const;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-ink text-white border-t-8 border-ink"
      style={{ height: '160vh' }}
    >
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05] grayscale brightness-150">
          <img src="/assets/img/blueprint.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-6 md:left-[50%] lg:left-[calc(50%-450px)] top-0 w-[2px] h-full bg-gradient-to-b from-accent/50 via-accent to-accent/50 opacity-20" />
      </div>

      <div className="sticky top-0 z-0 pointer-events-none">
        <div className="container mx-auto px-6 pt-24 md:pt-32 pb-12">
          <div className="mb-12 md:mb-20 flex flex-col items-start gap-4 pointer-events-auto">
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: chiselEasing }}
              className="text-huge md:text-huge leading-none uppercase text-white/20 optimize-gpu"
            >
              CHRONO<br /><span className="text-accent/20">LOGY</span>
            </motion.h2>
            <div className="w-24 md:w-32 h-[4px] bg-accent shadow-[0_0_15px_var(--accent)]" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-0 md:px-6 relative z-10 -mt-32">
        {experiences.map((exp, index) => (
          <StackingCard
            key={index}
            exp={exp}
            index={index}
            total={experiences.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}
