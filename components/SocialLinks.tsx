import React from 'react';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import MailIcon from './icons/MailIcon';

interface SocialLinksProps {
  github: string;
  linkedin: string;
  email: string;
  iconSize?: string;
  className?: string;
  iconClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  github,
  linkedin,
  email,
  iconSize = 'w-6 h-6',
  className = 'space-x-4',
  iconClassName = 'text-dark-text hover:text-primary transition-colors' // Default updated
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={iconClassName}>
        <GithubIcon className={iconSize} />
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={iconClassName}>
        <LinkedinIcon className={iconSize} />
      </a>
      <a href={email} aria-label="Send an Email" className={iconClassName}>
        <MailIcon className={iconSize} />
      </a>
    </div>
  );
};

export default SocialLinks;