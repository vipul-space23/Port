import { ScrollReveal } from '@/hooks/useScrollReveal';
import ProjectCard from '@/components/cards/ProjectCard';

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  isHackathon?: boolean;
  hackathonLabel?: string;
  highlights: string[];
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: 'DebateArena',
      subtitle: 'AI-Powered Real-Time Video Debate Platform',
      description: 'A cutting-edge peer-to-peer video debate platform featuring live transcription and AI-powered fact-checking. Built for seamless real-time communication with intelligent speech analysis.',
      tech: ['WebRTC', 'React.js', 'Firebase', 'Docker', 'AI/ML'],
      github: 'https://github.com/vipul-space23/debatearena',
      highlights: [
        'Real-time speech analysis with accuracy metrics',
        'Sub-100ms latency video streaming via WebRTC',
      ],
    },
    {
      title: 'Decentralized Land Registry',
      subtitle: 'Blockchain-Powered Property Verification',
      description: 'A secure, transparent land registration system leveraging blockchain technology for immutable ownership records. Utilizes NFTs for unique property identification and IPFS for decentralized storage.',
      tech: ['Ethereum', 'IPFS', 'MERN Stack', 'MetaMask', 'Solidity'],
      github: 'https://github.com/vipul-space23/Final_land_Registry_System_using_Blockchain_INTEGRATED.git',
      highlights: [
        'Smart contract-based ownership transfers',
        'IPFS integration for document verification',
        'MetaMask wallet authentication',
      ],
    },
  {
  title: 'Quiz Recommendation System',
  subtitle: 'Personalized Learning with Machine Learning',
  description: 'Adaptive quiz platform that recommends questions based on user performance and learning patterns. Machine learning is used to adjust difficulty levels and enhance learning outcomes.',
  tech: ['Python', 'Streamlit', 'Scikit-learn', 'Docker'],
  github: 'https://github.com/vipul-space23/Quiz-Recommendation-System',
  highlights: [
    'Personalized quiz recommendations using machine learning',
    'Learner profiling with collaborative filtering',
    'Interactive analytics dashboard with real-time insights',
    'Docker-based containerized deployment for cross-platform use',
  ],
}
,
    {
      title: 'Medical Store Management',
      subtitle: 'Comprehensive Inventory System',
      description: 'A robust desktop application streamlining pharmacy operations with intelligent inventory tracking, automated expiry alerts, and detailed analytics dashboards.',
      tech: ['Java', 'MySQL', 'Swing', 'SMTP'],
      github: 'https://github.com/vipul-space23/Medical-Store-Management-System.git',
      highlights: [
        'Automated email alerts for expiring stock',
        'Sales analytics with export functionality',
        'Optimized database for fast queries',
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-primary text-sm mb-2 tracking-wider">{'// FEATURED WORK'}</p>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Projects That <span className="gradient-text">Define Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl">
              From hackathon victories to personal experiments—each project represents 
              a challenge conquered and skills sharpened. Here's a glimpse into my development journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 100}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
