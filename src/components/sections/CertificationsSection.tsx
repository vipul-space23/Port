'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Users } from 'lucide-react';

const certifications = [
  {
    icon: Trophy,
    title: 'Hackhive 2025 Runner-up',
    description: 'Built an AI Research Assistant for fast understanding of research papers using RAG with Supabase pgvector embeddings. Enabled semantic search across papers with voice-based queries using Python Flask.',
    type: 'Hackathon',
    date: 'March 2025',
    link: 'https://github.com/vipul-space23/AI-Research-Assistant-A-RAG-Based-Approach',
  },
  {
    icon: Award,
    title: 'Video Editing Champion',
    description: 'Secured first place in college video editing competitions twice, demonstrating creative storytelling and technical editing skills.',
    type: 'Competition',
    date: '2023 & 2024',
  },
  {
    icon: Users,
    title: 'Tech GITS Committee',
    description: 'Active member of the college technical committee, organizing workshops on emerging technologies and fostering peer learning.',
    type: 'Leadership',
    date: '2024 - Present',
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-32 bg-slate-50 dark:bg-black/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Header */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <span className="font-mono text-sm tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-2 block">Impact</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Beyond the <br /> <span className="text-primary italic">Console</span>.
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-md">
              Recognition for innovation, creativity, and community leadership.
            </p>
          </motion.div>

          {/* List */}
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-b border-slate-200 dark:border-white/10 pb-8 last:border-0"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>{cert.title}</h3>
                  <span className="font-mono text-xs text-slate-400 dark:text-gray-500">{cert.date}</span>
                </div>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm mb-3">
                  {cert.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-xs font-medium text-slate-500 dark:text-gray-400">
                    <cert.icon className="w-3 h-3" />
                    {cert.type}
                  </div>
                  {cert.link && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
