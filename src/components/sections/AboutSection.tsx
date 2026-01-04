import { ScrollReveal } from '@/hooks/useScrollReveal';
import {
  Code2,
  Cloud,
  Database,
  Wrench,
  GitBranch,
  Cpu,
} from 'lucide-react';

interface SkillItem {
  key: string;
}

interface SkillCardProps {
  icon: React.ElementType;
  title: string;
  items: SkillItem[];
  delay: number;
}

const SkillCard = ({ icon: Icon, title, items, delay }: SkillCardProps) => (
  <ScrollReveal delay={delay}>
    <div className="glass rounded-xl p-6 hover:border-primary/50 hover:box-glow transition-all duration-300 h-full">
      <Icon className="h-8 w-8 text-primary mb-4" />
      <h3 className="font-mono text-lg font-bold mb-6">{title}</h3>

      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-center group"
          >
            <img
              src={`https://skillicons.dev/icons?i=${item.key}`}
              alt={item.key}
              loading="lazy"
              className="h-10 w-10 transition-all duration-300 
                         group-hover:scale-110 group-hover:-rotate-3"
            />
          </div>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

const AboutSection = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Languages',
      items: [
        { key: 'java' },
        { key: 'python' },
        { key: 'javascript' },
        { key: 'typescript' },
        { key: 'html' },
        { key: 'css' },
      ],
    },
    {
      icon: Wrench,
      title: 'Frameworks',
      items: [
        { key: 'react' },
        { key: 'nodejs' },
        { key: 'express' },
        { key: 'flask' },
      ],
    },
    {
      icon: Database,
      title: 'Databases',
      items: [
        { key: 'mysql' },
        { key: 'mongodb' },
        { key: 'firebase' },
        { key: 'supabase' },
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      items: [
        { key: 'aws' },
        { key: 'docker' },
        { key: 'jenkins' },
        { key: 'git' },
      ],
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">

        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">
              {'// ABOUT ME'}
            </p>

            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Driven by <span className="gradient-text">Curiosity</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              I'm a final year Information Technology student at Datta Meghe College of Engineering, Mumbai,
              with a strong foundation in <span className="text-primary">full-stack development</span> and
              <span className="text-primary"> cloud technologies</span>. I enjoy solving real problems and
              building things that people actually use.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              items={skill.items}
              delay={index * 100}
            />
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="glass rounded-xl p-8">
            <h3 className="font-mono text-xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="h-6 w-6 text-primary" />
              Education
            </h3>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold text-lg">
                  Bachelor of Engineering in Information Technology
                </p>
                <p className="text-muted-foreground">
                  Datta Meghe College of Engineering, Airoli
                </p>
              </div>

              <div className="text-left md:text-right mt-4 md:mt-0">
                <p className="font-mono text-primary text-lg font-bold">
                  CGPA: 7.89
                </p>
                <p className="text-muted-foreground font-mono text-sm">
                  2022 - 2026
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default AboutSection;
