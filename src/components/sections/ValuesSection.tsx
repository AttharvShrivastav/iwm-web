import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ValueItem {
  title?: string;
  description: string;
  hindiText?: string;
}

interface ValuesSectionProps {
  label: string;
  mainText: string;
  highlightText: string;
  values: ValueItem[];
  className?: string;
}

export const ValuesSection: React.FC<ValuesSectionProps> = ({
  label,
  mainText,
  highlightText,
  values,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cleanMainText = useMemo(() => {
    return String(mainText || '')
      .replace(/\r\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, [mainText]);

  const cleanHighlightText = useMemo(() => {
    return String(highlightText || '')
      .replace(/\r\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, [highlightText]);

  const fullText = useMemo(() => {
    return [cleanMainText, cleanHighlightText].filter(Boolean).join(' ');
  }, [cleanMainText, cleanHighlightText]);

  useGSAP(() => {
    if (!textRef.current || !fullText) return;

    const mainTextLength = cleanMainText.length;

    textRef.current.innerHTML = fullText
      .split('')
      .map((char, i) => {
        const isHighlight = i >= mainTextLength;

        return `<span class="char opacity-20 ${
          isHighlight ? 'text-zinc-300' : 'text-zinc-400'
        }">${char}</span>`;
      })
      .join('');

    const chars = textRef.current.querySelectorAll('.char');
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(chars, {
        color: '#000000',
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
      });

      const cards = cardsRef.current?.querySelectorAll('.value-card');

      tl.to({}, { duration: 0.5 });

      if (cards) {
        tl.from(cards, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out',
        });
      }
    });

    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(chars, {
        color: '#000000',
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        duration: 2,
      });

      tl.to({}, { duration: 0.5 });

      const cards = cardsRef.current?.querySelectorAll('.value-card');

      if (cards) {
        tl.from(cards, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    });

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      mm.revert();
      window.clearTimeout(timer);
    };
  }, {
    scope: sectionRef,
    dependencies: [fullText, values.length],
    revertOnUpdate: true,
  });

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[100dvh] w-full bg-white flex flex-col pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden ${className}`}
    >
      <div className="w-full flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-[0.23fr_0.77fr] gap-8 lg:gap-16 items-start w-full">
          <div className="pt-2">
            <SectionHeader
              label={label.replace('+ ', '')}
              className="text-black"
            />
          </div>

          <div className="w-full">
            <p
              ref={textRef}
              aria-label={fullText}
              className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-medium leading-[1.2] tracking-tight font-agrandir max-w-[1180px]"
            >
              {fullText}
            </p>
          </div>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.23fr_0.77fr] gap-12 lg:gap-20 items-end w-full">
          <div className="hidden lg:block"></div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full"
          >
            {values.map((value, i) => (
              <div
                key={`${value.title || 'value'}-${i}`}
                className="value-card flex flex-col gap-6 lg:gap-8"
              >
                <div className="flex flex-col gap-4">
                  {value.title && (
                    <h3 className="text-xl lg:text-2xl font-medium leading-tight font-agrandir text-black">
                      {value.title}
                    </h3>
                  )}

                  <p className="text-[14px] lg:text-[16px] text-zinc-600 leading-relaxed font-sans">
                    {value.description}
                  </p>
                </div>

                {value.hindiText && (
                  <div className="pt-4 border-t border-zinc-100">
                    <p className="text-[18px] lg:text-[20px] font-hindi text-black font-medium leading-relaxed">
                      {value.hindiText}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};