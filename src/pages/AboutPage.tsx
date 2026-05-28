import React from 'react';
import { PageHero } from '../components/sections/PageHero';
import { ValuesSection } from '../components/sections/ValuesSection';
import { LocationSection } from '../components/sections/LocationSection';
import { FoundersNote } from '../components/sections/FoundersNote';
import { OurStory } from '../components/sections/OurStory';
import { ClientsSection } from '../components/sections/ClientsSection';
import { AnimatedScrollText } from '../components/sections/AnimatedScrollText';
import { useNavigate } from 'react-router-dom';
import { aboutPageFallback } from '../content/aboutContent';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const aboutContent = aboutPageFallback;

  return (
    <div className="bg-white">
      <PageHero
        label={aboutContent.hero.label}
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
        image={aboutContent.hero.image}
        topRightLink={aboutContent.hero.topRightLink}
      />

      <ValuesSection
        label={aboutContent.values.label}
        mainText={aboutContent.values.mainText}
        highlightText={aboutContent.values.highlightText}
        values={aboutContent.values.values}
      />

      <LocationSection content={aboutContent.location} />
      <FoundersNote content={aboutContent.foundersNote} />
      <OurStory content={aboutContent.ourStory} />

      <AnimatedScrollText
        label={aboutContent.animatedText.label}
        mainText={aboutContent.animatedText.mainText}
        buttonLabel={aboutContent.animatedText.buttonLabel}
        onButtonClick={() => navigate(aboutContent.animatedText.buttonLink)}
      />

      <ClientsSection content={aboutContent.clients} />
    </div>
  );
};