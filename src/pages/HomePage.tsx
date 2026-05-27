import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Impact } from '../components/sections/Impact';
import { DiscoverServices } from '../components/sections/DiscoverServices';
import { Industries } from '../components/sections/Industries';
import { MeetTheTeam } from '../components/sections/MeetTheTeam';
import { AnimatedScrollText } from '../components/sections/AnimatedScrollText';
import { UNSAFE_AwaitContextProvider, useNavigate } from 'react-router-dom';
import {
  homeHeroFallback,
  homeAboutFallback,
  homeImpactFallback,
  homeAnimatedTextFallback,
  homeDiscoverServicesFallback,
  homeIndustriesFallback,

} from '../content/homeContent';
import { useContent } from '../hooks/useContent';

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const heroContent = useContent('home.hero', homeHeroFallback);
  const aboutContent = useContent('home.about', homeAboutFallback);
  const impactContent = useContent('home.impact', homeImpactFallback);
  const industriesContent = useContent('home.industries', homeIndustriesFallback);
  const discoverServicesContent = useContent('home.discoverServices', homeDiscoverServicesFallback);
  
  const animatedTextContent = useContent(
    'home.animatedText',
    homeAnimatedTextFallback
  );

  return (
    <>
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Impact content={impactContent} />
      <AnimatedScrollText
        label={animatedTextContent.label}
        mainText={animatedTextContent.mainText}
        buttonLabel={animatedTextContent.buttonLabel}
        onButtonClick={() => navigate(animatedTextContent.buttonLink)}
      />
      <DiscoverServices content={discoverServicesContent} />
      <Industries content={industriesContent} />
    </>
  );
};
