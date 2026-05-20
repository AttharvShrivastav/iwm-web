import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '../common/Button';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.from(homeRef.current, {
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
    gsap.to('.hero-bg', {
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
      className="relative min-h-screen lg:min-h-screen w-full lg:overflow-hidden flex flex-col justify-start lg:justify-end pt-32 pb-24 lg:pb-24 px-8 md:px-16 bg-black"
    >
      {/* Background Image - Fleet of Trucks */}
      <div className="absolute inset-0 z-0 bg-black">
        <img 
          src="/assets/heroes/home-hero.webp" 
          alt="IWM Truck Fleet" 
          className="hero-bg h-[120%] w-full object-cover brightness-[0.45] contrast-[1.1]"
          referrerPolicy="no-referrer"
          loading="eager"
          {...({ fetchPriority: "high" } as any)}
          onError={(e) => {
            // Fallback to Unsplash if local image is not found
            e.currentTarget.src = "https://images.unsplash.com/photo-1586864387917-f53bc464e81c?q=80&w=2070&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div ref={homeRef} className="text-sm font-bold tracking-[0.2em] mb-4 opacity-100 uppercase font-agrandir">
          + Home
        </div>
        
        <div 
          ref={lineRef} 
          className="w-full h-[1px] bg-white/40 mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-16 items-end">
          <h1 
            ref={headingRef}
            className="text-[40px] md:text-[60px] lg:text-[72px] font-medium leading-[1.05] tracking-tight font-agrandir"
          >
            Built on global standards <br />
            Driven by local impact
          </h1>

          <div ref={subtextRef} className="flex flex-col gap-10">
            <p className="text-[18px] md:text-[20px] font-light leading-snug opacity-90 max-w-md font-sans">
              <span className="inline-block mr-3 text-2xl">↳</span>
              We Understand how a clean living affects living in a city which is moving faster than ever
            </p>
            
            <Button 
              label="Contact Us" 
              bgColor="bg-white/20" 
              textColor="text-white" 
              borderColor="border-white/30"
              className="px-10 py-3.5 text-[11px] hover:bg-white hover:text-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
