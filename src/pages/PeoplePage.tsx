import React from 'react';
import { PageHero } from '../components/sections/PageHero';
import { LeadershipSection } from '../components/sections/LeadershipSection';
import { SipahiVoices } from '../components/sections/SipahiVoices';
import { CareersSection } from '../components/sections/CareersSection';
import { peoplePageFallback } from '../content/peopleContent';

export const PeoplePage: React.FC = () => {
  const peopleContent = peoplePageFallback;

  return (
    <div className="bg-white">
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