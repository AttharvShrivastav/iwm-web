import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '../common/Button';
import { Copy } from '../common/Copy';
import { servicesData } from '../../pages/ServicesPage';

gsap.registerPlugin(ScrollTrigger);

export const ServiceList: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [visibleCount]);

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
    <section ref={containerRef} className="w-full bg-white py-24 md:py-32 px-8 md:px-16">
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
                  {/* Drawing Line */}
                  <div className="draw-line absolute top-0 left-0 w-full h-[1px] bg-zinc-300" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_1.5fr] gap-12 lg:gap-20 items-center py-16 md:py-24 group cursor-pointer"
                    onClick={() => navigate(`/services/${service.id}`)}
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
                      
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                        <span className="text-xs font-bold text-black tracking-widest uppercase">Explore Service</span>
                        <div className="w-8 h-[1px] bg-black" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
            {/* Final Bottom Line */}
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
    </section>
  );
};
