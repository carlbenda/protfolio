import React from 'react';
import Section from './Section';
import SocialLinks from './SocialLinks';

interface ContactProps {
  id: string;
  email: string;
  github: string;
  linkedin: string;
}

const Contact: React.FC<ContactProps> = ({ id, email, github, linkedin }) => {
  return (
    <Section id={id} title="Let's Connect" className="bg-light-bg">
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-xl text-dark-text mb-10 max-w-2xl mx-auto leading-relaxed">
          I'm always excited to discuss new projects, innovative ideas, or opportunities to collaborate. 
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        
        <div className="mb-12">
          <a
            href={`mailto:${email}`}
            className="inline-block bg-primary text-white text-xl font-bold py-4 px-12 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            aria-label={`Email ${email}`}
          >
            Say Hello
          </a>
        </div>

        <p className="text-muted-text mb-6 text-lg">Find me on social media:</p>
        <div className="flex justify-center">
          <SocialLinks 
            github={github}
            linkedin={linkedin}
            email={`mailto:${email}`}
            iconSize="w-10 h-10 md:w-12 md:h-12" 
            className="space-x-8 md:space-x-10"
            iconClassName="text-accent hover:text-primary transition-transform duration-200 hover:scale-110"
          />
        </div>
      </div>
    </Section>
  );
};

export default Contact;