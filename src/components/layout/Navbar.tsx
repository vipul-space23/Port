import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Menu, X } from 'lucide-react';

interface NavbarProps {
  onZenMode: () => void;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ onZenMode }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="font-mono text-xl font-bold gradient-text">
          VP_
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <Button variant="zen" size="sm" onClick={onZenMode} className="gap-2">
            <Gamepad2 className="h-4 w-4" />
            Zen
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-mono text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider py-3 border-b border-border/50 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="zen" size="sm" onClick={onZenMode} className="w-full mt-4 gap-2">
            <Gamepad2 className="h-4 w-4" />
            Zen Mode
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
