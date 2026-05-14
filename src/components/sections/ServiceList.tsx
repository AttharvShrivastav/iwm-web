import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// 1. Removed react-router-dom imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '../common/Button';
import { Copy } from '../common/Copy';
import { X } from 'lucide-react'; // 2. Added X icon for closing the modal

// Ensure 'Service' type is exported from this file along with servicesData
import { servicesData, Service } from '../../pages/ServicesPage';

gsap.registerPlugin(ScrollTrigger);

export const ServiceList: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  // 3. Added state to track the clicked service
  const [selectedService, setSelectedService] = useState<Service | null>(null); 
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
    setVisibleCount(prev => Math.min(prev + 4, servicesData.length));
  };

  return (
    <section ref={containerRef} className="w-full bg-white py-24 md:py-32 px-8 md:px-16 relative">
      <div className="w-full">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 pb-8">
            <h2 className="text-3xl md:text-4xl font-medium text-black font-agrandir">
              Our Services
            </h2>
          </div>

          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {servicesData.slice(0, visibleCount).map((service, index) => (
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
                        <span className="text-xs font-bold text-black tracking-widest uppercase">Explore Service</span>
                        <div className="w-8 h-[1px] bg-black" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
            <div className="draw-line w-full h-[1px] bg-zinc-300" />
          </div>

          {visibleCount < servicesData.length && (
            <div className="flex justify-center mt-12">
              <Button 
                label="LOAD MORE"
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
                  {/* Header */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      {/* <div className="w-12 h-[1px] text-black" /> */}
                      <span className="text-black font-bold tracking-[0.3em] text-[10px] uppercase">Service Specialization</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium text-black font-agrandir leading-tight tracking-tight">
                      {selectedService.title}
                    </h2>
                  </div>

                  {/* Body Text */}
                  <div className="flex flex-col gap-8">
                    <p className="text-xl md:text-2xl text-zinc-800 leading-relaxed font-sans font-normal">
                      {selectedService.fullWriteup}
                    </p>
                    
                    <div className="w-full h-[1px] bg-zinc-100 my-4" />
                    
                    <div className="flex flex-col gap-4">
                       <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
                        At IWM, our operational philosophy is built on three pillars: visibility of results, relentless innovation, and radical dignity for our staff. This approach allows us to deliver scale and consistency where others see only complexity.
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-8">
                    <Button 
                      label="CONTACT OUR TEAM"
                      bgColor="bg-black"
                      textColor="text-white"
                      className="w-full md:w-auto py-5 px-10"
                      onClick={() => setSelectedService(null)} // Or route to a contact section
                    />
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