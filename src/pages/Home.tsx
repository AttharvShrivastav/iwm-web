import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Impact } from '../components/sections/Impact';
import { MeetTheTeam } from '../components/sections/MeetTheTeam';
import { DiscoverServices } from '../components/sections/DiscoverServices';
import { Industries } from '../components/sections/Industries';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Impact />
      <MeetTheTeam />
      <DiscoverServices />
      <Industries />
    </>
  );
};
