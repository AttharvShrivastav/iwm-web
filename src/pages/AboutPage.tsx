import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageHero } from '../components/sections/PageHero';
import { ValuesSection } from '../components/sections/ValuesSection';
import { LocationSection } from '../components/sections/LocationSection';
import { FoundersNote } from '../components/sections/FoundersNote';
import { OurStory } from '../components/sections/OurStory';
import { ClientsSection } from '../components/sections/ClientsSection';
import { AnimatedScrollText } from '../components/sections/AnimatedScrollText';
import { useAboutPageContent } from '../hooks/useAboutPageContent';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    content: aboutContent,
    status,
    isLoading,
    isFallback,
    error,
  } = useAboutPageContent();

  const pageReady = Boolean(aboutContent) && !isLoading;

  useEffect(() => {
    if (!pageReady) return;

    const refreshOne = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    const refreshTwo = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 900);

    return () => {
      window.clearTimeout(refreshOne);
      window.clearTimeout(refreshTwo);
    };
  }, [pageReady, status]);

  if (import.meta.env.DEV && error) {
    console.warn('AboutPage content error:', error);
  }

  if (import.meta.env.DEV && isFallback) {
    console.info('AboutPage is rendering fallback content.');
  }

  /**
   * Important:
   * Do not render animated About sections while the API is loading.
   * This prevents GSAP from initializing on temporary/fallback content.
   */
  if (!pageReady || !aboutContent) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />;
  }

  return (
    <div key={`about-${status}`} className="bg-white">
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