import React from 'react';
import { SectionHeader } from '../common/SectionHeader';

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Indore_Municipal_Corporation_logo.png/220px-Indore_Municipal_Corporation_logo.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Lucknow_Municipal_Corporation_logo.png/220px-Lucknow_Municipal_Corporation_logo.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Municipal_Corporation_of_Greater_Mumbai_logo.png/220px-Municipal_Corporation_of_Greater_Mumbai_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Seal_of_Uttar_Pradesh.svg/1200px-Seal_of_Uttar_Pradesh.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Seal_of_Maharashtra.svg/1200px-Seal_of_Maharashtra.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Bhopal_Municipal_Corporation_logo.png/220px-Bhopal_Municipal_Corporation_logo.png",
];

export const ClientsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="flex flex-col items-center text-center px-8 mb-20">
        <SectionHeader label="WHO WE WORK WITH" className="text-black/60 mb-8" />
        <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.1] tracking-tight font-agrandir max-w-3xl text-black">
          Trusted by Government  <br /> and Corporates
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Top Row: Left Moving */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-left whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {Array(4).fill(0).map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {clientLogos.map((logo, i) => (
                  <div key={`${groupIndex}-${i}`} className="mx-8 md:mx-12 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <img 
                      src={logo} 
                      alt={`Client ${i}`} 
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Row: Right Moving */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-right whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
            {Array(4).fill(0).map((_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {[...clientLogos].reverse().map((logo, i) => (
                  <div key={`${groupIndex}-${i}`} className="mx-8 md:mx-12 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <img 
                      src={logo} 
                      alt={`Client ${i}`} 
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

      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />
    </section>
  );
};
