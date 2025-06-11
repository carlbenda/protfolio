import React from 'react';
import Section from './Section';
import { UserInfo } from '../types';

interface AboutProps {
  id: string;
  userInfo: UserInfo;
  skills: string[];
}

const About: React.FC<AboutProps> = ({ id, userInfo, skills }) => {
  return (
    <Section id={id} title="About Me" className="bg-light-bg">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img
                src={userInfo.profileImage || 'https://via.placeholder.com/400x500.png?text=Profile+Image'}
                alt={userInfo.name}
                className="relative rounded-xl shadow-2xl w-72 h-[360px] md:w-80 md:h-[400px] object-cover"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x500.png?text=Profile+Image+Error')}
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-left">
            <h3 className="text-4xl font-bold font-serif text-accent mb-6">
              {`Hey, I'm ${userInfo.name.split(' ')[0]}!`}
            </h3>
            <p className="text-dark-text text-lg leading-relaxed mb-8 whitespace-pre-line">
              {userInfo.bio}
            </p>
            <h4 className="text-3xl font-bold font-serif text-accent mb-5">My Toolkit</h4>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-primary/30 hover:bg-primary hover:text-white transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*
        Removed style jsx block:
        .animate-tilt {
          animation: tilt 5s infinite linear;
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(0.5deg); }
          75% { transform: rotate(-0.5deg); }
        }
        .whitespace-pre-line { // This is a standard Tailwind class
          white-space: pre-line;
        }
      */}
    </Section>
  );
};

export default About;