import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Copy } from '../common/Copy';

interface Job {
  title: string;
  description: string;
  type: string;
  location: string;
}

// When this is empty, it shows the "Suitability" text. 
// When it has items, it shows the "Don't see a fit?" text.
const jobs: Job[] = [];

export const CareersSection: React.FC = () => {
  const navigate = useNavigate();
  const hasOpenings = jobs.length > 0;

  const handleApply = (position: string) => {
    navigate(`/apply?position=${encodeURIComponent(position)}`);
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-24 md:py-32 px-8 md:px-16">
      <div className="w-full">
        <div className="flex flex-col gap-24">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
            <div className="flex flex-col gap-6">
              <SectionHeader label="CAREERS" className="text-black/60" />
              <h2 className="text-3xl md:text-5xl font-medium text-black font-agrandir tracking-tight leading-tight max-w-xl">
                Join the movement for a Cleaner Tomorrow
              </h2>
            </div>
            <div className="pt-12 lg:pt-20">
              <p className="text-zinc-600 font-sans text-lg md:text-xl leading-relaxed max-w-md">
                We are always looking for passionate individuals who are ready to make a tangible impact on the environment and urban infrastructure.
              </p>
            </div>
          </div>

          {/* Job List (Only renders if there are jobs) */}
          {hasOpenings && (
            <div className="flex flex-col border-t border-zinc-200">
              {jobs.map((job, index) => (
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
                        label="APPLY NOW"
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
          <div className="flex flex-col items-center gap-6 pt-12 text-center">
            {hasOpenings ? (
              // Footer when jobs ARE available
              <>
                <p className="text-zinc-500 font-sans text-lg md:text-xl">
                  Don't see a fit? We're always looking for talent.
                </p>
                <a 
                  href="mailto:info@iwm-india.com" 
                  className="group flex items-center gap-2 text-xl md:text-2xl font-medium text-[#005696] font-agrandir hover:opacity-80 transition-opacity"
                >
                  SEND US YOUR CV
                  <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </>
            ) : (
              // Footer when NO jobs are available
              <>
                <p className="text-zinc-500 font-sans text-lg md:text-xl max-w-2xl leading-relaxed">
                  While we don't have any immediate openings, we are always interested in meeting exceptional people. If you believe you are suitable for a role and want to reach out, please contact us.
                </p>
                <a 
                  href="mailto:info@iwm-india.com" 
                  className="group flex items-center gap-2 text-xl md:text-2xl font-medium text-[#005696] font-agrandir hover:opacity-80 transition-opacity"
                >
                  INFO@IWM-INDIA.COM
                  <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};