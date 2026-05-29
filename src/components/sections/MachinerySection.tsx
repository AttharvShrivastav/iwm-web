import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MachinerySectionContent } from '../../content/servicesContent';
import { CMSHeading } from '../../cms/CMSHeading';

type MachinerySectionProps = {
  content: MachinerySectionContent;
};

export const MachinerySection: React.FC<MachinerySectionProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const slide = contextSafe((direction: 'next' | 'prev') => {
    if (!trackRef.current) return;
    if (!content.machines.length) return;

    const totalMachines = content.machines.length;
    const isMobile = window.innerWidth < 1024;
    const step = isMobile ? 1 : 2;
    
    let nextIndex;
    if (direction === 'next') {
      nextIndex = currentIndex + step >= totalMachines ? 0 : currentIndex + step;
    } else {
      nextIndex = currentIndex - step < 0 ? Math.max(0, totalMachines - step) : currentIndex - step;
    }

    setCurrentIndex(nextIndex);

    // Precise physical sliding animation
    const firstCard = trackRef.current.children[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth;
    const style = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
    const xMove = nextIndex * (cardWidth + gap);

    gsap.to(trackRef.current, {
      x: -xMove,
      duration: 1.2,
      ease: 'expo.inOut',
      overwrite: true
    });

    const activeCards = Array.from(trackRef.current.children).slice(nextIndex, nextIndex + step);
    gsap.fromTo(activeCards, 
      { opacity: 0.5, scale: 0.98, x: direction === 'next' ? 50 : -50 },
      { opacity: 1, scale: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
    );
  });

  return (
    <section ref={containerRef} className="w-full bg-white py-12 lg:py-16 px-8 md:px-16 overflow-hidden min-h-[80vh] flex items-center">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Header & Controls */}
          <div className="flex flex-row justify-between items-end gap-12">
            <div className="flex flex-col gap-4">
              <SectionHeader label={content.sectionLabel} className="text-black/60" />
              <CMSHeading
                as="h2"
                text={content.heading}
                className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-black font-agrandir leading-[1.1]"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => slide('prev')}
                className="w-12 h-12 flex items-center justify-center bg-zinc-100 text-black hover:bg-black hover:text-white transition-all rounded-full group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => slide('next')}
                className="w-12 h-12 flex items-center justify-center bg-zinc-100 text-black hover:bg-black hover:text-white transition-all rounded-full group"
              >
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="relative">
            <div 
              ref={trackRef}
              className="flex gap-6 lg:gap-10 w-full"
            >
              {content.machines.map((machine) => (
                <div 
                  key={machine.id}
                  className="flex-shrink-0 w-full lg:w-[calc(50%-20px)] flex flex-col gap-6 bg-zinc-50 p-6 lg:p-10 rounded-sm"
                >
                  {/* Image Area */}
                  <div className="aspect-[16/8] w-full bg-zinc-200 overflow-hidden relative group">
                    <img 
                      src={machine.image} 
                      alt={machine.name}
                      className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = machine.fallback;
                      }}
                    />
                  </div>

                  {/* Info Area */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#005696]">
                        {machine.category}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-medium text-black font-agrandir tracking-tight">
                        {machine.name}
                      </h3>
                      <p className="text-zinc-600 font-sans text-sm lg:text-base leading-relaxed max-w-xl line-clamp-2">
                        {machine.description}
                      </p>
                    </div>

                    {/* Specs Row */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
                      {machine.specs.map((spec, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-zinc-400">
                            {spec.icon}
                            <span className="text-[8px] font-bold uppercase tracking-[0.15em]">{spec.label}</span>
                          </div>
                          <span className="text-xs lg:text-sm font-agrandir font-medium text-black">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
