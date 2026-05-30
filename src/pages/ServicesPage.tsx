import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageHero } from '../components/sections/PageHero';
import { ServiceList } from '../components/sections/ServiceList';
import { MachinerySection } from '../components/sections/MachinerySection';
import { Industries } from '../components/sections/Industries';
import { useServicesPageContent } from '../hooks/useServicePageContent';
import { useHomePageContent } from '../hooks/useHomePageContent';

export const ServicesPage: React.FC = () => {
  const {
    content: servicesContent,
    status: servicesStatus,
    isLoading: servicesLoading,
    isFallback: servicesFallback,
    error: servicesError,
  } = useServicesPageContent();

  const {
    content: homeContent,
    status: homeStatus,
    isLoading: homeLoading,
    isFallback: homeFallback,
    error: homeError,
  } = useHomePageContent();

  const pageReady =
    Boolean(servicesContent) &&
    Boolean(homeContent) &&
    !servicesLoading &&
    !homeLoading;

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
  }, [pageReady, servicesStatus, homeStatus]);

  if (import.meta.env.DEV && servicesError) {
    console.warn('ServicesPage content error:', servicesError);
  }

  if (import.meta.env.DEV && homeError) {
    console.warn('Shared Industries content error:', homeError);
  }

  if (import.meta.env.DEV && servicesFallback) {
    console.info('ServicesPage is rendering fallback services content.');
  }

  if (import.meta.env.DEV && homeFallback) {
    console.info('ServicesPage is rendering fallback industries content.');
  }

  /**
   * Important:
   * Wait until both Services content and shared Home/Industries content are ready.
   * This prevents GSAP sections from initializing on temporary data.
   */
  if (!pageReady || !servicesContent || !homeContent) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />;
  }

  return (
    <div key={`services-${servicesStatus}-${homeStatus}`} className="bg-white">
      <PageHero
        label={servicesContent.hero.label}
        title={servicesContent.hero.title}
        subtitle={servicesContent.hero.subtitle}
        image={servicesContent.hero.image}
        topRightLink={servicesContent.hero.topRightLink}
      />

      <ServiceList content={servicesContent.serviceList} />

      <MachinerySection content={servicesContent.machinery} />

      <Industries content={homeContent.industries} />
    </div>
  );
};