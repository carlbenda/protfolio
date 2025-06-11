import React from 'react';
import SocialLinks from './SocialLinks';
import { UserInfo } from '../types';

interface FooterProps {
  userInfo: UserInfo;
}

const Footer: React.FC<FooterProps> = ({ userInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-light-text py-12 border-t-4 border-secondary/50">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <SocialLinks 
            github={userInfo.github}
            linkedin={userInfo.linkedin}
            email={`mailto:${userInfo.email}`}
            iconSize="w-8 h-8"
            className="space-x-6"
            iconClassName="text-light-text/80 hover:text-secondary transition-colors duration-200 hover:scale-110"
          />
        </div>
        <p className="text-gray-300 text-base mb-2">
          &copy; {currentYear} {userInfo.name}. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm">
          Crafted with <span role="img" aria-label="love">❤️</span> by Mursalin Irfan using React & Gemini.
        </p>
      </div>
    </footer>
  );
};

export default Footer;