import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Copy } from '../common/Copy';
import type { CareersSectionContent } from '../../content/peopleContent';


type CareersSectionProps = {
  content: CareersSectionContent;
};

export const CareersSection: React.FC<CareersSectionProps> = ({ content }) => {
  const navigate = useNavigate();
  const hasOpenings = content.jobs.length > 0;

  const handleApply = (position: string) => {
    navigate(`/apply?position=${encodeURIComponent(position)}`);
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-24 md:py-32 px-8 md:px-16">
      <div className="w-full">
        <div className="flex flex-col gap-24">
          {/* Header
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:items-end">
            <div className="flex flex-col gap-6">
              <SectionHeader label="CAREERS" className="text-black/60" />
              <h2 className="text-3xl md:text-5xl font-medium text-black font-agrandir tracking-tight leading-tight max-w-xl">
                Join the movement for a Cleaner Tomorrow
              </h2>
            </div>
            <div>
              <p className="text-zinc-600 font-sans text-lg md:text-xl leading-relaxed max-w-md lg:pb-2">
                We are always looking for passionate individuals who are ready to make a tangible impact on the environment and urban infrastructure.
              </p>
            </div>
          </div> */}

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 w-full lg:items-end">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <SectionHeader label={content.sectionLabel} className="text-black/60" />
              <h2 className="text-3xl md:text-5xl font-medium text-black font-agrandir tracking-tight leading-tight max-w-xl">
                {content.heading}
              </h2>
            </div>
            
            {/* Right Column: Pushed to the bottom and vertically centered within itself */}
            <div className="flex flex-col justify-center gap-6 lg:pb-2">
              {hasOpenings ? (
                <p className="text-zinc-600 font-sans text-lg md:text-xl leading-relaxed max-w-md">
                  {content.descriptionWithOpenings}
                </p>
              ) : (
                <>
                  <p className="text-zinc-600 font-sans text-lg md:text-[16px] leading-relaxed max-w-[100%]">
                    {content.descriptionWithoutOpenings}
                  </p>
                  <a 
                    href={`mailto:${content.cvEmail}`}
                    className="group flex items-center gap-2 text-lg md:text-xl font-medium text-[#005696] font-agrandir hover:opacity-80 transition-opacity uppercase"
                  >
                    {content.cvLabel}
                    <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </>
              )}
            </div>
            
          </div>

          {/* Job List (Only renders if there are jobs) */}
          {hasOpenings && (
            <div className="flex flex-col border-t border-zinc-200">
              {content.jobs.map((job, index) => (
                <div key={index} className="group border-b border-zinc-200 py-12 md:py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_0.5fr] gap-8 items-center">
                    <div className="flex flex-col gap-4">
                      <Copy animateOnScroll={false}>
                        <h3 className="text-2xl md:text-3xl font-medium text-black font-agrandir">
                          {job.title}
                        </h3>
                      </Copy>
                      <Copy animateOnScroll={false} delay={0.1}>
                        <p className="text-zinc-500 font-sans text-base leading-relaxed max-w-lg">
                          {job.description}
                        </p>
                      </Copy>
                    </div>
                    <div className="flex items-center lg:justify-center">
                      <span className="text-zinc-600 font-sans font-medium">
                        {job.type} / {job.location}
                      </span>
                    </div>
                    <div className="flex justify-start lg:justify-end">
                      <Button 
                        label={content.applyButtonLabel}
                        bgColor="bg-black"
                        textColor="text-white"
                        onClick={() => handleApply(job.title)}
                        className="px-8 py-3 text-[11px] tracking-widest"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Conditional Footer */}
          {/* Footer (Only renders if there are jobs) */}
          {hasOpenings && (
            <div className="flex flex-col items-center gap-6 pt-12 text-center">
              <p className="text-zinc-500 font-sans text-lg md:text-xl">
                {content.emptyFooterText}
              </p>
              <a 
                href={`mailto:${content.cvEmail}`}
                className="group flex items-center gap-2 text-xl md:text-2xl font-medium text-[#005696] font-agrandir hover:opacity-80 transition-opacity uppercase"
              >
                {content.cvLabel}
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};