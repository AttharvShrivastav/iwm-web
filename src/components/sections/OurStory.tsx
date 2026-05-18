import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const storyPhases = [
  {
    year: "2014",
    title: "India Market Entry",
    description: "IWM enters India, bringing its global expertise in serving MENA. Starting operations in Chennai, and establishing its Indian footprint in facility management and waste collection.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2016",
    title: "Record-Breaking Mobilization",
    description: "At the Ujjain Kumbh Mela, IWM breaks the world record for 'Most People Sweeping Simultaneously' with 5,595 people. IWM achieves its largest mobilization and single order project.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2020",
    title: "National Leadership in Mechanized Sweeping",
    description: "After having contributed in making Indore the cleanest city in India for the 4th time in a row, IWM is awarded the single largest work order for mechanized sweeping in the nation.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2025",
    title: "Leading the Nation",
    description: "After having contributed in making Indore the cleanest city in India for the 4th time in a row, IWM is awarded the single largest work order for mechanized sweeping in the nation.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
  }
];

export const OurStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(storyPhases[0].image);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Timeline progress animation
      gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 40%",
          end: "bottom 60%",
          scrub: true,
        }
      });

      // Move image wrapper parallel to the progress line
      gsap.to(imageWrapperRef.current, {
        y: () => {
          const timelineHeight = timelineRef.current?.offsetHeight || 0;
          const wrapperHeight = imageWrapperRef.current?.offsetHeight || 0;
          return timelineHeight - wrapperHeight;
        },
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 40%",
          end: "bottom 60%",
          scrub: true,
        }
      });

      // Phase triggers for image change, text highlight, and dot color
      storyPhases.forEach((phase, i) => {
        ScrollTrigger.create({
          trigger: `.story-phase-${i}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            setActiveImage(phase.image);
            gsap.to(`.dot-${i}`, { backgroundColor: "#005696", borderColor: "#005696", duration: 0.3 });
          },
          onEnterBack: () => {
            setActiveImage(phase.image);
            gsap.to(`.dot-${i}`, { backgroundColor: "#005696", borderColor: "#005696", duration: 0.3 });
          },
          onLeaveBack: () => {
            if (i > 0) {
              gsap.to(`.dot-${i}`, { backgroundColor: "#e4e4e7", borderColor: "#e4e4e7", duration: 0.3 });
            }
          }
        });

        // Text reveal animation
        gsap.from(`.story-phase-${i} .content`, {
          opacity: 0.3,
          y: 30,
          duration: 1,
          scrollTrigger: {
            trigger: `.story-phase-${i}`,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile Timeline Positioning
      const timeline = document.querySelector('.mobile-timeline') as HTMLElement;
      
      const setTimelinePosition = () => {
        const lastPhase = document.querySelector(`.story-phase-${storyPhases.length - 1}`) as HTMLElement;
        if (timeline && lastPhase) {
          // The line height is exactly the distance to the last phase's top
          // which aligns with the center of the last dot (since top-14 to top-14 offset)
          timeline.style.height = `${lastPhase.offsetTop}px`;
        }
      };
      
      setTimelinePosition();
      // Use a small delay to ensure layout is ready
      setTimeout(setTimelinePosition, 100);
      window.addEventListener('resize', setTimelinePosition);

      // Mobile Timeline Line Progress
      gsap.to(".mobile-progress", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".mobile-timeline",
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
        }
      });

      storyPhases.forEach((phase, i) => {
        ScrollTrigger.create({
          trigger: `.story-phase-${i}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(`.mobile-dot-${i}`, { backgroundColor: "#005696", borderColor: "#005696", duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(`.mobile-dot-${i}`, { backgroundColor: "#005696", borderColor: "#005696", duration: 0.3 });
          },
          onLeaveBack: () => {
            if (i > 0) {
              gsap.to(`.mobile-dot-${i}`, { backgroundColor: "#e4e4e7", borderColor: "#e4e4e7", duration: 0.3 });
            }
          }
        });

        gsap.from(`.story-phase-${i}`, {
          opacity: 0,
          x: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.story-phase-${i}`,
            start: "top 90%",
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-white py-24 md:py-32 px-8 md:px-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.1fr_0.6fr] gap-12 lg:gap-0 max-w-7xl mx-auto">
        
        {/* Left Column: Header */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-48 h-fit pb-0">
          <SectionHeader label="OUR STORY" className="text-black" />
          <h2 className="text-[32px] md:text-[48px] font-medium leading-[1.1] tracking-tight text-black font-agrandir">
            Our Story Started with <br /> A Clear Vision
          </h2>
        </div>

        {/* Center Column: Timeline */}
        <div ref={timelineRef} className="hidden lg:flex flex-col items-center relative min-h-[200vh]">
          <div className="w-[2px] h-full bg-zinc-100 absolute top-0 left-1/2 -translate-x-1/2" />
          <div 
            ref={progressRef} 
            className="w-[2px] h-0 bg-[#005696] absolute top-0 left-1/2 -translate-x-1/2 z-10" 
          />
          
          {storyPhases.map((_, i) => (
            <div 
              key={i} 
              className={`dot-${i} w-4 h-4 rounded-full border-2 border-zinc-200 z-20 absolute left-1/2 -translate-x-1/2 transition-colors duration-500 bg-zinc-200`}
              style={{ top: `${(i / (storyPhases.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* Right Column: Content & Moving Image */}
        <div className="relative flex flex-col gap-32 lg:gap-64 pl-10 lg:pl-0 mt-20 lg:mt-0">
          {/* Moving Image Container (Desktop) */}
          <div className="hidden lg:block absolute right-0 top-0 h-full w-[45%] pointer-events-none">
            <div 
              ref={imageWrapperRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-zinc-100 shadow-2xl pointer-events-auto"
            >
              <img 
                src={activeImage} 
                alt="Story Phase" 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-[19px] top-[14px] w-[2px] bg-zinc-100 mobile-timeline">
            {/* Removed the transition classes so GSAP can scrub perfectly */}
            <div className="w-full h-0 bg-[#005696] mobile-progress" />
          </div>

          {storyPhases.map((phase, i) => (
            <div key={i} className={`story-phase-${i} relative flex flex-col gap-12 items-start lg:w-[50%]`}>
              {/* Mobile Dot */}
              <div 
                className={`mobile-dot-${i} lg:hidden absolute left-[-29px] top-[6px] w-4 h-4 rounded-full border-2 border-zinc-200 bg-zinc-100 z-10 transition-colors duration-300`}
              />

              <div className="content flex flex-col gap-6">
                <span className="text-[#005696] font-medium font-agrandir text-lg">{phase.year}</span>
                <h3 className="text-2xl md:text-3xl font-medium text-black font-agrandir leading-tight">
                  {phase.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed font-sans">
                  {phase.description}
                </p>
                
                {/* Mobile Image */}
                <div className="lg:hidden aspect-[4/3] w-full overflow-hidden rounded-sm bg-zinc-100 mt-4 md:max-w-[400px]">
                  <img 
                    src={phase.image} 
                    alt={phase.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
