import { motion } from 'motion/react';
import { Mail, Github, Facebook, Phone } from 'lucide-react';

const contactLinks = [
  { name: "EMAIL", value: "LVD27012004@GMAIL.COM", href: "mailto:lvd27012004@gmail.com", icon: Mail },
  { name: "GITHUB", value: "DATLEE27", href: "https://github.com/datlee27", icon: Github },
  { name: "FACEBOOK", value: "DAT LEE", href: "https://www.facebook.com/le.van.at.760768", icon: Facebook },
];

export function Contact() {
  const chiselEasing = [0.2, 0, 0, 1] as const;

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center bg-ink text-white overflow-hidden border-t-8 border-ink"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] grayscale brightness-150">
          <img src="/assets/img/blueprint.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-accent/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-32 w-full items-center">
          <div className="flex-1">
            <motion.h2
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: chiselEasing }}
              className="text-huge md:text-[8vw] leading-[0.8] mb-16 font-heading uppercase italic"
            >
              LET'S<br />BUILD<br /><span className="text-accent drop-shadow-[0_0_20px_rgba(33,68,105,0.5)]">FUTURE</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.4 }}
              className="p-10 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
              <p className="text-2xl font-bold uppercase tracking-tighter text-white/90">
                AVAILABLE FOR INDEPENDENT CONTRACTS & BOLD COLLABORATIONS.
              </p>
            </motion.div>
          </div>

          <div className="flex-1 w-full space-y-6">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.5, ease: chiselEasing, delay: 0.1 * index }}
                  className="block group outline-none"
                >
                  <div className="bg-white/5 border border-white/10 p-6 md:p-10 flex items-center justify-between group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300 relative overflow-hidden">
                    <div className="space-y-2 flex-1 min-w-0 pr-4">
                       <div className="flex items-center gap-3">
                        <div className="w-6 h-[1px] bg-accent/50 group-hover:bg-accent" />
                        <span className="font-mono text-[10px] text-accent tracking-[0.3em] font-bold">{link.name}</span>
                       </div>
                      <h3 className="text-xl md:text-4xl font-heading leading-none text-white truncate lg:overflow-visible">
                        {link.value}
                      </h3>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-ink transition-colors" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
