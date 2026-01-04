'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onZenMode: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ onZenMode }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 1. SCROLL LISTENER & ACTIVE SECTION SPY
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple Scroll Spy logic
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the top third of viewport
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId);
    }
  };

  // --- ANIMATION VARIANTS ---
  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navContainerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'py-3 px-4 md:px-8 top-4' // Floating island style on scroll
          : 'py-6 px-4 md:px-0' 
      }`}
    >
      <div 
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'container max-w-5xl bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-full pl-6 pr-2 shadow-2xl shadow-primary/5' 
            : 'container bg-transparent'
        }`}
      >
        {/* LOGO */}
        <motion.a 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, '#home')}
          className="relative font-mono text-xl font-bold group flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-foreground group-hover:text-primary transition-colors">VP</span>
          <Sparkles className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
        </motion.a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            
            return (
              <motion.a
                key={link.href}
                variants={linkVariants}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative px-4 py-2 text-xs font-mono font-medium tracking-wide transition-colors ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {/* The "Floating Pill" Background */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </motion.a>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center pl-4">
            <Button 
                variant="zen" 
                size="sm" 
                onClick={onZenMode} 
                className="rounded-full gap-2 border border-white/5 bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all"
            >
                <Gamepad2 className="h-4 w-4" />
                <span className="text-xs font-mono">ZEN</span>
            </Button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-foreground hover:bg-white/10 rounded-full"
            >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden mx-4 mt-2"
          >
            <div className="bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`block px-4 py-3 rounded-xl font-mono text-sm transition-colors ${
                       activeSection === link.href.substring(1)
                       ? 'bg-primary/20 text-primary font-bold border border-primary/20' 
                       : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                >
                    <Button 
                        variant="zen" 
                        size="sm" 
                        onClick={() => { onZenMode(); setMobileOpen(false); }} 
                        className="w-full justify-center gap-2"
                    >
                        <Gamepad2 className="h-4 w-4" />
                        Enter Zen Mode
                    </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;