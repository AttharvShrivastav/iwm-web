import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import type { FoundersNoteContent } from '../../content/aboutContent';

gsap.registerPlugin(ScrollTrigger);

type FoundersNoteProps = {
  content: FoundersNoteContent;
};

export const FoundersNote: React.FC<FoundersNoteProps> = ({ content }) => {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.from([imageRef.current, contentRef.current], {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out"
      });
    });

    return () => mm.revert();
    }, {
  scope: container,
  dependencies: [content.image.src, content.quote, content.founderName],
  revertOnUpdate: true,
});

  return (
    <section 
      ref={container}
      className="relative w-full bg-white py-24 md:py-32 px-8 md:px-16 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
        {/* Image Column */}
        <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-zinc-100">
          <img 
            src={content.image.src}
            alt={content.image.alt}
            onError={(e) => {
              e.currentTarget.src = content.image.fallbackSrc;
            }}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Column */}
        <div ref={contentRef} className="flex flex-col gap-8 md:gap-12">
            <SectionHeader label={content.sectionLabel} className="text-black" />
          
          <div className="flex flex-col gap-6 md:gap-8">
            <h2 className="text-[32px] md:text-[48px] font-medium leading-[1.1] tracking-tight text-black font-agrandir">
              "{content.quote}"
            </h2>
            
            <div className="flex flex-col gap-6 text-[16px] md:text-[18px] text-zinc-600 leading-relaxed font-sans">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xl font-medium text-black font-agrandir">
                {content.founderName}
              </p>
              <p className="text-sm text-zinc-400 tracking-widest uppercase mt-1">
                {content.founderRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
