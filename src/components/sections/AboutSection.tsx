'use client';

import { motion } from 'framer-motion';
import { Code2, Cloud, Database, Wrench } from 'lucide-react';

const skills = [
  {
    category: "Languages",
    items: ["Java", "Python", "JavaScript", "HTML5", "CSS3", "Shell Scripting"]
  },
  {
    category: "Frameworks & Libs",
    items: ["React.js", "FastAPI", "Node.js", "Express", "Flask", "FastAPI"]
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB"]
  },
  {
    category: "DevOps & Tools",
    items: ["AWS", "Docker", "Git", "GitHub", "Kubernetes", "Linux", "Terraform"]
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative bg-white dark:bg-black">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid md:grid-cols-12 gap-16 items-start">
          
          {/* Left: Bio */}
          <div className="md:col-span-12 lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Driven by curiosity. <br />
              Fuelled by <span className="text-primary italic">code</span>.
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed space-y-6"
            >
              <p>
                I'm a final-year IT student at Datta Meghe College of Engineering, Mumbai. 
                My journey isn't just about learning syntax; it's about solving real-world puzzles.
              </p>
              <p>
                From building decentralized applications to crafting video debate platforms, 
                I treat every project as an opportunity to push the boundaries of what's possible 
                on the web. I specialize in <strong className="text-foreground">Full-Stack Development</strong> and <strong className="text-foreground">Cloud Architecture</strong>.
              </p>
            </motion.div>

            {/* Education Block - Card Style */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="mt-12 p-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/20 rounded-lg"
            >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary mb-2 block">Education</span>
                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Bachelor of Engineering in Information Technology</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">Datta Meghe College of Engineering, Airoli</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                  <span className="text-sm text-slate-500 dark:text-gray-400">2022 - 2026</span>
                  <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <span className="font-mono text-sm font-bold text-primary">CGPA: 7.89</span>
                  </div>
                </div>
            </motion.div>
          </div>

          {/* Right: Skills Grid */}
          <div className="md:col-span-12 lg:col-span-5">
            <div className="grid gap-8">
              {skills.map((group, idx) => (
                <motion.div 
                  key={group.category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="font-mono text-sm uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-4 border-b border-slate-200 dark:border-white/10 pb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 text-sm rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
