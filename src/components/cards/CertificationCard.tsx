import { Calendar, ExternalLink } from 'lucide-react';
import type { Certification } from '@/components/sections/CertificationsSection';

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  const Icon = certification.icon;
  
  return (
    <div className="glass rounded-xl p-6 hover:border-primary/50 hover:box-glow transition-all duration-300 group h-full flex flex-col">
      {/* Icon and Type */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className={`h-6 w-6 ${certification.color}`} />
        </div>
        <span className="px-3 py-1 bg-primary/10 rounded-full font-mono text-xs text-primary uppercase tracking-wider">
          {certification.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-mono text-lg font-bold mb-3 group-hover:text-primary transition-colors">
        {certification.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
        {certification.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        {certification.date && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-mono text-xs">{certification.date}</span>
          </div>
        )}
        {certification.link && (
          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <span className="font-mono text-xs">View</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;
