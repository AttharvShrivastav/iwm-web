import React from 'react';
import { PageHero } from '../components/sections/PageHero';
import { LeadershipSection } from '../components/sections/LeadershipSection';
import { SipahiVoices } from '../components/sections/SipahiVoices';
import { CareersSection } from '../components/sections/CareersSection';

export const PeoplePage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero 
        label="+ OUR PEOPLE"
        title="The Force Behind Urban Cleanliness"
        subtitle="A disciplined workforce of operators, engineers, and sanitation professionals delivering consistency, scale, and reliability across urban systems."
        image="/assets/heroes/people-hero.png"
        topRightLink={{
          label: "READ OUR STORY",
          href: "/about"
        }}
      />

      <LeadershipSection />
      <SipahiVoices />
      <CareersSection />
    </div>
  );
};
