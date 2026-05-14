// import React, { useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// import { SectionHeader } from '../common/SectionHeader';
// import { Copy } from '../common/Copy';

// gsap.registerPlugin(ScrollTrigger);

// interface ValueItem {
//   title?: string;
//   description: string;
//   hindiText?: string;
// }

// interface ValuesSectionProps {
//   label: string;
//   mainText: string;
//   highlightText: string;
//   values: ValueItem[];
//   className?: string;
// }

// export const ValuesSection: React.FC<ValuesSectionProps> = ({
//   label,
//   mainText,
//   highlightText,
//   values,
//   className = ""
// }) => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLParagraphElement>(null);
//   const cardsRef = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     if (!textRef.current) return;

//     // Split text into characters for the reveal animation
//     const fullText = mainText + " " + highlightText;
//     const mainTextLength = mainText.length;
    
//     textRef.current.innerHTML = fullText
//       .split('')
//       .map((char, i) => {
//         const isHighlight = i >= mainTextLength;
//         return `<span class="char opacity-20 ${isHighlight ? 'text-zinc-300' : 'text-zinc-400'}">${char}</span>`;
//       })
//       .join('');

//     const chars = textRef.current.querySelectorAll('.char');
//     const mm = gsap.matchMedia();

//     mm.add({
//       isDesktop: "(min-width: 1024px)",
//       isMobile: "(max-width: 1023px)"
//     }, (context) => {
//       const { isDesktop } = context.conditions as { isDesktop: boolean };

//       if (isDesktop) {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top top',
//             end: '+=300%',
//             pin: true,
//             scrub: 1,
//             invalidateOnRefresh: true,
//           }
//         });

//         tl.to(chars, {
//           color: '#000000',
//           opacity: 1,
//           stagger: 0.1,
//           ease: 'none',
//         });

//         const cards = cardsRef.current?.querySelectorAll('.value-card');
        
//         tl.to({}, { duration: 0.5 }); // Gap

//         if (cards) {
//           tl.from(cards, {
//             y: 100,
//             opacity: 0,
//             duration: 1.5,
//             stagger: 0.3,
//             ease: 'power4.out'
//           });
//         }
//       } else {
//         // Mobile animation
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 80%',
//             end: 'bottom 20%',
//             scrub: 0.5,
//           }
//         });

//         tl.to(chars, {
//           color: '#000000',
//           opacity: 1,
//           stagger: 0.05,
//           ease: 'none',
//         });

//         const cards = cardsRef.current?.querySelectorAll('.value-card');
//         if (cards) {
//           gsap.from(cards, {
//             scrollTrigger: {
//               trigger: cardsRef.current,
//               start: 'top 85%',
//             },
//             y: 50,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.2,
//             ease: 'power3.out'
//           });
//         }
//       }
//     });

//     return () => mm.revert();
//   }, { scope: sectionRef });

//   return (
//     <section 
//       ref={sectionRef}
//       className={`relative min-h-screen w-full bg-white flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden ${className}`}
//     >
//       {/* Top Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-[0.2fr_0.8fr] gap-8 lg:gap-16 items-start w-full">
//         <div className="pt-2">
//           <SectionHeader label={label.replace('+ ', '')} className="text-black" />
//         </div>

//         <div className="w-full">
//           <p 
//             ref={textRef}
//             className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-medium leading-[1.2] tracking-tight font-agrandir"
//           >
//             {/* Content injected by GSAP */}
//             {mainText} {highlightText}
//           </p>
//         </div>
//       </div>

//       {/* Values Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-[0.2fr_0.8fr] gap-12 lg:gap-20 items-end w-full">
//         <div className="hidden lg:block"></div>

//         <div 
//           ref={cardsRef}
//           className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full"
//         >
//           {values.map((value, i) => (
//             <div key={i} className="value-card flex flex-col gap-6 lg:gap-8">
//               <div className="flex flex-col gap-4">
//                 {value.title && (
//                   <h3 className="text-xl lg:text-2xl font-medium leading-tight font-agrandir text-black">
//                     {value.title}
//                   </h3>
//                 )}
//                 <p className="text-[14px] lg:text-[16px] text-zinc-600 leading-relaxed font-sans">
//                   {value.description}
//                 </p>
//               </div>
              
//               {value.hindiText && (
//                 <div className="pt-4 border-t border-zinc-100">
//                   <p className="text-[18px] lg:text-[20px] font-hindi text-black font-medium leading-relaxed">
//                     {value.hindiText}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
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
import { Copy } from '../common/Copy';

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
  className = ""
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text into characters for the reveal animation
    const fullText = mainText + " " + highlightText;
    const mainTextLength = mainText.length;
    
    textRef.current.innerHTML = fullText
      .split('')
      .map((char, i) => {
        const isHighlight = i >= mainTextLength;
        return `<span class="char opacity-20 ${isHighlight ? 'text-zinc-300' : 'text-zinc-400'}">${char}</span>`;
      })
      .join('');

    const chars = textRef.current.querySelectorAll('.char');
    
    // Explicit string-based matchMedia for bulletproof mobile detection
    const mm = gsap.matchMedia();

    // DESKTOP LOGIC
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
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

      const cards = cardsRef.current?.querySelectorAll('.value-card');
      
      tl.to({}, { duration: 0.5 }); // Gap before cards

      if (cards) {
        tl.from(cards, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out'
        });
      }
    });

    // MOBILE LOGIC
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Gives enough scroll space for a comfortable reading speed
          pin: true,     // Pinning enabled
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Text coloring takes up the primary portion of the scroll
      tl.to(chars, {
        color: '#000000',
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        duration: 2
      });

      // 2. Pause to allow reading
      tl.to({}, { duration: 0.5 }); 

      // 3. Cards slide in
      const cards = cardsRef.current?.querySelectorAll('.value-card');
      if (cards) {
        tl.from(cards, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out'
        });
      }
    });

    // Crucial fix: Wait for prior sections to calculate their pin spacers 
    // before determining where this section starts.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      mm.revert();
      clearTimeout(timer);
    };
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      // Fixed min-h-[100dvh] and removed flex-gap properties from the root section
      className={`relative min-h-[100dvh] w-full bg-white flex flex-col pt-24 pb-32 px-8 md:px-16 lg:overflow-hidden ${className}`}
    >
      {/* THE FIX: Inner wrapper that contains the flex gaps so the GSAP pin-spacer doesn't break the layout */}
      <div className="w-full flex flex-col justify-start lg:justify-between gap-16 lg:gap-24 flex-grow">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.2fr_0.8fr] gap-8 lg:gap-16 items-start w-full">
          <div className="pt-2">
            <SectionHeader label={label.replace('+ ', '')} className="text-black" />
          </div>

          <div className="w-full">
            <p 
              ref={textRef}
              className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[42px] font-medium leading-[1.2] tracking-tight font-agrandir"
            >
              {mainText} {highlightText}
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.2fr_0.8fr] gap-12 lg:gap-20 items-end w-full">
          <div className="hidden lg:block"></div>

          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full"
          >
            {values.map((value, i) => (
              <div key={i} className="value-card flex flex-col gap-6 lg:gap-8">
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