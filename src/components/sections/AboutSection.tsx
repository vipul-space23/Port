'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import {
  Code2,
  Cloud,
  Database,
  Wrench,
  Cpu,
} from 'lucide-react';

// --- Types ---
interface SkillItem {
  key: string;
  name: string; // Added name for the text label
}

interface SkillCardProps {
  icon: React.ElementType;
  title: string;
  items: SkillItem[];
  delay: number;
}

// --- 3D Tilt Card Component ---
const TiltCard = ({ icon: Icon, title, items, delay }: SkillCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg']);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    // Normalize values between -0.5 and 0.5
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full perspective-1000"
      >
        <div className="glass rounded-xl p-6 h-full border border-white/5 bg-gray-900/40 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 group/card relative overflow-hidden">
          
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

          {/* Card Header */}
          <div className="relative z-10 flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-mono text-lg font-bold text-gray-200 group-hover/card:text-white transition-colors">
              {title}
            </h3>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-3 gap-y-6 gap-x-2 relative z-10">
            {items.map((item, i) => (
              <div
                key={item.key}
                className="group/icon flex flex-col items-center justify-center gap-2"
              >
                {/* Icon Wrapper with Bounce */}
                <div className="relative flex items-center justify-center transition-transform duration-300 group-hover/icon:-translate-y-1">
                   {/* Glow behind icon */}
                   <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                   
                   <img
                    src={`https://skillicons.dev/icons?i=${item.key}`}
                    alt={item.name}
                    loading="lazy"
                    className="h-10 w-10 relative z-10 drop-shadow-lg transition-transform duration-300 group-hover/icon:scale-110"
                  />
                </div>

                {/* Text Label Reveal */}
                <span className="text-[10px] font-mono text-gray-400 font-medium tracking-wide uppercase opacity-0 -translate-y-2 transition-all duration-300 group-hover/icon:opacity-100 group-hover/icon:translate-y-0 text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

// --- Main Section ---
const AboutSection = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Languages',
      items: [
        { key: 'java', name: 'Java' },
        { key: 'python', name: 'Python' },
        { key: 'js', name: 'JavaScript' },
        { key: 'html', name: 'HTML5' },
        { key: 'css', name: 'CSS3' },
      ],
    },
    {
      icon: Wrench,
      title: 'Frameworks',
      items: [
        { key: 'react', name: 'React' },
        { key: 'nextjs', name: 'Next.js' },
        { key: 'nodejs', name: 'Node.js' },
        { key: 'express', name: 'Express' },
        { key: 'flask', name: 'Flask' },
      ],
    },
    {
      icon: Database,
      title: 'Databases',
      items: [
        { key: 'mysql', name: 'MySQL' },
        { key: 'mongodb', name: 'MongoDB' },
        { key: 'firebase', name: 'Firebase' },
        { key: 'supabase', name: 'Supabase' },
      ],
    },
    {
      icon: Cloud,
      title: 'DevOps & Tools',
      items: [
        { key: 'aws', name: 'AWS' },
        { key: 'docker', name: 'Docker' },
        { key: 'git', name: 'Git' },
        { key: 'jenkins', name: 'Jenkins' },
        { key: 'kubernetes', name: 'Kubernetes' },
        { key: 'linux', name: 'Linux' },
        { key: 'grafana', name: 'Grafana' },
        { key: 'prometheus', name: 'Prometheus' },  
        { key: 'terraform', name: 'Terraform' },
      ],
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">

        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">
              {'// ABOUT ME'}
            </p>

            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Driven by <span className="gradient-text">Curiosity</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              I'm a final year Information Technology student at Datta Meghe College of Engineering, Mumbai,
              with a strong foundation in <span className="text-primary font-medium">full-stack development</span> and
              <span className="text-primary font-medium"> cloud technologies</span>. I enjoy solving real problems and
              building things that people actually use.
            </p>
          </div>
        </ScrollReveal>

        {/* 3D Tilt Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 perspective-1000">
          {skills.map((skill, index) => (
            <TiltCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              items={skill.items}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Education Section */}
        <ScrollReveal delay={400}>
          <div className="glass rounded-xl p-8 border border-white/5 hover:border-primary/30 transition-colors duration-500 relative overflow-hidden group">
            {/* Hover Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
            
            <h3 className="font-mono text-xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="h-6 w-6 text-primary animate-pulse" />
              Education
            </h3>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
              <div>
                <p className="font-bold text-lg text-white">
                  Bachelor of Engineering in Information Technology
                </p>
                <p className="text-gray-400 mt-1">
                  Datta Meghe College of Engineering, Airoli
                </p>
              </div>

              <div className="text-left md:text-right mt-4 md:mt-0">
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-1">
                    <p className="font-mono text-primary text-sm font-bold">
                    CGPA: 7.89
                    </p>
                </div>
                <p className="text-gray-500 font-mono text-sm block">
                  2022 - 2026
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default AboutSection;