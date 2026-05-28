import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import type { ClientsSectionContent } from '../../content/aboutContent';
import { CMSHeading } from '../../cms/CMSHeading';

type ClientsSectionProps = {
  content: ClientsSectionContent;
};

export const ClientsSection: React.FC<ClientsSectionProps> = ({ content }) => {
  if (!content) return null;
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="flex flex-col items-center text-center px-8 mb-20">
      <SectionHeader label={content.sectionLabel} className="text-black/60 mb-8" />
        <CMSHeading
          as="h2"
          text={content.heading}
          className="text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.1] tracking-tight font-agrandir max-w-3xl text-black"
        />
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-left whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {Array(4).fill(0).map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                  {content.topRowLogos.map((logo, i) => (
                  <div
                    key={`top-${groupIndex}-${i}`}
                    className="mx-8 md:mx-12 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (logo.fallbackSrc) e.currentTarget.src = logo.fallbackSrc;
                      }}
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
                {content.bottomRowLogos.map((logo, i) => (
                  <div
                    key={`bottom-${groupIndex}-${i}`}
                    className="mx-8 md:mx-12 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (logo.fallbackSrc) e.currentTarget.src = logo.fallbackSrc;
                      }}
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