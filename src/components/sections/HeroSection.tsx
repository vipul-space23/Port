'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Github, Linkedin, Mail, ArrowDown, FileText 
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- THEME TOGGLE (Minimal) ---
const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 w-8 h-8 rounded-full border border-current opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center mix-blend-difference text-white"
    >
      <div className={`w-3 h-3 rounded-full bg-current ${theme === 'dark' ? 'opacity-0' : 'opacity-100'} transition-all`} />
    </button>
  );
};

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
      <ThemeToggle />

      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        {/* Header / Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8 md:mb-12"
        >
          <div className="h-[1px] w-12 bg-current opacity-30" />
          <span className="font-mono text-sm tracking-widest uppercase opacity-60">Full Stack Developer</span>
        </motion.div>

        {/* Main Title - Huge Typography */}
        <div className="flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-huge font-bold leading-[0.85] tracking-tighter"
          >
            VIPUL PATIL
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-huge font-bold leading-[0.85] tracking-tighter text-outline transparent-fill opacity-80"
            style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
          >
            PATIL
          </motion.h1>
        </div>

        {/* Description & CTA */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="md:col-span-6 text-lg md:text-xl leading-relaxed opacity-80"
          >
            <p>
              Structuring the chaos of the web. I build scalable systems and 
              immersive digital experiences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="md:col-span-6 flex flex-wrap gap-6 md:justify-end items-center"
          >
             {/* Simple Links */}
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
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4 opacity-50"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;