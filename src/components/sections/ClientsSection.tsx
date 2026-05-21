import React from 'react';
import { SectionHeader } from '../common/SectionHeader';

const topRowLogos = [
  "/assets/home/industries/logos/industry-authority-logo-3.webp", // NHAI
  "/assets/home/industries/logos/industry-authority-logo-5.webp", // IIM
  "/assets/home/industries/logos/industry-corporate-logo-1.webp", // Phoenix Mall
  "/assets/home/industries/logos/industry-corporate-logo-3.webp", // Cooper Standard
  "/assets/home/industries/logos/industry-corporate-logo-5.webp", // Hitachi
];

const bottomRowLogos = [
  "/assets/home/industries/logos/industry-corporate-logo-6.webp", // Trivitron
  "/assets/home/industries/logos/industry-municipal-logo-1.webp", // Indore
  "/assets/home/industries/logos/industry-municipal-logo-3.webp", // Ujjain
  "/assets/home/industries/logos/industry-municipal-logo-6.webp", // Greater Chennai
  "/assets/home/industries/logos/industry-municipal-logo-7.webp", // Jabalpur
];

export const ClientsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="flex flex-col items-center text-center px-8 mb-20">
        <SectionHeader label="WHO WE WORK WITH" className="text-black/60 mb-8" />
        <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.1] tracking-tight font-agrandir max-w-3xl text-black">
          Trusted by Government <br /> and Corporates
        </h2>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-left whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {Array(4).fill(0).map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {topRowLogos.map((logo, i) => (
                  <div
                    key={`top-${groupIndex}-${i}`}
                    className="mx-8 md:mx-12 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <img
                      src={logo}
                      alt={`Top row client ${i + 1}`}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-right whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {Array(4).fill(0).map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {bottomRowLogos.map((logo, i) => (
                  <div
                    key={`bottom-${groupIndex}-${i}`}
                    className="mx-8 md:mx-12 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <img
                      src={logo}
                      alt={`Bottom row client ${i + 1}`}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
            @keyframes marquee-right {
              0% { transform: translateX(-25%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee-left {
              animation: marquee-left 60s linear infinite;
            }
            .animate-marquee-right {
              animation: marquee-right 60s linear infinite;
            }
          `,
        }}
      />
    </section>
  );
};