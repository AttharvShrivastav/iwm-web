// import React, { useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// import { SectionHeader } from '../common/SectionHeader';
// import { Button } from '../common/Button';
// import { Plug, Bridge, Handshake } from '@phosphor-icons/react';

// gsap.registerPlugin(ScrollTrigger);

// const features = [
//   {
//     icon: Plug,
//     title: "Integrated Operations",
//     description: "Seamlessly connecting collection, transportation, and processing workflows to ensure maximum resource recovery and sustainable, long-term impact"
//   },
//   {
//     icon: Bridge,
//     title: "Infrastructure & Technology",
//     description: "Deployment of advanced mechanized systems, smart fleet routing, and high-capacity processing facilities engineered for maximum efficiency and scalability."
//   },
//   {
//     icon: Handshake,
//     title: "Municipal Partnerships",
//     description: "Trusted execution partner for municipal corporations and public institutions, delivering reliable, end-to-end sanitation solutions at a city-wide scale."
//   }
// ];

// export const About: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLParagraphElement>(null);

//   const mainText = "We build and operate large-scale waste management systems that make cities cleaner, more efficient, ";
//   const highlightText = "and environmentally sustainable through structured execution, modern infrastructure, and a deeply human approach to sanitation.";

//   useGSAP(() => {
//     if (!textRef.current) return;

//     const fullText = mainText + highlightText;
//     const mainTextLength = mainText.length;

//     textRef.current.innerHTML = fullText
//       .split('')
//       .map((char, i) => {
//         const isHighlight = i >= mainTextLength;
//         return `<span class="char opacity-20 ${isHighlight ? 'text-zinc-300' : 'text-zinc-400'}">${char}</span>`;
//       })
//       .join('');

//     const chars = textRef.current.querySelectorAll('.char');
//     const featureCards = containerRef.current?.querySelectorAll('.feature-card');
//     const buttonRow = containerRef.current?.querySelector('.button-row');

//     const mm = gsap.matchMedia();

//     mm.add({
//       isDesktop: "(min-width: 1024px)",
//       isMobile: "(max-width: 1023px)"
//     }, (context) => {
//       const { isDesktop } = context.conditions as { isDesktop: boolean };

//       if (isDesktop) {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top top',
//             end: '+=300%',
//             pin: true,
//             scrub: 1,
//             invalidateOnRefresh: true,
//           }
//         });

//         // 1. Reveal Text
//         tl.to(chars, {
//           color: '#000000',
//           opacity: 1,
//           stagger: 0.1,
//           ease: 'none',
//         });

//         tl.to({}, { duration: 0.3 }); // Small gap

//         // 2. Reveal Feature Cards
//         if (featureCards) {
//           tl.from(featureCards, {
//             y: 100,
//             opacity: 0,
//             duration: 1.5,
//             stagger: 0.3,
//             ease: 'power4.out'
//           });
//         }

//         // 3. Reveal Button
//         if (buttonRow) {
//           tl.from(buttonRow, {
//             y: 50,
//             opacity: 0,
//             duration: 1,
//             ease: 'power3.out'
//           }, "-=0.5");
//         }
//       } else {
//         // Mobile behavior (with pinning)
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top top',
//             end: '+=150%',
//             pin: true,
//             scrub: 1,
//           }
//         });

//         tl.to(chars, {
//           color: '#000000',
//           opacity: 1,
//           stagger: 0.05,
//           ease: 'power1.inOut',
//         });

//         if (featureCards) {
//           tl.from(featureCards, {
//             y: 50,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.2,
//             ease: 'power3.out'
//           }, '+=0.2');
//         }
//       }
//     });

//     return () => mm.revert();
//   }, { scope: containerRef });

//   return (
//     <section ref={containerRef} className="relative min-h-screen w-full bg-white flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden">
//       <div className="w-full">
//         {/* Top Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mb-16 lg:mb-0">
//           <div>
//             <SectionHeader label="GET TO KNOW US" className="text-black" />
//           </div>
//           <div>
//             <p 
//               ref={textRef}
//               className="text-2xl md:text-3xl lg:text-[42px] font-medium leading-[1.2] tracking-tight font-agrandir"
//             >
//               {/* Content injected by GSAP */}
//               {mainText} {highlightText}
//             </p>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mt-12 lg:mt-24">
//           <div className="hidden lg:block"></div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
//             {features.map((feature, i) => (
//               <div key={i} className="feature-card flex flex-col gap-8 border-l border-zinc-200 pl-8">
//                 <div className="w-16 h-16 bg-zinc-50 flex items-center justify-center rounded-sm">
//                   <feature.icon size={32} weight="light" className="text-black" />
//                 </div>
//                 <div className="flex flex-col gap-4">
//                   <h3 className="text-xl md:text-2xl font-medium font-agrandir text-black">
//                     {feature.title}
//                   </h3>
//                   <p className="text-zinc-600 leading-relaxed font-sans text-sm md:text-base">
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Button Row */}
//         <div className="button-row grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mt-16 md:mt-24">
//           <div className="hidden lg:block"></div>
//           <div>
//             <Button 
//               label="KNOW MORE" 
//               bgColor="bg-black" 
//               textColor="text-white"
//               className="px-10 py-4 text-xs tracking-widest"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Plug, Bridge, Handshake } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Plug,
    title: "Integrated Operations",
    description: "Seamlessly connecting collection, transportation, and processing workflows to ensure maximum resource recovery and sustainable, long-term impact"
  },
  {
    icon: Bridge,
    title: "Infrastructure & Technology",
    description: "Deployment of advanced mechanized systems, smart fleet routing, and high-capacity processing facilities engineered for maximum efficiency and scalability."
  },
  {
    icon: Handshake,
    title: "Municipal Partnerships",
    description: "Trusted execution partner for municipal corporations and public institutions, delivering reliable, end-to-end sanitation solutions at a city-wide scale."
  }
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const mainText = "We build and operate large-scale waste management systems that make cities cleaner, more efficient, ";
  const highlightText = "and environmentally sustainable through structured execution, modern infrastructure, and a deeply human approach to sanitation.";

  useGSAP(() => {
    if (!textRef.current) return;

    // 1. Reconstruct text inner elements safely
    const fullText = mainText + highlightText;
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-white flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mb-16 lg:mb-0">
          <div>
            <SectionHeader label="GET TO KNOW US" className="text-black" />
          </div>
          <div>
            <p 
              ref={textRef}
              className="text-2xl md:text-3xl lg:text-[42px] font-medium leading-[1.2] tracking-tight font-agrandir"
            >
              {mainText} {highlightText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24 mt-12 lg:mt-24">
          <div className="hidden lg:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {features.map((feature, i) => (
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
              label="KNOW MORE" 
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