import { ScrollReveal } from '@/hooks/useScrollReveal';
import CertificationCard from '@/components/cards/CertificationCard';
import { Award, Medal, Users, Trophy, Zap } from 'lucide-react';

export interface Certification {
  icon: React.ElementType;
  title: string;
  description: string;
  type: string;
  date?: string;
  link?: string;
  color: string;
}

const CertificationsSection = () => {
  const certifications: Certification[] = [
    {
      icon: Trophy,
      title: 'Hackhive 2025 Runner-up',
      description: 'Engineered an AI Research Assistant leveraging RAG architecture with Supabase pgvector embeddings, enabling context-aware analysis of research papers with voice-based semantic search.',
      type: 'Hackathon',
      date: 'January 2025',
      color: 'text-yellow-500',
    },
    {
      icon: Award,
      title: 'Video Editing Champion',
      description: 'Secured first place in college video editing competitions twice, demonstrating creative storytelling abilities and technical proficiency in visual media production.',
      type: 'Competition',
      date: '2023 & 2024',
      color: 'text-purple-500',
    },
    {
      icon: Users,
      title: 'Tech GITS Committee',
      description: 'Active contributor to the college technical committee, organizing workshops and events focused on emerging technologies and fostering peer learning.',
      type: 'Leadership',
      date: '2023 - Present',
      color: 'text-blue-500',
    },
  ];

  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">{'// ACHIEVEMENTS'}</p>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Recognition & <span className="gradient-text">Milestones</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Highlights from my journey—competitions won, communities built, 
              and experiences that shaped my perspective as a developer.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.title} delay={index * 100}>
              <CertificationCard certification={cert} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
