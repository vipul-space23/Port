import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import StarOrbitBackground from '@/components/backgrounds/StarOrbitBackground';
import MazeGame from '@/components/MazeGame';
import AchievementsSection from '@/components/sections/AchievementsSection';

const Index = () => {
  const [zenMode, setZenMode] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zenMode) {
        setZenMode(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [zenMode]);

  if (zenMode) {
    return <MazeGame onExit={() => setZenMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarOrbitBackground />
      <Navbar onZenMode={() => setZenMode(true)} />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
