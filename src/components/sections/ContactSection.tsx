import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, Code2, FileText, Send, MessageSquare } from 'lucide-react';

interface ContactLink {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
  color: string;
}

const ContactSection = () => {
  const contacts: ContactLink[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'vipulpatil2500@gmail.com',
      href: 'mailto:vipulpatil2500@gmail.com',
      color: 'text-red-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/vipulpatil',
      href: 'https://linkedin.com/in/vipul-space',
      color: 'text-blue-500',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '/vipulpatil',
      href: 'https://github.com/vipul-space23',
      color: 'text-foreground',
    },
    {
      icon: Code2,
      label: 'LeetCode',
      value: '/vipulpatil',
      href: 'https://leetcode.com/u/vipul002/',
      color: 'text-yellow-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mumbai, India',
      href: null,
      color: 'text-green-400',
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-mono text-primary text-sm mb-2 tracking-wider">{'// GET IN TOUCH'}</p>
              <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                Let's Build <span className="gradient-text">Something Great</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Whether you have an exciting project, a job opportunity, or just want to 
                chat about technology—I'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {contacts.map((contact, index) => (
              <ScrollReveal key={contact.label} delay={index * 50}>
                <div className="glass rounded-xl p-5 hover:border-primary/50 hover:box-glow transition-all duration-300 group h-full">
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                        <contact.icon className={`h-5 w-5 ${contact.color}`} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">
                          {contact.label}
                        </p>
                        <p className="font-mono text-sm group-hover:text-primary transition-colors truncate">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                        <contact.icon className={`h-5 w-5 ${contact.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">
                          {contact.label}
                        </p>
                        <p className="font-mono text-sm">{contact.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={300}>
            <div className="text-center">
              <div className="glass rounded-xl p-8 inline-block">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="font-mono text-lg font-bold">Ready to collaborate?</h3>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="glow" size="lg" asChild>
                    <a href="mailto:vipulpatil2500@gmail.com">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/resume.pdf" download>
                      <FileText className="h-5 w-5 mr-2" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
