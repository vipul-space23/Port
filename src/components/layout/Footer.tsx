import { Github, Linkedin, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold gradient-text">VP_</span>
            <span className="text-muted-foreground text-sm">© 2026</span>
          </div>
          
          <p className="font-mono text-xs text-muted-foreground text-center">
            Built with <span className="text-primary">React</span> + <span className="text-primary">TypeScript</span> + <span className="text-primary">Tailwind</span>
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vipulspace23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/vipulspace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://leetcode.com/vipul002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Code2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
