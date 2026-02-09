import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useState, useRef, TouchEvent } from 'react';
import { Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    id: '01',
    title: "P2P Electric Vehicle Rental",
    description: "Developed a comprehensive Peer-to-Peer (P2P) electric vehicle rental system, connecting Vehicle Owners and Customers. Features include PayOS payment, Cloudinary storage, OCR verification, and AI Assistant. The system manages the entire rental lifecycle from booking to payment and vehicle return, ensuring a seamless experience for all users involved in the sustainable transportation ecosystem.",
    image: "https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png",
    tags: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "AI Assistant"],
    link: "https://ecodanav2.onrender.com/",
    github: "https://github.com/datlee27/ecodanav2"
  },
  {
    id: '02',
    title: "AI-Integrated LMS",
    description: "Built a full-stack Learning Management System using Java and MySQL to modernize course management. Integrates AI for smart recommendations and student performance analysis. The platform supports various user roles including administrators, instructors, and students, providing tailored dashboards and reporting tools to enhance the educational process.",
    image: "/assets/img/projectlearning.png",
    tags: ["Java", "MySQL", "RESTful API", "AI Integration"],
    link: "#",
    github: "https://github.com/datlee27/LearningWebsite-1"
  },
  {
    id: '03',
    title: "Smart Recycle Bin (IoT)",
    description: "Led the design and development of a smart recycle bin using Arduino. Features IR, metal, and rain sensors to automatically sort waste into metal, wet, and dry categories. This IoT solution aims to improve waste management efficiency by automating the segregation process at the source, reducing manual labor and contamination rates.",
    image: "/assets/img/projectpic.png",
    tags: ["Arduino", "IoT", "Sensors", "Motors"],
    link: "#",
    github: "https://github.com/datlee27/iot102-smart-recycle-bin"
  },
  {
    id: '04',
    title: "Fruit Shop Web App",
    description: "Developed a complete e-commerce web application for a fruit shop using Java Servlets, JSP, and SQL Server. Features user authentication, product management, and cart system. The application allows customers to browse fresh produce, add items to their cart, and securely checkout, while administrators can manage inventory and orders through a dedicated backend interface.",
    image: "/assets/img/fruitshop.png",
    tags: ["Java Servlets", "JSP", "SQL Server", "Bootstrap"],
    link: "#",
    github: "https://github.com/datlee27/FruitShopOnline"
  },
  {
    id: '05',
    title: "Hotel Booking System",
    description: "Developed core features for a web-based hotel booking system. Implemented user registration, login, and reservation management with a responsive front-end. The system handles room availability in real-time and allows guests to filter rooms based on amenities and price, providing a user-friendly booking experience.",
    image: "/assets/img/booking.png",
    tags: ["Java", "MySQL", "HTML5", "CSS3"],
    link: "#",
    github: "https://github.com/datlee27/HotelBookingSystem"
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProject();
    }
    if (isRightSwipe) {
      prevProject();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardClass = (index: number) => {
    if (index === activeIndex) return 'active';
    const len = projects.length;
    const nextIndex = (activeIndex + 1) % len;
    const prevIndex = (activeIndex - 1 + len) % len;

    if (index === nextIndex) return 'next';
    if (index === prevIndex) return 'prev';
    return 'hidden-card';
  };

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-32 overflow-hidden">
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
            className="mb-16 text-center"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800' }}
          >
            PROJECTS
          </motion.h2>

          <div
            className="carousel-container relative h-[640px] w-full flex justify-center items-center perspective-1000"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Buttons - Hidden on Mobile */}
            <div className="absolute w-full hidden md:flex justify-between px-12 z-50 pointer-events-none">
              <button
                onClick={prevProject}
                className="pointer-events-auto rounded-full p-4 border border-white/30 bg-white/10 hover:bg-white/30 hover:scale-110 transition-all text-white backdrop-blur-sm"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextProject}
                className="pointer-events-auto rounded-full p-4 border border-white/30 bg-white/10 hover:bg-white/30 hover:scale-110 transition-all text-white backdrop-blur-sm"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="carousel relative w-full h-full transform-style-3d">
              {projects.map((project, index) => {
                const cardClass = getCardClass(index);
                let transform = '';
                let opacity = 0;
                let zIndex = 0;

                if (cardClass === 'active') {
                  transform = 'translateX(-50%) translateZ(0) rotateY(0deg) scale(1)';
                  opacity = 1;
                  zIndex = 10;
                } else if (cardClass === 'prev') {
                  transform = 'translateX(-150%) translateZ(-200px) rotateY(35deg) scale(0.85)';
                  opacity = 0.5;
                  zIndex = 5;
                } else if (cardClass === 'next') {
                  transform = 'translateX(50%) translateZ(-200px) rotateY(-35deg) scale(0.85)';
                  opacity = 0.5;
                  zIndex = 5;
                } else {
                  transform = 'translateX(-50%) translateZ(-400px) scale(0)';
                  opacity = 0;
                  zIndex = 0;
                }

                return (
                  <div
                    key={project.id}
                    className={`absolute top-0 left-1/2 w-[300px] sm:w-[500px] h-[580px] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-700 ease-out`}
                    style={{
                      transform,
                      opacity,
                      zIndex,
                    }}
                  >
                    <div className="h-[200px] overflow-hidden rounded-t-2xl flex-shrink-0">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col h-[calc(100%-200px)]">
                      <div className="flex justify-between items-baseline mb-2 flex-shrink-0">
                        <span className="text-xl font-bold text-white/50">{project.id}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-3 flex-shrink-0">{project.title}</h3>

                      {/* Scrollable Description Container */}
                      <div className="flex-grow overflow-y-auto pr-2 mb-4 scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-white/10 rounded">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 flex-shrink-0">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[#FF5722]/10 text-[#FF5722] text-xs font-medium rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-[#FF5722] transition-colors self-start flex-shrink-0"
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-[#FF5722]' : 'w-2 bg-gray-600 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
