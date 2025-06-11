import React from 'react';
import { Project as ProjectType } from '../types';
import ProjectCard from './ProjectCard';
import Section from './Section';

interface ProjectsProps {
  id: string;
  projects: ProjectType[];
  githubUsername: string;
  onProjectClick: (projectId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ id, projects, githubUsername, onProjectClick }) => {
  return (
    <Section id={id} title="My Creations" className="bg-ui-bg">
      <div className="container mx-auto px-6 py-12">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => onProjectClick(project.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-muted-text">No projects to display yet. Stay tuned!</p>
        )}
        <p className="text-center mt-16 text-muted-text text-lg">
          Explore more on my <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">GitHub</a>!
        </p>
      </div>
    </Section>
  );
};

export default Projects;