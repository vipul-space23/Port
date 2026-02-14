'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/vipul-space23',
      label: 'GitHub',
      color: 'hover:text-slate-900 dark:hover:text-white'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/vipul-space',
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    { 
      icon: Mail, 
      href: 'mailto:your.email@example.com',
      label: 'Email',
      color: 'hover:text-green-600 dark:hover:text-green-400'
    },
  ];

  return (
    <footer className="relative z-10 border-t border-slate-300 dark:border-gray-800 bg-slate-100 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-mono text-xl font-bold gradient-text">VP</h3>
            <p className="text-slate-700 dark:text-gray-400 text-sm leading-relaxed">
              Building scalable systems and securing the digital world, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono font-semibold text-slate-900 dark:text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-700 dark:text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-mono font-semibold text-slate-900 dark:text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-700 dark:text-gray-400 ${color} transition-all border border-slate-300 dark:border-gray-700 hover:border-primary`}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-300 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-700 dark:text-gray-400 text-sm flex items-center gap-1">
            © {currentYear} Made with 
              AntiGravity by Google
          </p>
          <p className="text-slate-600 dark:text-gray-500 text-xs font-mono">
            Designed & Built by Vipul Patil
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;