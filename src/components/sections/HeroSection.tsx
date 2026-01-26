'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Github, Linkedin, Mail, ChevronDown, FileText, Code2, 
  Terminal, Cpu, Cloud, Server, Database, GitBranch, Container, Workflow 
} from 'lucide-react';
import { motion, useMotionValue } from 'framer-motion';

// --- 1. DECRYPT TEXT EFFECT (The "Typo" Animation) ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const DecryptText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          }).join("")
        );

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };

    startScramble();
    return () => clearInterval(interval);
  }, [text, isHovered]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

// --- 2. MAGNETIC BUTTON COMPONENT ---
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.15);
    position.y.set(middleY * 0.15);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// --- 3. BACKGROUND GRID ---
const RetroGrid = () => {
  const floatingIcons = [
    { Icon: Terminal, className: "top-1/4 left-[15%]", size: "w-24 h-24", duration: 5, animate: { y: [0, -20, 0], rotate: [0, 5, 0] } },
    { Icon: Cpu, className: "bottom-1/3 right-[20%]", size: "w-32 h-32", duration: 7, animate: { y: [0, 30, 0], rotate: [0, -10, 0] } },
    { Icon: Cloud, className: "top-[15%] right-[25%]", size: "w-20 h-20", duration: 8, animate: { x: [0, 20, 0], y: [0, -10, 0] } },
    { Icon: Server, className: "bottom-[20%] left-[10%]", size: "w-28 h-28", duration: 9, animate: { y: [0, -25, 0] } },
    { Icon: GitBranch, className: "top-[40%] left-[5%]", size: "w-16 h-16", duration: 6, animate: { rotate: [0, 15, 0], x: [0, 10, 0] } },
    { Icon: Database, className: "bottom-[40%] right-[5%]", size: "w-24 h-24", duration: 10, animate: { y: [0, 20, 0], rotate: [0, -5, 0] } },
    { Icon: Container, className: "top-[10%] left-[40%]", size: "w-14 h-14", duration: 11, animate: { y: [0, 15, 0] } },
    { Icon: Workflow, className: "bottom-[10%] right-[40%]", size: "w-18 h-18", duration: 12, animate: { x: [0, -15, 0], rotate: [0, 10, 0] } },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {floatingIcons.map(({ Icon, className, size, duration, animate }, index) => (
        <motion.div 
          key={index}
          animate={animate}
          transition={{ duration: duration, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute opacity-5 text-primary ${className} ${size} blur-[1px]`}
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
};

// --- MAIN HERO SECTION ---
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      
      {/* Animated Background */}
      <RetroGrid />
      
      {/* Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      {/* Main Content */}
      <div className="text-center z-10 w-full max-w-5xl relative">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-gray-400">Open to Work</span>
        </motion.div>
        
        {/* --- NAME WITH DECRYPT EFFECT --- */}
        <div className="mb-6 relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tight">
            <span className="text-foreground mr-4">I'm</span>
            <span className="gradient-text text-glow cursor-pointer">
              <DecryptText text="Vipul Patil" />
            </span>
          </h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Final year Computer Science student. I build
          <span className="text-primary font-medium bg-primary/10 px-1 mx-1 rounded">scalable systems</span>
          and break things to make them
          <span className="text-primary font-medium bg-primary/10 px-1 mx-1 rounded">secure</span>.
        </motion.p>

        {/* --- MAGNETIC BUTTONS GRID --- */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          
  
          
          <MagneticWrapper>
            <a
              href="https://github.com/vipul-space23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/50 transition-all group backdrop-blur-sm"
            >
              <Github className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="font-mono text-sm text-gray-300 group-hover:text-white">GitHub</span>
            </a>
          </MagneticWrapper>
          
          <MagneticWrapper>
            <a
              href="https://linkedin.com/in/vipul-space"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-white/10 rounded-full hover:bg-blue-500/10 hover:border-blue-500/50 transition-all group backdrop-blur-sm"
            >
              <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              <span className="font-mono text-sm text-gray-300 group-hover:text-blue-400">LinkedIn</span>
            </a>
          </MagneticWrapper>
          
          {/* ✅ FIXED RESUME LINK */}
          <MagneticWrapper>
            <a
              href="/assets/resume-dev.pdf" 
              download="Vipul_Patil_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-white/10 rounded-full hover:bg-green-500/10 hover:border-green-500/50 transition-all group backdrop-blur-sm"
            >
              <FileText className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" />
              <span className="font-mono text-sm text-gray-300 group-hover:text-green-400">Resume</span>
            </a>
          </MagneticWrapper>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="glow" size="lg" className="h-12 px-8 text-base" asChild>
            <a href="#projects">Explore My Work</a>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 hover:bg-white/5" asChild>
            <a href="#contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Let's Connect
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        href="#about"
        className="absolute bottom-10 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown className="h-8 w-8 opacity-50" />
      </motion.a>
    </section>
  );
};

export default HeroSection;