import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-center text-accent mb-12 md:mb-16">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;