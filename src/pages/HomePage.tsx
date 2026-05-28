import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Impact } from '../components/sections/Impact';
import { DiscoverServices } from '../components/sections/DiscoverServices';
import { Industries } from '../components/sections/Industries';
import { AnimatedScrollText } from '../components/sections/AnimatedScrollText';
import { useHomePageContent } from '../hooks/useHomePageContent';

type HomePageProps = {
  appReady?: boolean;
};

export const HomePage: React.FC<HomePageProps> = () => {
  const navigate = useNavigate();

  const {
    content: homeContent,
    status,
    isLoading,
    isFallback,
    error,
  } = useHomePageContent();

  const pageReady = Boolean(homeContent) && !isLoading;

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
    console.warn('HomePage content error:', error);
  }

  if (import.meta.env.DEV && isFallback) {
    console.info('HomePage is rendering fallback content.');
  }

  /**
   * Important:
   * While API is loading, do not render fallback and do not render sections.
   * This prevents GSAP from initializing on temporary content.
   */
  if (!pageReady || !homeContent) {
    return (
      <div className="min-h-screen bg-[#f8f7f2]" aria-hidden="true" />
    );
  }

  return (
    <div key={`home-${status}`}>
      <Hero content={homeContent.hero} />
      <About content={homeContent.about} />
      <Impact content={homeContent.impact} />
      <AnimatedScrollText
        label={homeContent.animatedText.label}
        mainText={homeContent.animatedText.mainText}
        buttonLabel={homeContent.animatedText.buttonLabel}
        onButtonClick={() => navigate(homeContent.animatedText.buttonLink)}
      />
      <DiscoverServices content={homeContent.discoverServices} />
      <Industries content={homeContent.industries} />
    </div>
  );
};