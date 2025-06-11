import React, { useState, useEffect } from 'react';
// import { generateWelcomeMessage } from '../services/geminiService'; // Removed Gemini call
import ChevronDownIcon from './icons/ChevronDownIcon';
import { SECTION_IDS } from '../constants';
import { UserInfo } from '../types';

interface HeroProps {
  id: string;
  userInfo: UserInfo;
}

const Hero: React.FC<HeroProps> = ({ id, userInfo }) => {
  // Directly set the desired static welcome message
  const staticWelcomeMessage = "Hey there! I’m Mursalin Irfan — a curious mind, full-time student, and passionate web developer who loves building things for the web.";
  const [welcomeMessage, setWelcomeMessage] = useState<string>(staticWelcomeMessage);
  const [error, setError] = useState<string | null>(null); // Kept for potential future use, but not for welcome message

  // useEffect for fetching welcome message is removed to ensure static message is always used.
  // If you ever want to re-enable dynamic messages, you would reinstate the useEffect and API call.

  const smoothScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(`#${SECTION_IDS.ABOUT}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id={id} 
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary via-green-400 to-secondary text-light-text p-6 relative overflow-hidden"
    >
      {/* Subtle background pattern if desired */}
      {/* <div className="absolute inset-0 opacity-10 pattern-bg"></div> */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-serif mb-4 animate-fade-in-down text-shadow-lg">
          {userInfo.name}
        </h1>
        <p className="text-2xl md:text-3xl text-gray-100 mb-6 animate-fade-in-up delay-200">
          {userInfo.title}
        </p>
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up delay-400">
          <p className="text-lg md:text-xl italic text-gray-200">
            {welcomeMessage}
          </p>
          {/* Error display is kept in case other errors might need to be shown in Hero */}
          {error && <p className="text-sm text-red-200 mt-2">{error}</p>}
        </div>
        <a 
          href={`#${SECTION_IDS.ABOUT}`} 
          onClick={smoothScrollToAbout}
          className="bg-secondary text-dark-text font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-amber-500 transition-colors transform hover:scale-105 animate-fade-in-up delay-600 text-lg"
          aria-label="Discover more about me"
        >
          Discover More
        </a>
      </div>
      <a 
        href={`#${SECTION_IDS.ABOUT}`} 
        onClick={smoothScrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ChevronDownIcon className="w-12 h-12 text-light-text opacity-70 hover:opacity-100 transition-opacity" />
      </a>
      {/*
        Removed style jsx block:
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        // .pattern-bg { background-image: url('data:image/svg+xml,...'); } // Example for SVG pattern
      */}
    </section>
  );
};

export default Hero;