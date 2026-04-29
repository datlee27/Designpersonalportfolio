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
  total,
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

  // Each card occupies a range of scroll progress
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;

  // Scale down when a later card stacks on top
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, Math.min(cardEnd + 0.1, 1)],
    [1, 1, index < total - 1 ? 0.95 : 1]
  );

  // Dim when covered by a later card
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, Math.min(cardEnd + 0.1, 1)],
    [1, 1, index < total - 1 ? 0.6 : 1]
  );

  // Slight downward push for depth
  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, Math.min(cardEnd + 0.1, 1)],
    [0, 0, index < total - 1 ? 10 : 0]
  );

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="sticky w-full"
      // Each card stacks a little lower so you can see the cascade
      data-card-index={index}
    >
      <div
        style={{ top: `calc(20vh + ${index * 2}rem)` }}
        className="sticky"
      >
        <div className="max-w-5xl mx-auto">
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
      className="relative bg-accent text-ink border-t-8 border-ink"
      style={{ height: `${(experiences.length) * 100}vh` }}
    >
      <div className="sticky top-0">
        {/* Header — stays visible at top */}
        <div className="container mx-auto px-6 pt-24 pb-8">
          <div className="mb-12 flex items-center gap-8">
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
            <div className="hidden md:block chisel-block w-24 h-12" />
          </div>
        </div>
      </div>

      {/* Stacking cards area */}
      <div className="container mx-auto px-6 relative">
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
