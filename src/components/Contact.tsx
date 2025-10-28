import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const contactLinks = [
  {
    name: "Email",
    value: "hello@developer.com",
    href: "mailto:hello@developer.com",
    icon: Mail
  },
  {
    name: "GitHub",
    value: "github.com/developer",
    href: "https://github.com",
    icon: Github
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/developer",
    href: "https://linkedin.com",
    icon: Linkedin
  },
  {
    name: "Twitter",
    value: "@developer",
    href: "https://twitter.com",
    icon: Twitter
  }
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="min-h-screen bg-black text-white py-32 flex items-center">
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
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800' }}
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
                  className="border border-gray-800 p-8 hover:border-white hover:bg-white hover:text-black transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl mb-2">{link.name}</h3>
                  <p className="text-gray-400 group-hover:text-gray-700 transition-colors">
                    {link.value}
                  </p>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-16 border-t border-gray-800 text-center text-gray-500"
          >
            <p>© 2025 Portfolio. Designed & Built with passion.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
