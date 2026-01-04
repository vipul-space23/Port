import { ExternalLink, Github, Trophy, ArrowRight } from 'lucide-react';
import type { Project } from '@/components/sections/ProjectsSection';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="glass rounded-xl overflow-hidden hover:border-primary/50 hover:box-glow transition-all duration-300 group h-full flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4">
        {project.isHackathon && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            <span className="font-mono text-xs text-yellow-500 font-medium">
              {project.hackathonLabel}
            </span>
          </div>
        )}
        
        <h3 className="font-mono text-xl font-bold group-hover:text-primary transition-colors mb-1">
          {project.title}
        </h3>
        <p className="text-primary/80 text-sm font-medium">{project.subtitle}</p>
      </div>

      {/* Description */}
      <div className="px-6 pb-4 flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md font-mono text-xs text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="px-6 pb-6 pt-2 border-t border-border/50 mt-auto">
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <Github className="h-4 w-4" />
              <span className="font-mono text-xs group-hover/link:underline">Source Code</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="font-mono text-xs group-hover/link:underline">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
