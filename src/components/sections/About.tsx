import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import type { AboutContent } from '../../content/homeContent';

gsap.registerPlugin(ScrollTrigger);



type AboutProps = {
  content: AboutContent;
  canAnimate?: boolean;
};

export const About: React.FC<AboutProps> = ({ content, canAnimate = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

const mainText = content.mainText?.trim() || '';
const highlightText = content.highlightText?.trim() || '';
const fullText = [mainText, highlightText].filter(Boolean).join(' ');

  useGSAP(() => {
      if (!canAnimate) return;
    if (!textRef.current) return;

    // 1. Reconstruct text inner elements safely
    const mainTextLength = mainText.length;

    textRef.current.innerHTML = fullText
      .split('')
      .map((char, i) => {
        const isHighlight = i >= mainTextLength;
        return `<span class="char opacity-20 ${isHighlight ? 'text-zinc-300' : 'text-zinc-400'}">${char}</span>`;
      })
      .join('');

    // Immediately recalculate layout geometry now that text spans exist in the DOM
    ScrollTrigger.refresh();

    const chars = textRef.current.querySelectorAll('.char');
    const featureCards = containerRef.current?.querySelectorAll('.feature-card');
    const buttonRow = containerRef.current?.querySelector('.button-row');

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Recalculates paths on window resize adjustments
          }
        });

        tl.to(chars, {
          color: '#000000',
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
        });

        tl.to({}, { duration: 0.3 });

        if (featureCards) {
          tl.from(featureCards, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: 'power4.out'
          });
        }

        if (buttonRow) {
          tl.from(buttonRow, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          }, "-=0.5");
        }
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.to(chars, {
          color: '#000000',
          opacity: 1,
          stagger: 0.05,
          ease: 'power1.inOut',
        });

        if (featureCards) {
          tl.from(featureCards, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
          }, '+=0.2');
        }
      }
    });

    return () => mm.revert();
    }, {
  scope: containerRef,
  dependencies: [fullText],
  revertOnUpdate: true,
});

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-white flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mb-16 lg:mb-0">
          <div>
            <SectionHeader label={content.sectionLabel} className="text-black" />
          </div>
          <div>
            <p 
              ref={textRef}
              className="text-2xl md:text-3xl lg:text-[42px] font-medium leading-[1.2] tracking-tight font-agrandir"
            >
              {fullText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mt-12 lg:mt-24">
          <div className="hidden lg:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {content.features.map((feature, i) => (
              <div key={i} className="feature-card flex flex-col gap-8 border-l border-zinc-200 pl-8">
                <div className="w-16 h-16 bg-zinc-50 flex items-center justify-center rounded-sm">
                  <feature.icon size={32} weight="light" className="text-black" />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl md:text-2xl font-medium font-agrandir text-black">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed font-sans text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="button-row grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mt-16 md:mt-24">
          <div className="hidden lg:block"></div>
          <div>
            <Button 
              label={content.ctaLabel}
              bgColor="bg-black" 
              textColor="text-white"
              className="px-10 py-4 text-xs tracking-widest"
            />
          </div>
        </div>
      </div>
    </section>
  );
};