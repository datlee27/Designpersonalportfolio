import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const chiselEasing = [0.2, 0, 0, 1] as const;

  return (
    <section id="about" className="py-32 bg-paper text-ink overflow-hidden border-t-8 border-ink relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-24 items-start">
          <div className="flex-1 space-y-12">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: chiselEasing }}
                className="text-huge leading-none"
              >
                THE<br />MAKER
              </motion.h2>
            </div>

            <div className="w-full h-2 bg-ink" />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: chiselEasing, delay: 0.3 }}
              className="space-y-8"
            >
              <p className="text-3xl font-bold leading-none tracking-tighter uppercase">
                HI, I'M <span className="text-accent">DAT LEE</span>.
              </p>
              <p className="text-xl font-bold leading-tight">
                I'M A PASSIONATE DEVELOPER DEDICATED TO CREATING BOLD, FUNCTIONAL, AND USER-CENTERED DIGITAL EXPERIENCES.
                I DON'T JUST CODE; I STAMP BRAND IDENTITY INTO THE WEB.
              </p>
              <p className="text-lg font-medium leading-tight text-ink/80">
                MY APPROACH COMBINES TECHNICAL RIGOR WITH BRUTALIST AESTHETICS, ENSURING EVERY PROJECT IS A RAW STATEMENT OF INTENT.
              </p>

              <div className="flex gap-4 pt-12">
                <div className="w-12 h-12 bg-accent chisel-block-accent" />
                <div className="w-24 h-12 bg-ink chisel-block" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: chiselEasing }}
            className="flex-1 relative"
          >
            <div className="relative z-10 border-8 border-ink p-4 bg-paper misaligned-right">
              <ImageWithFallback
                src="https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg"
                alt="Professional portrait"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            {/* Chisel Accent Underlay */}
            <div className="absolute top-10 right-0 w-full h-full bg-accent -z-10 chisel-block-accent translate-x-4 md:translate-x-10" />
          </motion.div>
        </div>
      </div>

      {/* Decorative Stamp */}
      <div className="absolute bottom-20 right-10 rotate-12 opacity-10 pointer-events-none hidden md:block">
        <p className="font-heading text-9xl">DAT LEE</p>
      </div>
    </section>
  );
}

