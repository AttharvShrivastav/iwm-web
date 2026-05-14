import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Excellent Execution",
    description: "We are action-oriented and hands-on. Our confidence is based on visible results — not promises. Management on the ground, every day.",
    hindi: "बेमिसाल काम — जो सबको दिखे।"
  },
  {
    title: "Continuous Innovation",
    description: "We embrace new technologies and new ways of working not for novelty, but because it is the difference between leading and being left behind.",
    hindi: "नई सोच — जो हमें आगे रखे।"
  },
  {
    title: "Radical Dignity",
    description: "The goodwill this company has earned rests on the shoulders of those who work day in and day out. We empower, stand by, and honour every Sipahi.",
    hindi: "पूरा सम्मान — जो हर सिपाही का हक है।"
  }
];

export const AboutValues: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const mainText = "Excellent execution. Radical dignity. ";
  const highlightText = "Relentless innovation. The values that shape everything we do and everyone we serve.";

  useGSAP(() => {
    if (!textRef.current) return;

    const fullText = mainText + highlightText;
    const mainTextLength = mainText.length;

    textRef.current.innerHTML = fullText
      .split('')
      .map((char, i) => {
        const isHighlight = i >= mainTextLength;
        return `<span class="char opacity-20 ${isHighlight ? 'text-zinc-300' : 'text-zinc-400'}">${char}</span>`;
      })
      .join('');

    const chars = textRef.current.querySelectorAll('.char');
    
    // Explicit matchMedia setup
    const mm = gsap.matchMedia();

    // DESKTOP EXPLICIT
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(chars, {
        color: '#000000',
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
      });

      tl.to({}, { duration: 0.3 }); 

      const desktopCards = cardsRef.current?.querySelectorAll('.card-inner');
      if (desktopCards) {
        tl.from(desktopCards, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out'
        });
      }
    });

    // MOBILE EXPLICIT
    mm.add("(max-width: 1023px)", () => {
      console.log("✅ MOBILE GSAP BLOCK IS EXECUTING"); // Check your console!

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,     
          scrub: 1,
          invalidateOnRefresh: true,
          markers: {startColor: "green", endColor: "red", fontSize: "16px", indent: 20}, // Enhanced markers
          id: "MOBILE_PIN" 
        }
      });

      tl.to(chars, {
        color: '#000000',
        opacity: 1,
        stagger: 0.1, 
        ease: 'none',
        duration: 2   
      });

      tl.to({}, { duration: 0.5 }); 

      const mobileCards = cardsRef.current?.querySelectorAll('.card-inner');
      if (mobileCards) {
        tl.from(mobileCards, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out'
        });
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      mm.revert();
      clearTimeout(timer);
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full bg-white flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden"
    >
      <div className="w-full flex flex-col justify-start gap-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mb-16 lg:mb-0">
          <div>
            <SectionHeader label="OUR VALUES" className="text-black" />
          </div>
          <div>
            <p 
              ref={textRef}
              className="text-[17px] sm:text-[22px] md:text-[28px] lg:text-[36px] xl:text-[42px] font-medium leading-[1.4] lg:leading-[1.2] tracking-tight font-agrandir"
            >
              {mainText} {highlightText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mt-12 lg:mt-24">
          <div className="hidden lg:block"></div>
          <div 
            ref={cardsRef} 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          >
            {features.map((feature, i) => (
              <div key={i} className="feature-card flex flex-col gap-3 lg:gap-8 border-l border-zinc-200 pl-4 lg:pl-8 py-1 lg:py-2">
                <div className="card-inner flex flex-col gap-2 lg:gap-6">
                  <h3 className="text-base md:text-xl lg:text-2xl font-medium leading-tight font-agrandir text-black">
                    {feature.title}
                  </h3>
                  <div className="flex flex-col gap-3 lg:gap-6">
                    <p className="text-[11px] md:text-[14px] lg:text-[16px] text-zinc-500 leading-relaxed font-sans max-w-[280px]">
                      {feature.description}
                    </p>
                    <p className="text-[12px] md:text-[16px] lg:text-[18px] font-hindi text-black/90 leading-none">
                      {feature.hindi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};