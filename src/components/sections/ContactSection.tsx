'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-white dark:bg-black relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 text-center">
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <h2 className="text-huge font-bold leading-none tracking-tighter mb-8">
            LET'S <br /> TALK
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have an idea? A project? Or just want to say hi?
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <a 
            href="mailto:vipulpatil2500@gmail.com" 
            className="inline-flex items-center gap-4 text-3xl md:text-5xl font-bold hover:text-primary transition-colors border-b-2 border-current pb-2 group"
          >
            vipulpatil2500@gmail.com
            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2" />
          </a>
        </motion.div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-4xl mx-auto justify-items-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="flex flex-col gap-2"
             >
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Socials</span>
                <a href="https://linkedin.com/in/vipul-space" className="text-lg hover:text-primary transition-colors">LinkedIn</a>
                <a href="https://github.com/vipul-space23" className="text-lg hover:text-primary transition-colors">GitHub</a>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="flex flex-col gap-2"
             >
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Location</span>
                <p className="text-lg">Mumbai, India</p>
             </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
