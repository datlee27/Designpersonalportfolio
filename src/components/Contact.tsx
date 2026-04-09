import { motion } from 'motion/react';
import { Mail, Github, Facebook, Phone } from 'lucide-react';

const contactLinks = [
  { name: "EMAIL", value: "LVD27012004@GMAIL.COM", href: "mailto:lvd27012004@gmail.com", icon: Mail },
  { name: "GITHUB", value: "DATLEE27", href: "https://github.com/datlee27", icon: Github },
  { name: "FACEBOOK", value: "DAT LEE", href: "https://www.facebook.com/le.van.at.760768", icon: Facebook },
  { name: "PHONE", value: "0766554586", href: "tel:0766554586", icon: Phone }
];

export function Contact() {
  const chiselEasing = [0.2, 0, 0, 1];

  return (
    <section id="contact" className="py-40 bg-paper text-ink overflow-hidden border-t-8 border-ink">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24 w-full">
          <div className="flex-1">
            <motion.h2 
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: chiselEasing }}
              className="text-huge leading-[0.85] mb-12"
            >
              LET'S<br />WORK<br /><span className="text-accent misaligned-right inline-block">FIX</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.4 }}
              className="p-8 border-4 border-ink misaligned-left bg-paper"
            >
              <p className="text-2xl font-bold uppercase tracking-tighter">
                AVAILABLE FOR INDEPENDENT CONTRACTS & BOLD COLLABORATIONS.
              </p>
            </motion.div>
          </div>

          <div className="flex-1 space-y-4">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ transform: 'translateX(100%)', opacity: 0 }}
                  whileInView={{ transform: 'translateX(0%)', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: chiselEasing, delay: 0.1 * index }}
                  className="block group"
                >
                  <div className="chisel-block p-8 flex items-center justify-between group-hover:bg-accent group-hover:text-ink transition-colors duration-100">
                    <div>
                      <h3 className="text-4xl font-heading leading-none mb-2">{link.name}</h3>
                      <p className="font-bold opacity-60 group-hover:opacity-100 transition-opacity">{link.value}</p>
                    </div>
                    <Icon className="w-12 h-12 opacity-20 group-hover:opacity-100 transition-opacity" />
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

