import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const AboutHero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.from(breadcrumbRef.current, {
      y: 20,
      opacity: 0,
      delay: 0.5,
      duration: 1
    })
    .from(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.5,
      ease: 'expo.out'
    }, "-=0.8")
    .from(headingRef.current, {
      y: 120,
      opacity: 0,
      skewY: 7,
      duration: 1.8,
      ease: 'expo.out'
    }, "-=1.2")
    .from(subtextRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out'
    }, "-=1.4");

    // Scroll parallax effect
    gsap.to('.about-hero-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative min-h-[70vh] lg:min-h-[85vh] w-full lg:overflow-hidden flex flex-col justify-end pb-24 px-8 md:px-16 bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
          alt="About IWM" 
          className="about-hero-bg h-[120%] w-full object-cover brightness-[0.45] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-center mb-4">
          <div ref={breadcrumbRef} className="text-sm font-bold tracking-[0.2em] opacity-100 uppercase font-agrandir text-white">
            + About Us
          </div>
          <div className="text-[10px] font-bold tracking-[0.2em] text-white uppercase opacity-80">
            Read Our Story
          </div>
        </div>
        
        <div 
          ref={lineRef} 
          className="w-full h-[1px] bg-white/40 mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-16 items-end">
          <h1 
            ref={headingRef}
            className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-medium leading-[1.05] tracking-tight font-agrandir text-white uppercase"
          >
            Industrial Scale <br />
            With Human Core
          </h1>
          
          <div ref={subtextRef} className="flex flex-col gap-4">
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-light leading-snug text-white/90 max-w-md font-sans">
              <span className="inline-block mr-3 text-xl">↳</span>
              "Excellent Execution. Innovation. Radical Dignity." These are not aspirations. They are the operating principles behind every project IWM has ever taken on.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
