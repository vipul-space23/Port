'use client';

import { ScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Calendar, CheckCircle2, Trophy, Award } from 'lucide-react';

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  skills: string[];
  image?: string; // Added image property
}

const AchievementsSection = () => {
  const achievements: Achievement[] = [
    {
      title: 'AWS Academy Graduate - Machine Learning Foundations',
      issuer: 'AWS Academy',
      date: 'Oct 2025', // Based on "06/10/2025" in your PDF [cite: 365]
      image: '/assets/aws-ml-foundations.png', // matches the renamed file
      skills: ['Machine Learning', 'AWS Cloud', 'Model Training', 'AI Concepts'],
    },
    {
      title: 'Getting Started with Networking',
      issuer: 'AWS Educate',
      date: '2025',
      // No direct link in snippet, but usually these have one. 
      // You can add it if you have the Credly link for this too.
      image: '/assets/aws-networking.png', // matches the renamed file
      skills: ['VPC', 'Subnets', 'Security Groups', 'EC2 Networking'], // [cite: 11, 12, 13]
    },
  ];

  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">{'// RECOGNITION'}</p>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Certifications & <span className="gradient-text">Badges</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Validating my expertise through industry-recognized certifications.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Award className="w-32 h-32" />
                </div>

                <div className="relative z-10 flex items-start gap-5">
                  {/* Badge Image Logic */}
                  <div className="flex-shrink-0 p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/20 transition-colors">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <Trophy className="w-16 h-16 text-yellow-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold font-mono group-hover:text-primary transition-colors leading-tight mb-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground font-medium text-sm">{item.issuer}</p>
                      </div>
                      
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors flex-shrink-0 ml-2"
                          title="Verify Credential"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.date}
                      </span>
                      {item.credentialId && (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> ID: {item.credentialId}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 text-[10px] rounded border border-white/10 bg-white/5 text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;