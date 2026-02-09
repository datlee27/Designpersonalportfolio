import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Github, Facebook, Phone } from 'lucide-react';

const contactLinks = [
  {
    name: "Email",
    value: "lvd27012004@gmail.com",
    href: "mailto:lvd27012004@gmail.com",
    icon: Mail
  },
  {
    name: "GitHub",
    value: "github.com/datlee27",
    href: "https://github.com/datlee27",
    icon: Github
  },
  {
    name: "Facebook",
    value: "facebook.com/le.van.at.760768",
    href: "https://www.facebook.com/le.van.at.760768",
    icon: Facebook
  },
  {
    name: "Phone",
    value: "0766554586",
    href: "tel:0766554586",
    icon: Phone
  }
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="min-h-screen bg-black text-white py-32 flex items-center font-sans">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', letterSpacing: '-0.02em' }}
          >
            LET'S WORK
            <br />
            TOGETHER
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-16 max-w-2xl"
          >
            I'm always interested in hearing about new projects and opportunities.
            Whether you have a question or just want to say hello, feel free to reach out.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * index + 0.4 }}
                  className="border border-gray-800 p-8 hover:border-[#FF5722] hover:bg-[#FF5722]/10 transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-8 h-8 mb-4 text-white group-hover:text-[#FF5722] group-hover:scale-110 transition-all duration-300" />
                  <h3 className="text-xl mb-2 font-bold">{link.name}</h3>
                  <p className="text-gray-400 group-hover:text-white transition-colors">
                    {link.value}
                  </p>
                </motion.a>
              );
            })}
          </div>


        </motion.div>
      </div>
    </section>
  );
}
