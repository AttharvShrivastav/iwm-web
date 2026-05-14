import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import { Button } from '../common/Button';
import { SectionHeader } from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export const MeetTheTeam: React.FC = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text into characters logic...
    if (!textRef.current.querySelector('.char')) {
      const text = textRef.current.innerText;
      textRef.current.innerHTML = text
        .split('')
        .map(char => char === ' ' ? ' ' : `<span class="char opacity-20 text-zinc-400">${char}</span>`)
        .join('');
    }

    const chars = textRef.current.querySelectorAll('.char');
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isDesktop ? '+=150%' : '+=100%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(chars, {
        color: '#005696',
        opacity: 1,
        stagger: isDesktop ? 0.1 : 0.05,
        ease: isDesktop ? 'none' : 'power1.inOut',
      });

      tl.to(chars, {
        color: '#000000',
        stagger: isDesktop ? 0.1 : 0.05,
        ease: isDesktop ? 'none' : 'power1.inOut',
      }, isDesktop ? '<0.15' : '<0.05');

      tl.from(buttonRef.current, {
        y: isDesktop ? 30 : 20,
        opacity: 0,
        duration: isDesktop ? 0.8 : 0.4,
        ease: isDesktop ? 'power3.out' : 'power2.out'
      }, isDesktop ? '+=0.2' : '+=0.1');
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#c9dae8] flex flex-col items-center justify-center px-8 md:px-16 lg:px-32 py-24 overflow-hidden"
    >
      <div className="mb-12 lg:mb-16">
        <SectionHeader label="ABOUT" className="text-black" />
      </div>

      <div className="max-w-6xl text-center mb-16 lg:mb-20">
        <h2 
          ref={textRef}
          className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-medium leading-[1.2] tracking-tight text-zinc-400 font-agrandir"
        >
          Our foundation is built on a singular drive: to fundamentally elevate the standards of environmental infrastructure in our country.
        </h2>
      </div>

      {/* 3. Pass the navigate call to the onClick prop */}
      <div ref={buttonRef}>
        <Button 
          label="ABOUT" 
          bgColor="bg-black" 
          textColor="text-white" 
          borderColor="border-black"
          className="px-10 py-4 text-[11px] lg:text-[13px] hover:bg-zinc-800 hover:text-white"
          onClick={() => navigate('/about')} 
        />
      </div>
    </section>
  );
};