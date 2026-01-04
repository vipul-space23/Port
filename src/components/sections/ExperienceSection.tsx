'use client';

import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Rocket, Terminal, Search, Code2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">{'// CAREER PATH'}</p>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Professional <span className="gradient-text">Journey</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* --- "FUTURE LOADING" DASHBOARD --- */}
        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border border-white/10 rounded-t-xl border-b-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="font-mono text-xs text-gray-500">status_check.exe</div>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Terminal Body */}
            <div className="glass rounded-b-xl border border-white/10 p-8 md:p-12 relative overflow-hidden">
              
              {/* Animated Scan Line */}
              <motion.div 
                animate={{ top: ['0%', '100%'], opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-0 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                
                {/* Status Icon */}
                <div className="w-24 h-24 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center mb-8 relative group">
                  <div className="absolute inset-0 rounded-full border border-primary/40 opacity-0 group-hover:opacity-100 animate-ping duration-1000" />
                  <Rocket className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="font-mono text-2xl md:text-3xl font-bold mb-4">
                  System Status: <span className="text-green-400">Ready to Deploy</span>
                </h3>
                
                <p className="text-muted-foreground text-lg mb-10 max-w-lg leading-relaxed">
                  I am a final-year student equipped with a full-stack arsenal. 
                  Currently seeking an opportunity to initialize my professional career sequence.
                </p>

                {/* Stat Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                          <Code2 className="w-4 h-4 text-primary" />
                          <span className="text-xs font-mono text-gray-300">Technical Proficiency</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                          <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: "95%" }} 
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-primary" 
                          />
                      </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-green-400/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                          <Cpu className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-mono text-gray-300">Learning Capacity</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                          <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: "100%" }} 
                              transition={{ duration: 1, delay: 0.4 }}
                              className="h-full bg-green-400" 
                          />
                      </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <a
                    href="mailto:vipulpatil2500@gmail.com"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-mono text-sm font-bold hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
                  >
                    <Terminal className="h-4 w-4" />
                    Hire Me
                  </a>
                  
                  <a
                    href="/assets/resume-dev.pdf"  // ✅ FIXED PATH
                    download="Vipul_Patil_Resume.pdf" // ✅ FIXED FILENAME
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 bg-white/5 rounded-lg font-mono text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Search className="h-4 w-4" />
                    View Resume
                  </a>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExperienceSection;