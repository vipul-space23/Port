'use client';

import { motion } from 'framer-motion';
import { 
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaLinux 
} from 'react-icons/fa';
import { 
  SiJavascript, SiGnubash, SiExpress, SiFlask, SiFastapi, SiMysql, SiMongodb, SiKubernetes 
} from 'react-icons/si';
import { GraduationCap } from 'lucide-react';

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Java", icon: FaJava },
      { name: "Python", icon: FaPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Shell Scripting", icon: SiGnubash }
    ]
  },
  {
    category: "Frameworks & Libs",
    items: [
      { name: "React.js", icon: FaReact },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "Flask", icon: SiFlask },
      { name: "FastAPI", icon: SiFastapi }
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb }
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: FaDocker },
      { name: "GitHub", icon: FaGithub },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Linux", icon: FaLinux }
    ]
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

            {/* Education Block - Professional Redesign */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="mt-12 p-8 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-colors"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <GraduationCap className="w-24 h-24" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-primary mb-1 block">Education</span>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Bachelor of Engineering in <br /> Information Technology
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 dark:text-gray-400 mb-6 pl-16">
                    Datta Meghe College of Engineering, Airoli
                  </p>

                  <div className="flex flex-wrap gap-4 pl-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-600 dark:text-gray-300" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <span>2022 - 2026</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-sm font-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <span>CGPA: 7.89</span>
                    </div>
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
                        key={item.name} 
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 text-sm rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-default group"
                      >
                        <item.icon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                        {item.name}
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
