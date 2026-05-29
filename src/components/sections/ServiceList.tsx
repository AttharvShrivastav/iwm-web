import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// 1. Removed react-router-dom imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '../common/Button';
import { Copy } from '../common/Copy';
import { X } from 'lucide-react';
import type {
  ServiceItemContent,
  ServiceListContent,
} from '../../content/servicesContent';

gsap.registerPlugin(ScrollTrigger);

type ServiceListProps = {
  content: ServiceListContent;
};

export const ServiceList: React.FC<ServiceListProps> = ({ content }) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedService, setSelectedService] =
  useState<ServiceItemContent | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [visibleCount]);

  // 4. Added effect to prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  useGSAP(() => {
    const lines = containerRef.current?.querySelectorAll('.draw-line');
    lines?.forEach((line) => {
      gsap.fromTo(line, 
        { scaleX: 0, transformOrigin: 'left' },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [visibleCount] });

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, content.services.length));
  };

  return (
    <section ref={containerRef} className="w-full bg-white py-24 md:py-32 px-8 md:px-16 relative">
      <div className="w-full">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 pb-8">
            <h2 className="text-3xl md:text-4xl font-medium text-black font-agrandir">
              {content.heading}
            </h2>
          </div>

          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {content.services.slice(0, visibleCount).map((service, index) => (
                <div key={service.id} className="relative">
                  <div className="draw-line absolute top-0 left-0 w-full h-[1px] bg-zinc-300" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_1.5fr] gap-12 lg:gap-20 items-center py-16 md:py-24 group cursor-pointer"
                    // 5. Replaced navigate() with state update
                    onClick={() => setSelectedService(service)} 
                  >
                    {/* Column 1: Image */}
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-zinc-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (service.fallbackImage) {
                            e.currentTarget.src = service.fallbackImage;
                          }
                        }}
                      />
                    </div>

                    {/* Column 2: Blank Space */}
                    <div className="hidden lg:block"></div>

                    {/* Column 3: Description */}
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-6">
                        <Copy>
                          <h3 className="text-2xl md:text-4xl font-medium text-black font-agrandir leading-tight group-hover:text-zinc-500 transition-colors">
                            {service.title}
                          </h3>
                        </Copy>
                        <Copy delay={0.2}>
                          <p className="text-zinc-600 leading-relaxed font-sans text-lg">
                            {service.description}
                          </p>
                        </Copy>
                      </div>
                      
                      {/* Kept your original hover effect here! */}
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                        <span className="text-xs font-bold text-black tracking-widest uppercase">{content.exploreLabel}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
            <div className="draw-line w-full h-[1px] bg-zinc-300" />
          </div>

          {visibleCount < content.services.length && (
            <div className="flex justify-center mt-12">
              <Button 
                label={content.loadMoreLabel}
                onClick={handleLoadMore}
                bgColor="bg-black"
                textColor="text-white"
                className="px-12 py-4 text-xs tracking-widest"
              />
            </div>
          )}
        </div>
      </div>

      {/* 6. Injected the Modal Component Here */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-sm overflow-hidden flex flex-col shadow-2xl z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 text-zinc-400 hover:text-black transition-colors p-2 bg-white/50 rounded-full backdrop-blur-md"
              >
                <X size={24} />
              </button>

              {/* Text Content Area */}
              <div 
                data-lenis-prevent
                className="w-full p-8 md:p-16 lg:p-24 overflow-y-auto bg-white"
              >
                <div className="max-w-2xl mx-auto flex flex-col gap-12 lg:gap-16">
                  {/* Header - Editorial Style */}
                  <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 font-bold tracking-[0.2em] text-[10px] uppercase">{content.modalEyebrow}</span>
                    </div>
                    {/* Reduced from 6xl to 4xl for a cleaner look */}
                    <h2 className="text-2xl md:text-4xl font-medium text-black font-agrandir leading-tight">
                      {selectedService.title}
                    </h2>
                  </div>

                  {/* Body Text - Editorial Style */}
                  <div className="flex flex-col gap-8 pt-4">
                    {/* Reduced size and lightened color slightly for better reading comfort */}
                    <p className="text-lg md:text-xl text-zinc-700 leading-relaxed font-sans">
                      {selectedService.fullWriteup}
                    </p>
                    
                    <div className="flex flex-col gap-4 pt-4">
                       <p className="text-zinc-500 text-sm leading-relaxed max-w-lg italic border-l-2 border-zinc-200 pl-4">
                        At IWM, our operational philosophy is built on three pillars: visibility of results, relentless innovation, and radical dignity for our staff. This approach allows us to deliver scale and consistency where others see only complexity.
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-8">
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="relative overflow-hidden w-full md:w-auto bg-black text-white px-10 py-5 text-[12px] font-bold tracking-widest hover:bg-zinc-800 transition-colors whitespace-nowrap rounded-none"
                    >
                      {/* The span + relative z-10 locks the text so it can't duplicate */}
                      <span className="relative z-10 block">{content.modalButtonLabel}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="h-1.5 w-full bg-zinc-100" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};