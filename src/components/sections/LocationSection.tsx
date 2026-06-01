import React from 'react';
import { Globe } from './Globe';
import { SectionHeader } from '../common/SectionHeader';

const locations = [
  { state: "MADHYA PRADESH", city: "INDORE" },
  { state: "MADHYA PRADESH", city: "RATLAM" },
  { state: "GUJRAT", city: "SURAT" },
  { state: "MADHYA PRADESH", city: "UJJAIN" },
  { state: "ANDHRA PRADESH", city: "TIRUPATI" },
  { state: "MADHYA PRADESH", city: "UJJAIN" },
];

export const LocationSection: React.FC = () => {
  return (
    <section className="relative w-full h-[100dvh] bg-[#003358] text-white flex flex-col pt-10 pb-0 overflow-hidden">
      <div className="flex flex-col items-center text-center px-8 mb-6 z-20">
        <SectionHeader label="OUR LOCATION" className="text-white/80 mb-4 md:mb-6" />
        <h2 className="text-[26px] md:text-[36px] lg:text-[44px] font-medium leading-[1.1] tracking-tight font-agrandir max-w-3xl">
          Based in Indore, India <br />
          Serving the whole Nation
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden pt-12 group z-20 bg-[#003358]">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused] py-4 lg:py-6">
          {Array(4).fill(0).map((_, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {locations.map((loc, i) => (
                <div key={`${groupIndex}-${i}`} className="flex flex-col items-center mx-12 md:mx-24">
                  <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-white/40 mb-1 lg:mb-2 uppercase">
                    {loc.state}
                  </span>
                  <span className="text-[20px] md:text-[28px] lg:text-[32px] font-medium tracking-tight font-agrandir">
                    {loc.city}
                  </span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Globe Container */}
      <div className="relative left-1/2 -translate-x-1/2 w-[180vw] md:w-[140vw] lg:w-[180vw] z-10 pointer-events-none mt-auto">
        <div className="pointer-events-auto flex justify-center">
          <Globe />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};
