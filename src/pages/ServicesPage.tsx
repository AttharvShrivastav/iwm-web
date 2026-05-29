import React from 'react';
import { PageHero } from '../components/sections/PageHero';
import { ServiceList } from '../components/sections/ServiceList';
import { MachinerySection } from '../components/sections/MachinerySection';
import { Industries } from '../components/sections/Industries';
import { servicesPageFallback } from '../content/servicesContent';
import { homePageFallback } from '../content/homeContent';

export const ServicesPage: React.FC = () => {
  const servicesContent = servicesPageFallback;

  return (
    <div className="bg-white">
      <PageHero
        label={servicesContent.hero.label}
        title={servicesContent.hero.title}
        subtitle={servicesContent.hero.subtitle}
        image={servicesContent.hero.image}
        topRightLink={servicesContent.hero.topRightLink}
      />

      <ServiceList content={servicesContent.serviceList} />

      <MachinerySection content={servicesContent.machinery} />

      <Industries content={homePageFallback.industries} />
    </div>
  );
};