import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ChevronDown, FileText, Code2, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4">
      <div className="text-center z-10 animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <p className="font-mono text-primary text-sm tracking-wider">
            ASPIRING SOFTWARE ENGINEER
          </p>
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold mb-6">
          <span className="text-foreground">Vipul</span>
          <span className="gradient-text text-glow"> Patil</span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Final year Computer Science student passionate about crafting 
          <span className="text-primary font-medium"> scalable applications</span> and 
          <span className="text-primary font-medium"> cloud-native solutions</span>.
        </p>

        <p className="text-muted-foreground/70 text-sm md:text-base mb-8 font-mono">
          Transforming ideas into elegant, production-ready code.
        </p>

        {/* Quick Links Dashboard */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="https://leetcode.com/vipul00_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-full hover:border-primary/50 hover:box-glow transition-all group"
          >
            <Code2 className="h-4 w-4 text-yellow-500" />
            <span className="font-mono text-sm group-hover:text-primary transition-colors">LeetCode</span>
          </a>
          
          <a
            href="https://github.com/vipul-space23"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-full hover:border-primary/50 hover:box-glow transition-all group"
          >
            <Github className="h-4 w-4 text-foreground" />
            <span className="font-mono text-sm group-hover:text-primary transition-colors">GitHub</span>
          </a>
          
          <a
            href="https://linkedin.com/in/vipul-space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-full hover:border-primary/50 hover:box-glow transition-all group"
          >
            <Linkedin className="h-4 w-4 text-blue-500" />
            <span className="font-mono text-sm group-hover:text-primary transition-colors">LinkedIn</span>
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-full hover:border-primary/50 hover:box-glow transition-all group"
          >
            <FileText className="h-4 w-4 text-green-500" />
            <span className="font-mono text-sm group-hover:text-primary transition-colors">Resume</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button variant="glow" size="lg" asChild>
            <a href="#projects">Explore My Work</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Let's Connect
            </a>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 text-muted-foreground hover:text-primary transition-colors animate-float"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
};

export default HeroSection;
