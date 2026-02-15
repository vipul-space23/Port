'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Github, Linkedin, Mail, ArrowDown, FileText 
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Typewriter = ({ text, speed = 50, delay = 1000 }: { text: string[], speed?: number, delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentString = text[currentIndex];
      
      if (isDeleting) {
        setCurrentText(currentString.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentString.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === currentString) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % text.length);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, text, speed, delay]);

  return <span>{currentText}<span className="animate-pulse">|</span></span>;
};

import HeroImage from '@/components/ui/HeroImage';

// ... (keep Typewriter component as is)

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 relative overflow-hidden">


      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] pointer-events-none z-0 opacity-30" />
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { text: '{}', top: '20%', left: '10%', delay: 0 },
          { text: '</>', top: '60%', left: '85%', delay: 1.5 },
          { text: '01', top: '15%', left: '80%', delay: 3 },
          { text: '!=', top: '70%', left: '15%', delay: 2 },
          { text: '//', top: '40%', left: '5%', delay: 1 },
          { text: '[]', top: '85%', left: '60%', delay: 2.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              y: [-10, 10, -10], 
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              delay: item.delay,
              ease: "easeInOut" 
            }}
            style={{ top: item.top, left: item.left, position: 'absolute' }}
            className="font-mono text-4xl md:text-6xl font-bold text-primary/10 select-none z-0"
          >
            {item.text}
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div style={{ y, opacity }} className="flex flex-col">
          {/* Header / Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8 md:mb-12"
          >
            <div className="h-[1px] w-12 bg-current opacity-30" />
            <span className="font-mono text-sm tracking-widest uppercase opacity-60 h-6 block min-w-[200px]">
              <Typewriter 
                text={["Full Stack Developer", "AI/ML Specialist", "Aspiring DevOps"]} 
                speed={70}
                delay={2000} 
              />
            </span>
          </motion.div>

          {/* Main Title - Huge Typography with Staggered Animation */}
          <div className="flex flex-col relative z-20 text-foreground mb-8">
            <h1 className="text-huge font-bold leading-[0.85] tracking-tighter flex flex-col overflow-hidden">
              <span className="flex">
                {Array.from("VIPUL").map((letter, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 1, 
                      ease: [0.33, 1, 0.68, 1],
                      delay: index * 0.05 
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="flex">
                {Array.from("PATIL").map((letter, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 1, 
                      ease: [0.33, 1, 0.68, 1],
                      delay: (index + 5) * 0.05 
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
            
            <div 
              className="text-huge font-bold leading-[0.85] tracking-tighter text-outline transparent-fill opacity-50 absolute top-0 left-0 blur-sm select-none pointer-events-none flex flex-col"
              style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
            >
              <span className="flex">
               {Array.from("VIPUL").map((letter, index) => (
                <motion.span
                  key={`outline-line1-${index}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.33, 1, 0.68, 1],
                    delay: index * 0.05 + 0.1
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              </span>
              <span className="flex">
               {Array.from("PATIL").map((letter, index) => (
                <motion.span
                  key={`outline-line2-${index}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.33, 1, 0.68, 1],
                    delay: (index + 5) * 0.05 + 0.1
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              </span>
            </div>
          </div>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl leading-relaxed opacity-80 mb-8 max-w-lg"
          >
            <p>
              Structuring the chaos of the web. 
              I build scalable systems and 
              immersive digital experiences.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap gap-6 items-center"
          >
             <a href="https://github.com/vipul-space23" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <Github className="w-5 h-5" />
                <span className="relative overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">GitHub</span>
                    <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-primary">GitHub</span>
                </span>
             </a>
             <a href="https://linkedin.com/in/vipul-space" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <Linkedin className="w-5 h-5" />
                <span className="relative overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">LinkedIn</span>
                    <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-primary">LinkedIn</span>
                </span>
             </a>
             <a href="/assets/vipulpatil_resume.pdf" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <FileText className="w-5 h-5" />
                <span className="relative overflow-hidden">
                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Resume</span>
                    <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-primary">Resume</span>
                </span>
             </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Image */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1, delay: 0.4, ease: "backOut" }}
           className="flex justify-center w-full"
        >
          {/* 
            ADJUST YOUR IMAGE HERE:
            - imgX: Move image left/right (negative = left, positive = right)
            - imgY: Move image up/down (negative = up, positive = down)
            - imgScale: Zoom image (1 = normal, 1.2 = 20% zoom in)
          */}
          <HeroImage 
            className="w-full max-w-[500px]" 
            imgX={15} 
            imgY={-20}
            imgScale={1.0}
          />
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4 opacity-50"
      >
        <span className="font-mono text-xs uppercase tracking-widest"></span>
      </motion.div>
    </section>
  );
};

export default HeroSection;