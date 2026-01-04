// import { ExternalLink, Github, Trophy, ArrowRight } from 'lucide-react';
// import type { Project } from '@/components/sections/ProjectsSection';

// interface ProjectCardProps {
//   project: Project;
// }

// const ProjectCard = ({ project }: ProjectCardProps) => {
//   return (
//     <div className="glass rounded-xl overflow-hidden hover:border-primary/50 hover:box-glow transition-all duration-300 group h-full flex flex-col">
//       {/* Header */}
//       <div className="p-6 pb-4">
//         {project.isHackathon && (
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
//             <Trophy className="h-3.5 w-3.5 text-yellow-500" />
//             <span className="font-mono text-xs text-yellow-500 font-medium">
//               {project.hackathonLabel}
//             </span>
//           </div>
//         )}
        
//         <h3 className="font-mono text-xl font-bold group-hover:text-primary transition-colors mb-1">
//           {project.title}
//         </h3>
//         <p className="text-primary/80 text-sm font-medium">{project.subtitle}</p>
//       </div>

//       {/* Description */}
//       <div className="px-6 pb-4 flex-1">
//         <p className="text-muted-foreground text-sm leading-relaxed mb-4">
//           {project.description}
//         </p>

//         {/* Highlights */}
//         <ul className="space-y-2 mb-4">
//           {project.highlights.map((highlight, index) => (
//             <li key={index} className="flex items-start gap-2 text-sm">
//               <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
//               <span className="text-muted-foreground">{highlight}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tech Stack */}
//       <div className="px-6 pb-4">
//         <div className="flex flex-wrap gap-2">
//           {project.tech.map((tech) => (
//             <span
//               key={tech}
//               className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md font-mono text-xs text-primary"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Links */}
//       <div className="px-6 pb-6 pt-2 border-t border-border/50 mt-auto">
//         <div className="flex items-center gap-4">
//           {project.github && (
//             <a
//               href={project.github}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
//             >
//               <Github className="h-4 w-4" />
//               <span className="font-mono text-xs group-hover/link:underline">Source Code</span>
//             </a>
//           )}
//           {project.live && (
//             <a
//               href={project.live}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
//             >
//               <ExternalLink className="h-4 w-4" />
//               <span className="font-mono text-xs group-hover/link:underline">Live Demo</span>
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;





import React, { useState, useRef } from 'react';
import { ExternalLink, Github, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import type { Project } from '@/components/sections/ProjectsSection';

// 1. Update your Interface to include an image for the preview
// (You'll need to update your data source to include image URLs)
interface EnhancedProject extends Project {
  image?: string; // URL to a screenshot or GIF
}

interface ProjectCardProps {
  project: EnhancedProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // --- MOUSE SPOTLIGHT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  // Create the dynamic background gradient based on mouse position
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative h-full rounded-xl bg-gray-900/40 border border-white/10 overflow-hidden transition-colors duration-500 hover:border-primary/50"
    >
      {/* --- 1. BACKGROUND PREVIEW REVEAL --- */}
      {/* This layer sits behind content but in front of base background */}
      {project.image && (
        <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
          {/* The Image */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark Overlay so text remains readable on top of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60" />
        </div>
      )}

      {/* --- 2. SPOTLIGHT GLOW EFFECT --- */}
      {/* This layer uses the mouse position to reveal a glowing border/bg */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <div className="absolute inset-0 bg-primary/20" />
      </motion.div>


      {/* --- 3. CONTENT CONTENT --- */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start">
            {project.isHackathon ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4 backdrop-blur-md">
                <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                <span className="font-mono text-xs text-yellow-500 font-medium">
                  {project.hackathonLabel}
                </span>
              </div>
            ) : (
              <div className="h-8 mb-4" /> /* Spacer if no badge */
            )}
            
            {/* Crazy Icon Spin on Hover */}
            <div className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
               <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>
          
          <h3 className="font-mono text-xl font-bold text-white group-hover:text-primary transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-primary/80 text-sm font-medium">{project.subtitle}</p>
        </div>

        {/* Description */}
        <div className="px-6 pb-4 flex-1">
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
            {project.description}
          </p>

          {/* Highlights - Slide in on hover */}
          <ul className="space-y-2 mb-4">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{highlight}</span>
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
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-xs text-primary/80 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="px-6 pb-6 pt-2 mt-auto">
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
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
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="font-mono text-xs group-hover/link:underline">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;