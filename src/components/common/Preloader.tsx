import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Smooth counter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (count < 100) return;

    // Filter out any null entries from the ref array
    const validPanels = panelsRef.current.filter(Boolean);
    
    // REVERSE the array order for the animation timeline.
    // This forces the off-white panel to lift first, followed by the blues,
    // creating the cascading color stripe effect as it exits upwards.
    const exitingOrder = [...validPanels].reverse();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false); // Drops from DOM entirely for 100% clickability
        onComplete();
      }
    });

    // 1. Fade content out slightly before panels shift
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
    })
    // 2. Slide the panels UPWARD out of view using the Nav Menu's signature entry timing
    .to(exitingOrder, {
      y: '-100%',
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.inOut',
    }, '-=0.2');

  }, { scope: containerRef, dependencies: [count] });

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] overflow-hidden pointer-events-none"
    >
      {/* 
        Full-screen panels stacked perfectly on top of each other.
        Z-indexing ensures they stay layered correctly while waiting.
      */}
      <div 
        ref={(el) => el && (panelsRef.current[0] = el)}
        className="absolute inset-0 bg-[#005696] z-10 h-screen w-full"
      />
      <div 
        ref={(el) => el && (panelsRef.current[1] = el)}
        className="absolute inset-0 bg-[#729fcf] z-20 h-screen w-full"
      />
      <div 
        ref={(el) => el && (panelsRef.current[2] = el)}
        className="absolute inset-0 bg-[#f8f7f2] z-30 h-screen w-full"
      />

      {/* Loader Content Layer */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 text-[#005696]"
      >
        <div className="text-xs tracking-widest uppercase opacity-50 font-medium font-agrandir">
          SYSTEM INITIALIZATION
        </div>
        <div className="text-6xl md:text-8xl font-light font-sans tracking-tighter">
          {count}%
        </div>
      </div>
    </div>
  );
};