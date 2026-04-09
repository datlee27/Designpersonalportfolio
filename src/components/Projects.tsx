import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { Github, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: '01',
    title: "P2P Electric EV Rental",
    description: "Developed a comprehensive Peer-to-Peer (P2P) electric vehicle rental system with PayOS, OCR, and AI Assistant. A revolutionary approach to urban mobility connecting EV owners with environmentally conscious commuters through a secure, industrial-grade backend.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png",
    tags: ["Spring Boot", "MySQL", "AI"],
    github: "https://github.com/datlee27/ecodanav2",
    accent: "bg-accent"
  },
  {
    id: '02',
    title: "AI-Integrated LMS",
    description: "Built a full-stack Learning Management System designed to modernize digital course management. Integrates advanced AI logic for personalized student recommendations, automated content tagging, and high-performance industrial learning workflows.",
    image: "/assets/img/projectlearning.png",
    tags: ["Java", "MySQL", "AI"],
    github: "https://github.com/datlee27/LearningWebsite-1",
    accent: "bg-ink"
  },
  {
    id: '03',
    title: "Smart Recycle Bin",
    description: "Led the engineering and design of a smart recycle bin using Arduino. Features a robust hybrid sensor array (IR, metal, rain) with mechanical waste sorting capabilities. A true experiment in IoT and sustainable brutalist hardware.",
    image: "/assets/img/projectpic.png",
    tags: ["Arduino", "IoT", "Sensors"],
    github: "https://github.com/datlee27/iot102-smart-recycle-bin",
    accent: "bg-accent"
  },
  {
    id: '04',
    title: "Fruit Shop Web App",
    description: "E-commerce web application for a high-traffic fruit marketplace using Java Servlets, JSP, and SQL Server. Features complex cart logic, session management, and a high-contrast industrial UI built for speed and reliability.",
    image: "/assets/img/fruitshop.png",
    tags: ["Java Servlets", "JSP", "SQL"],
    github: "https://github.com/datlee27/FruitShopOnline",
    accent: "bg-ink"
  }
];

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  const chiselEasing = [0.2, 0, 0, 1];

  return (
    <section id="projects" className="py-24 bg-paper text-ink overflow-hidden border-t-8 border-ink min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-ink pb-8">
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: chiselEasing }}
            className="text-huge leading-none"
          >
            SELECTED<br />WORKS
          </motion.h2>

          <div className="text-right hidden md:block opacity-40">
            <p className="font-bold uppercase text-xl tracking-tighter">PROJECT ARCHIVE (2024—2025)</p>
            <p className="font-heading text-lg">RECORDS_INDEX_FINAL_v1.0.1</p>
          </div>
        </div>

        <div className="embla mb-12" ref={emblaRef}>
          <div className="flex gap-12 cursor-grab active:cursor-grabbing py-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_35%] relative group"
              >
                <div className={`absolute -left-2 top-0 w-2 h-full ${project.accent} group-hover:w-4 transition-all duration-100 z-10`} />

                <div className="relative border-4 border-ink bg-paper overflow-hidden hover:rotate-[0.5deg] transition-transform duration-100 h-full flex flex-col">
                  <div className="h-[25vh] md:h-[30vh] overflow-hidden border-b-4 border-ink grayscale group-hover:grayscale-0 transition-all duration-300 relative">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-ink text-paper px-3 py-1 font-heading text-xl">
                      #{project.id}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-4xl font-heading tracking-tighter leading-none">{project.title}</h3>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors active:scale-90 transform">
                        <Github className="w-8 h-8" />
                      </a>
                    </div>

                    <div className="text-lg font-bold leading-tight mb-8 opacity-80 flex-grow overflow-y-auto max-h-[3.75em] md:max-h-[5em] pr-2 custom-scrollbar">
                      {project.description}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1 border-2 border-ink text-xs font-bold uppercase tracking-tighter bg-ink text-paper">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Misaligned back shadow */}
                <div className="absolute -z-10 bg-accent/5 -bottom-4 -right-4 w-full h-full border-2 border-ink/10" />
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLS SECTION */}
        <div className="mt-16 border-t-4 border-ink pt-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Progress Bar Container */}
            <div className="flex-grow w-full">
              <div className="h-6 bg-ink/10 relative overflow-hidden border-2 border-ink">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-accent"
                  style={{ width: `${scrollProgress}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-0.5 h-full bg-ink/10" />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between font-heading text-xl tracking-tighter opacity-40">
                <span>START_00%</span>
                <span>MID_50%</span>
                <span>END_100%</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={scrollPrev}
                className="w-20 h-20 border-4 border-ink flex items-center justify-center hover:bg-ink hover:text-paper hover:misaligned-left transition-all active:scale-95 bg-paper"
                aria-label="Previous Project"
              >
                <ArrowLeft className="w-10 h-10" />
              </button>
              <button
                onClick={scrollNext}
                className="w-20 h-20 border-4 border-ink flex items-center justify-center hover:bg-ink hover:text-paper hover:misaligned-right transition-all active:scale-95 bg-paper"
                aria-label="Next Project"
              >
                <ArrowRight className="w-10 h-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
