import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import GithubIcon from './icons/GithubIcon';
import { XIcon } from './icons/MenuIcons'; // For close/back button
import ChevronDownIcon from './icons/ChevronDownIcon'; // For image navigation

interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts or project changes
    window.scrollTo(0, 0);
    setCurrentImageIndex(0); // Reset image index if project changes
  }, [project]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.imageUrls.length) % project.imageUrls.length);
  };
  
  const hasMultipleImages = project.imageUrls.length > 1;

  return (
    <div className="bg-light-bg min-h-screen pt-24 pb-16 px-4 md:px-8"> {/* Adjusted pt for fixed navbar */}
      <div className="container mx-auto max-w-4xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-ui-border">
        
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-accent">
            {project.title}
          </h1>
          <button
            onClick={onClose}
            className="text-muted-text hover:text-primary p-2 rounded-full hover:bg-primary/10 transition-colors -mt-2 -mr-2 sm:mt-0 sm:-mr-0"
            aria-label="Close project details"
          >
            <XIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Image Gallery */}
        {project.imageUrls && project.imageUrls.length > 0 && (
          <div className="mb-8 relative group">
            <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.imageUrls[currentImageIndex]}
                alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/1920x1080.png?text=Image+Load+Error')}
              />
            </div>
            {hasMultipleImages && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 transform -rotate-90" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 transform rotate-90" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {project.imageUrls.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="prose prose-lg max-w-none text-dark-text leading-relaxed mb-8">
          <p>{project.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-accent mb-3">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-sm font-medium border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold shadow-md hover:shadow-lg"
              aria-label={`View source code of ${project.title} on GitHub`}
            >
              <GithubIcon className="w-5 h-5 mr-2.5" /> View Code on GitHub
            </a>
          )}
          {project.liveUrl && ( // Kept for completeness, even if not on card
             <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg bg-secondary text-dark-text py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors font-semibold shadow-md hover:shadow-lg"
              aria-label={`View live demo of ${project.title}`}
            >
               {/* Consider adding an ExternalLinkIcon here if desired */}
               View Live Demo
            </a>
          )}
        </div>
         <button
            onClick={onClose}
            className="mt-12 block mx-auto text-primary hover:underline font-semibold"
            aria-label="Back to projects"
          >
            &larr; Back to all projects
          </button>
      </div>
    </div>
  );
};

export default ProjectDetailView;