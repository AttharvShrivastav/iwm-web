import React from 'react';
import { PageHero } from '../components/sections/PageHero';
import { ValuesSection } from '../components/sections/ValuesSection';
import { LocationSection } from '../components/sections/LocationSection';
import { FoundersNote } from '../components/sections/FoundersNote';
import { OurStory } from '../components/sections/OurStory';
import { ClientsSection } from '../components/sections/ClientsSection';
import { AnimatedScrollText } from '../components/sections/AnimatedScrollText';
import { useNavigate } from 'react-router-dom';

const valuesData = [
  {
    title: "Excellent Execution",
    description: "We are action-oriented and hands-on. Our confidence is based on visible results — not promises. Management on the ground, every day.",
    hindiText: "बेमिसाल काम — जो सबको दिखे।"
  },
  {
    title: "Continuos Innovation",
    description: "We embrace new technologies and new ways of working not for novelty, but because it is the difference between leading and being left behind.",
    hindiText: "नई सोच — जो हमें आगे रखे।"
  },
  {
    title: "Radical Dignity",
    description: "The goodwill this company has earned rests on the shoulders of those who work day in and day out. We empower, stand by, and honour every Sipahi.",
    hindiText: "पूरा सम्मान — जो हर सिपाही का हक है।"
  }
];

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <PageHero 
        label="+ ABOUT US"
        title="Industrial Scale With Human Core"
        subtitle='"Excellent Execution. Innovation. Radical Dignity." These are not aspirations. They are the operating principles behind every project IWM has ever taken on.'
        image="/src/assets/heroes/about-hero.png"
        topRightLink={{
          label: "READ OUR STORY",
          href: "#"
        }}
      />
      
      <ValuesSection 
        label="+ OUR VALUES"
        mainText="Excellent execution. Radical dignity. Relentless innovation."
        highlightText="The values that shape everything we do and everyone we serve."
        values={valuesData}
      />

      <LocationSection />
      <FoundersNote />
      <OurStory />
      <AnimatedScrollText 
        label="MEET THE TEAM"
        mainText="We build and operate large-scale waste management systems that make cities cleaner, more efficient, and environmentally sustainable."
        buttonLabel="TEAM"
        onButtonClick={() => navigate('/people')}
      />
      <ClientsSection />
    </div>
  );
};
