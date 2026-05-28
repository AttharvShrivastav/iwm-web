import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CMSHeading } from '../../cms/CMSHeading';

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  topRightLink?: {
    label: string;
    href: string;
  };
}

export const PageHero: React.FC<PageHeroProps> = ({ 
  label, 
  title, 
  subtitle, 
  image,
  topRightLink 
}) => {
  const container = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.from(labelRef.current, {
      y: 20,
      opacity: 0,
      delay: 0.5,
      duration: 1
    })
    .from(linkRef.current, {
      y: -20,
      opacity: 0,
      duration: 1
    }, "<")
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
    }, {
      scope: container,
      dependencies: [label, title, subtitle, image],
      revertOnUpdate: true,
    });

  return (
    <section 
      ref={container}
      className="relative min-h-[70vh] lg:min-h-[85vh] w-full lg:overflow-hidden flex flex-col justify-start lg:justify-end pt-32 pb-16 lg:pb-20 px-8 md:px-16 bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="hero-bg h-[120%] w-full object-cover brightness-[0.45] contrast-[1.1]"
          referrerPolicy="no-referrer"
          loading="eager"
          {...({ fetchPriority: "high" } as any)}
          onError={(e) => {
            // If the local image fails, we can keep the black background or set a default Unsplash image
            // For now, let's just ensure it doesn't show a broken icon
            if (!e.currentTarget.src.includes('unsplash')) {
              e.currentTarget.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop";
            }
          }}
        />
      </div>

      {/* Top Right Link */}
      {topRightLink && (
        <a 
          ref={linkRef}
          href={topRightLink.href}
          className="absolute top-32 right-8 md:right-16 z-20 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          {topRightLink.label}
        </a>
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        <div ref={labelRef} className="text-sm font-bold tracking-[0.2em] mb-4 opacity-100 uppercase font-agrandir">
          {label}
        </div>
        
        <div 
          ref={lineRef} 
          className="w-full h-[1px] bg-white/40 mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-16 items-end">
          <div ref={headingRef}>
            <CMSHeading
              as="h1"
              text={title}
              className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-medium leading-[1.05] tracking-tight font-agrandir"
            />
          </div>

          <div ref={subtextRef} className="flex flex-col gap-10">
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-light leading-snug opacity-90 max-w-md font-sans">
              <span className="inline-block mr-3 text-2xl">↳</span>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
