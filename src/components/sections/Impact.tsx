import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import type { ImpactContent } from '../../content/homeContent';
import { CMSHeading } from '../../cms/CMSHeading';

gsap.registerPlugin(ScrollTrigger);

type ImpactProps = {
  content: ImpactContent;
  canAnimate?: boolean;
};

export const Impact: React.FC<ImpactProps> = ({ content, canAnimate = true }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const impactCards = content.cards;

  const angle = 360 / impactCards.length;
  const cardHeight = 320;
  const radius = Math.round((cardHeight / 2) / Math.tan(Math.PI / impactCards.length));
  const totalRotation = (impactCards.length - 1) * angle;

  useGSAP(() => {

    if (!canAnimate) return;
    
    if (!sectionRef.current || !containerRef.current || !wrapperRef.current) return;

    // Initial entrance animation for the heading
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Main scroll animation for cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => window.innerWidth < 1024 ? `+=${impactCards.length * 30}%` : `+=${impactCards.length * 50}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const rotation = progress * totalRotation;

          impactCards.forEach((_, index) => {
            const cardAngle = index * -angle;
            const relativeAngle = (cardAngle + rotation) % 360;
            
            // Normalize to -180 to 180
            let normalizedAngle = relativeAngle;
            if (normalizedAngle > 180) normalizedAngle -= 360;
            if (normalizedAngle < -180) normalizedAngle += 360;

            const distance = Math.abs(normalizedAngle);
            
            // 15% base opacity when away, increasing to 100% as it moves to active
            // Using a 45-degree range to match original Carousel's transition feel
            const opacity = gsap.utils.mapRange(0, 45, 1, 0.15, Math.min(distance, 45));
            
            if (cardsRef.current[index]) {
              gsap.set(cardsRef.current[index], { 
                opacity,
                pointerEvents: opacity > 0.8 ? "auto" : "none"
              });
            }
          });
        },
      }
    });

    tl.to(wrapperRef.current, {
      rotateX: totalRotation,
      ease: "none",
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#f8f7f2] pt-24 pb-32 lg:pb-40 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr] gap-y-12 lg:gap-y-24 overflow-hidden"
    >
      {/* Row 1: Heading on the left (60%) */}
      <div className="lg:col-start-1 lg:row-start-1 flex flex-col gap-4">
        <SectionHeader label={content.sectionLabel} className="text-black" />
        
        <div ref={headingRef}>
          <CMSHeading
            as="h2"
            text={content.heading}
            className="text-[32px] md:text-[40px] lg:text-[56px] font-medium leading-[1.1] tracking-tight text-black font-agrandir"
          />
        </div>
      </div>

      {/* Row 2: Card Container on the right (40%) */}
      <div 
        ref={containerRef}
        className="lg:col-start-2 lg:row-start-2 w-full relative flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div 
          ref={wrapperRef}
          className="relative w-full max-w-[600px] h-[320px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {impactCards.map((card, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-white p-[30px] md:p-[40px] flex flex-row items-stretch gap-10 lg:gap-16 w-full h-full shadow-xl absolute top-0 left-0 rounded-sm overflow-hidden"
              style={{ 
                transform: `rotateX(${index * -angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity, filter'
              }}
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent pointer-events-none" />

              {/* Satellite Image */}
              <div className="w-[45%] aspect-square overflow-hidden rounded-sm">
                <img 
                  src={card.image} 
                  alt={card.number} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = card.fallback;
                  }}
                />
              </div>

              {/* Impact Stats */}
              <div className="w-[55%] flex flex-col justify-between py-2">
                <div className="text-[60px] md:text-[80px] lg:text-[80px] font-normal leading-none tracking-tighter text-black font-agrandir">
                  {card.number}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] font-normal leading-snug text-zinc-900 max-w-[280px] font-sans">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
