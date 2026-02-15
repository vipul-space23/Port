import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'DebateArena',
    subtitle: 'AI-Powered Video Debate Platform',
    description: 'Built a real-time peer-to-peer video debate platform with live transcription and AI-based fact checking using WebRTC and Firebase.',
    tech: ['WebRTC', 'React.js', 'Firebase', 'Docker', 'AI/ML'],
    github: 'https://github.com/vipul-space23/DebateArena',
    image: '/projects/debatearena.png',
    highlights: [
      'Low-latency video streaming with WebRTC', 
      'Real-time speech recognition and AI analysis',
      'Dockerized deployment'
    ],
  },
  {
    title: 'LandRegistry',
    subtitle: 'Blockchain Property System',
    description: 'Decentralized land registration platform using NFTs on Ethereum to verify property ownership with IPFS for document storage.',
    tech: ['Blockchain', 'Ethereum', 'IPFS', 'MERN', 'MetaMask', 'Ganache'],
    github: 'https://github.com/vipul-space23/Final_land_Registry_System_using_Blockchain_INTEGRATED',
    image: '/projects/landregistry.png',
    highlights: [
      'NFT-based property ownership', 
      'IPFS hash verification',
      'MetaMask wallet integration'
    ],
  },
  {
    title: 'JobVoyage',
    subtitle: 'AI-Based Job Portal',
    description: 'Full-stack job portal with ML-powered job recommendations achieving 85% accuracy using Random Forest model.',
    tech: ['MERN Stack', 'Machine Learning', 'JWT', 'WebSockets'],
    github: 'https://github.com/vipul-space23/JobVoyage-AI-Based-Job-Portal',
    image: '/projects/jobvoyage.png',
    highlights: [
      'Random Forest ML model (85% accuracy)',
      'Real-time notifications',
      'Separate dashboards for recruiters & seekers'
    ],
  },
  {
    title: 'MedStore',
    subtitle: 'Pharmacy Management System',
    description: 'Desktop application for managing inventory, billing, and daily pharmacy operations with automated expiry alerts.',
    tech: ['Java', 'MySQL', 'Swing'],
    github: 'https://github.com/vipul-space23/Medical-Store-Management-System',
    image: '/projects/medstore.png',
    highlights: [
      'Expiry-date tracking with alerts',
      'Sales analytics & reporting',
      'Normalized database schema'
    ],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      
      {/* Stretched Link for Card Clickability */}
      {project.github && (
        <a 
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-0"
          aria-label={`View ${project.title} on GitHub`}
        />
      )}
      
      {/* Project Image */}
      {project.image && (
        <div className="relative h-48 bg-slate-100 dark:bg-neutral-800 overflow-hidden pointer-events-none">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{
              objectPosition: 
                project.title === 'DebateArena' ? 'center 1%' :
                project.title === 'JobVoyage' ? 'center 1%' :
                project.title === 'LandRegistry' ? 'center 40%' :
                project.title === 'MedStore' ? 'center 45%' :
                'center center'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 pointer-events-none">
        <h3 className="text-2xl font-bold font-mono mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {project.title}
        </h3>
        <p className="text-sm font-mono text-primary mb-4 uppercase tracking-wider">
          {project.subtitle}
        </p>
        <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span 
              key={t} 
              className="px-2 py-1 text-xs uppercase tracking-wider border border-slate-300 dark:border-white/20 rounded-full text-slate-500 dark:text-gray-400 bg-white/50 dark:bg-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10 relative z-10 pointer-events-auto">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-2 block">Work</span>
          <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
             <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl">
            A showcase of my work in full-stack development, blockchain, and AI/ML.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* More Projects Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <a 
            href="https://github.com/vipul-space23?tab=repositories" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-lg font-mono text-slate-600 dark:text-gray-400 hover:text-primary transition-colors group"
          >
            <span>Discover what else I’m building</span>
            <Github className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
