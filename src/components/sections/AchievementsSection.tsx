'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const achievements = [
  {
    title: 'AWS Academy Graduate',
    subtitle: 'Machine Learning Foundations',
    issuer: 'AWS Academy',
    date: 'Oct 2025',
    image: '/assets/aws-ml-foundations.png', 
  },
  {
    title: 'Networking Basics',
    subtitle: 'Getting Started with Networking',
    issuer: 'AWS Educate',
    date: '2025',
    image: '/assets/aws-networking.png',
  },
  {
    title: 'Hacakthon 3.0-Gits-Certificate',
    subtitle: 'Certificate of Completion',
    issuer: 'GITS DMCE',
    date: '2025',
    image: '/assets/image copy 3.png',
  },
  {
    title: 'Hackhive RunnerUp Certificate',
    subtitle: 'Certificate of Runner-up',
    issuer: 'Hackhive ',
    date: '2025',
    image: '/assets/image copy 4.png',
  },
  // Additional certifications (hidden by default)
  {
    title: 'MumbaiHacks Participation',
    subtitle: 'GWR Certificate',
    issuer: 'Guinness World Records as Largest GEN AI Hackathon',
    date: '2025',
    image: '/assets/MumbaiHacks Participation GWR Certificate Sample.png',
  },
  {
    title: 'Blockops-Kjsomaiya',
    subtitle: 'Hackathon Participation Certificate',
    issuer: 'Kjsomaiya',
    date: '2025',
    image: '/assets/image.png',
  },
  {
    title: 'ScrollHacks Certificate',
    subtitle: 'Certificate of Participation (top 20 selected)',
    issuer: 'ScrollHacks',
    date: '2025',
    image: '/assets/image copy 5.png',
  },
  {
    title: 'unstop-adobe-hackathon',
    subtitle: 'Certificate of Participation',
    issuer: 'unstop-adobe',
    date: '2024',
    image: '/assets/image copy 6.png',
  },
  {
    title: 'Career Skills in Software Development',
    subtitle: 'Certificate of Completion',
    issuer: 'Microsoft & LinkedIn',
    date: '2024',
    image: '/assets/image copy.png',
  },
  {
    title: 'Deloitte Technology Job Simulation',
    subtitle: 'Certificate of Completion',
    issuer: 'Deloitte',
    date: '2025',
    image: '/assets/image copy 2.png',
  },
   {
    title: 'Java Basic Certificate',
    subtitle: 'Programming Fundamentals',
    issuer: 'HackerRank',
    date: '2025',
    image: '/assets/java-basic-certificate.jpg',
  }
];

const AchievementsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleAchievements = showAll ? achievements : achievements.slice(0, 2);

  return (
    <section id="achievements" className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-2 block">Certifications</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-none tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="text-primary">Professional Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleAchievements.map((item, index) => (
              <motion.div 
                key={item.image} // Use image path as key for better stability if titles are duplicate
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative flex items-center gap-6 p-6 border border-slate-200 dark:border-white/10 rounded-xl hover:border-primary/50 transition-colors bg-white dark:bg-black"
              >
                {/* Certification Image */}
                <div className="h-24 w-24 shrink-0 bg-white dark:bg-neutral-900 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                  ) : (
                    <Award className="w-8 h-8 text-primary" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mb-1">{item.subtitle}</p>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 dark:text-gray-500">
                    <span>{item.issuer}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {achievements.length > 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="group gap-2 px-6 py-5 border-2 border-slate-300 dark:border-white/20 hover:border-primary hover:text-primary transition-all"
            >
              <span className="font-medium">
                {showAll ? 'Show Less' : `View More Certifications (${achievements.length - 2})`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 group-hover:translate-y-(-1) transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              )}
            </Button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default AchievementsSection;