import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen bg-white text-black py-32 font-sans">
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
            ABOUT ME
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-xl leading-relaxed text-gray-700">
                Hi, I'm <span className="font-bold text-[#FF5722]">Dat Lee</span>. I'm a passionate web developer dedicated to creating beautiful, functional,
                and user-centered digital experiences. With a focus on minimalist design
                and modern technologies, I bring ideas to life through clean code and
                thoughtful interfaces.
              </p>
              <p className="text-xl leading-relaxed text-gray-700">
                My approach combines technical expertise with creative problem-solving,
                ensuring every project not only looks stunning but performs flawlessly
                across all devices and platforms.
              </p>
              <p className="text-xl leading-relaxed text-gray-700">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge through
                writing and mentoring.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden group">
                <ImageWithFallback
                  src="/assets/img/about-pic.JPG"
                  alt="Professional portrait"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border-4 border-black group-hover:border-[#FF5722] transition-colors duration-300 -translate-x-4 -translate-y-4 -z-10" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
