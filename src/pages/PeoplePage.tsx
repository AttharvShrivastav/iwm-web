import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageHero } from '../components/sections/PageHero';
import { LeadershipSection } from '../components/sections/LeadershipSection';
import { SipahiVoices } from '../components/sections/SipahiVoices';
import { CareersSection } from '../components/sections/CareersSection';
import { usePeoplePageContent } from '../hooks/usePeoplePageContent';

export const PeoplePage: React.FC = () => {
  const {
    content: peopleContent,
    status,
    isLoading,
    isFallback,
    error,
  } = usePeoplePageContent();

  const pageReady = Boolean(peopleContent) && !isLoading;

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
    console.warn('PeoplePage content error:', error);
  }

  if (import.meta.env.DEV && isFallback) {
    console.info('PeoplePage is rendering fallback content.');
  }

  if (!pageReady || !peopleContent) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />;
  }

  return (
    <div key={`people-${status}`} className="bg-white">
      <PageHero
        label={peopleContent.hero.label}
        title={peopleContent.hero.title}
        subtitle={peopleContent.hero.subtitle}
        image={peopleContent.hero.image}
        topRightLink={peopleContent.hero.topRightLink}
      />

      <LeadershipSection content={peopleContent.leadership} />

      <SipahiVoices content={peopleContent.sipahiVoices} />

      <CareersSection content={peopleContent.careers} />
    </div>
  );
};