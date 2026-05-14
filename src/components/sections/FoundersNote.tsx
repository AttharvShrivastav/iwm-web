import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export const FoundersNote: React.FC = () => {
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
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative w-full bg-white py-24 md:py-32 px-8 md:px-16 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
        {/* Image Column */}
        <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-zinc-100">
          <img 
            src="/assets/about/foundersnote/founders-note.jpeg" 
            alt="Founder" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Column */}
        <div ref={contentRef} className="flex flex-col gap-8 md:gap-12">
          <SectionHeader label="FOUNDER'S NOTE" className="text-black" />
          
          <div className="flex flex-col gap-6 md:gap-8">
            <h2 className="text-[32px] md:text-[48px] font-medium leading-[1.1] tracking-tight text-black font-agrandir">
              "We don't just manage waste; we manage the future of our cities."
            </h2>
            
            <div className="flex flex-col gap-6 text-[16px] md:text-[18px] text-zinc-600 leading-relaxed font-sans">
              <p>
                When we started IWM, the goal was simple yet ambitious: to bring industrial-grade efficiency to the most fundamental aspect of urban living—sanitation. We saw cities growing at a pace that traditional systems couldn't match.
              </p>
              <p>
                Our approach has always been centered on two pillars: radical dignity for our workers and relentless innovation in our processes. Every Sipahi on the ground is a testament to our commitment to excellence.
              </p>
              <p>
                Today, as we serve multiple cities across India, our mission remains unchanged. We are here to build infrastructure that lasts and impact that matters.
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xl font-medium text-black font-agrandir">Mohan Pandey</p>
              <p className="text-sm text-zinc-400 tracking-widest uppercase mt-1">Founder and CEO, IWM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
