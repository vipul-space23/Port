'use client';

import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Send, Coffee, ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-mono text-gray-300">Available for Opportunities</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-mono font-bold mb-8 tracking-tight">
              Let's Work <br />
              <span className="gradient-text">Together</span>
            </h2>

            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or looking for a developer who actually understands 
              <span className="text-primary"> business needs</span>? I'm just one email away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button variant="glow" size="lg" className="h-14 px-10 text-lg rounded-full" asChild>
                <a href="mailto:vipulpatil2500@gmail.com">
                  Say Hello <Send className="ml-2 w-5 h-5" />
                </a>
              </Button>
              
              <a 
                href="https://linkedin.com/in/vipul-space"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono"
              >
                <Coffee className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                <span>Let's chat on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;