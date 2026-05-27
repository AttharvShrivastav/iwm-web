import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Impact } from '../components/sections/Impact';
import { DiscoverServices } from '../components/sections/DiscoverServices';
import { Industries } from '../components/sections/Industries';
import { MeetTheTeam } from '../components/sections/MeetTheTeam';
import { AnimatedScrollText } from '../components/sections/AnimatedScrollText';
import { useNavigate } from 'react-router-dom';
import { homeHeroFallback } from '../content/homeContent';
import { useContent } from '../hooks/useContent';

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const homeHeroContent = useContent('home.hero', homeHeroFallback);
  return (
    <>
      <Hero content={homeHeroContent} />
      <About />
      <Impact />
      <AnimatedScrollText 
              label="ABOUT US"
              mainText="Our foundation is built on a singular drive: to fundamentally elevate the standards of environmental infrastructure in our country."
              buttonLabel="ABOUT"
              onButtonClick={() => navigate('/about')}
            />
      <DiscoverServices />
      <Industries />
    </>
  );
};
