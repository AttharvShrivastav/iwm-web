import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export const Cleanliness: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const lines = [
    "Cleanliness is more than an aesthetic.",
    "It is the foundation of public health,",
    "the catalyst for urban dignity,",
    "and the silent engine of a thriving city."
  ];

  useGSAP(() => {
    if (!textRef.current) return;

    const lineElements = textRef.current.querySelectorAll('.clean-line');
    
    lineElements.forEach((line, index) => {
      gsap.from(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
        opacity: 0.1,
        y: 10,
        duration: 0.6,
        ease: 'power1.out'
      });
    });

    // Parallax background image
    gsap.to('.clean-bg', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: '20%',
      ease: 'none'
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 px-8 md:px-16 bg-black overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2069&auto=format&fit=crop" 
          alt="Clean City" 
          className="clean-bg w-full h-[140%] object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-12 lg:gap-24">
          <div>
            <SectionHeader label="OUR MISSION" className="text-white/60" />
          </div>
          
          <div ref={textRef} className="flex flex-col gap-4 md:gap-6">
            {lines.map((line, i) => (
              <h2 
                key={i}
                className="clean-line text-3xl md:text-5xl lg:text-7xl font-medium text-white font-agrandir tracking-tight leading-[1.1]"
              >
                {line}
              </h2>
            ))}
            
            <div className="mt-12 max-w-2xl">
              <p className="text-zinc-400 text-lg md:text-xl font-sans leading-relaxed">
                At IWM, we don't just collect waste. We engineer systems that restore the natural rhythm of urban life, ensuring that every street, every corner, and every citizen breathes in a cleaner tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
