import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Briefcase, Calendar, MapPin, Rocket, ArrowRight } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'full-time' | 'internship' | 'freelance';
}

const ExperienceSection = () => {
  const experiences: Experience[] = [];

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">{'// EXPERIENCE'}</p>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Professional <span className="gradient-text">Journey</span>
            </h2>
          </div>
        </ScrollReveal>

        {experiences.length > 0 ? (
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="glass rounded-xl p-6 hover:border-primary/50 hover:box-glow transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/10 rounded-full font-mono text-xs text-primary uppercase tracking-wider mb-2">
                        {exp.type}
                      </span>
                      <h3 className="font-mono text-xl font-bold">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal delay={100}>
            <div className="glass rounded-xl p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-mono text-2xl font-bold mb-4">
                Ready for Takeoff
              </h3>
              <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto leading-relaxed">
                As a final year student, I'm actively seeking internship and full-time 
                opportunities where I can contribute, learn, and grow as a software engineer.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
                >
                  <Briefcase className="h-4 w-4" />
                  Let's Work Together
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 rounded-lg font-mono text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
