import React from 'react';
import { Project } from '../types';
import GithubIcon from './icons/GithubIcon';
// ExternalLinkIcon is removed as "View Live" button is removed.

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const displayImage = project.imageUrls && project.imageUrls.length > 0 
    ? project.imageUrls[0] 
    : 'https://via.placeholder.com/1920x1080.png?text=Project+Image';

  return (
    <div 
      className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-transform duration-300 flex flex-col group border border-ui-border hover:shadow-2xl cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`View details for ${project.title}`}
    >
      <div className="aspect-video overflow-hidden">
        <img 
            src={displayImage} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/1920x1080.png?text=Image+Error')}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-serif text-accent mb-3">{project.title}</h3>
        <p className="text-dark-text leading-relaxed mb-5 text-sm flex-grow min-h-[60px] line-clamp-3">
            {project.description}
        </p>
        <div className="mb-5">
          {project.tags.slice(0, 3).map((tag) => ( // Show limited tags on card
            <span key={tag} className="inline-block bg-primary/10 text-primary text-xs font-semibold mr-2 mb-2 px-3 py-1.5 rounded-full border border-primary/20">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-block text-primary/70 text-xs font-semibold mr-2 mb-2 px-3 py-1.5">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="mt-auto flex space-x-3 items-center">
          {/* View Live button removed */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
              className="text-sm bg-gray-700 text-white py-2.5 px-5 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center shadow-md hover:shadow-lg"
              aria-label={`View source code of ${project.title} on GitHub`}
            >
              <GithubIcon className="w-4 h-4 mr-2" /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;