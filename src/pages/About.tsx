import React from 'react';
import { AboutHero } from '../components/sections/AboutHero';
import { About as AboutSection } from '../components/sections/About';
import { AboutValues } from '../components/sections/AboutValues';

export const About: React.FC = () => {
  return (
    <>
      <AboutHero />
      <AboutSection />
      <AboutValues />
    </>
  );
};
