import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react'; // Added X icon here
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import type { IndustriesContent, IndustryClientContent } from '../../content/homeContent';


type IndustriesProps = {
  content: IndustriesContent;
};

export const Industries: React.FC<IndustriesProps> = ({ content }) => {
  const industries = content.items;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [clientPage, setClientPage] = useState(0);
  const [selectedClient, setSelectedClient] =
    useState<IndustryClientContent | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const clientsPerPage = 9;

  if (!industries.length) {
    return null;
  }

  const safeActiveIndex = Math.min(activeIndex, industries.length - 1);
  const activeIndustry = industries[safeActiveIndex];

  const totalPages = Math.ceil(activeIndustry.clients.length / clientsPerPage);
  const currentClients = activeIndustry.clients.slice(
    clientPage * clientsPerPage,
    (clientPage + 1) * clientsPerPage
  );

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        id: 'industries-pin',
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(Math.floor(progress * industries.length), industries.length - 1);
          
          setActiveIndex((current) => {
            if (current !== newIndex) {
              setDirection(newIndex > current ? 1 : -1);
              setClientPage(0);
              return newIndex;
            }
            return current;
          });
        }
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const nextPage = () => {
    setClientPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setClientPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#f8f7f2] min-h-screen lg:h-screen lg:overflow-hidden flex flex-col py-16 lg:py-0"
    >
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full">
        {/* Heading */}
        <div className="w-full mb-10 lg:mb-12 text-center">
          <SectionHeader label={content.sectionLabel} className="text-zinc-400 mb-4" />
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-medium text-black font-agrandir leading-tight tracking-tight max-w-2xl mx-auto">
            {content.heading}
          </h2>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_1fr_1.1fr] gap-10 lg:gap-20 w-full items-stretch">
          
          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col gap-2 md:gap-4 lg:justify-between h-auto lg:h-[clamp(280px,50vh,500px)] -ml-2 lg:-ml-6">
            {industries.map((industry, index) => (
              <button
                key={industry.id}
                onClick={() => {
                  const trigger = ScrollTrigger.getById('industries-pin');
                  if (trigger) {
                    setDirection(index > activeIndex ? 1 : -1);
                    const scrollPos = trigger.start + (index / industries.length) * (trigger.end - trigger.start) + 10;
                    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
                  } else {
                    setActiveIndex(index);
                    setDirection(index > activeIndex ? 1 : -1);
                  }
                }}
                className={`text-center lg:text-left transition-all duration-300 font-agrandir leading-tight uppercase tracking-tighter px-3 lg:px-2 py-2 lg:py-1 cursor-pointer outline-none rounded-none border-b-2 lg:border-none ${
                  activeIndex === index 
                    ? 'text-[14px] lg:text-[clamp(18px,3vh,36px)] font-medium text-black border-black' 
                    : 'text-[12px] lg:text-[clamp(12px,2vh,24px)] font-normal text-zinc-400 border-transparent hover:text-black hover:border-zinc-300'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>

          {/* Image Section */}
          <div className="relative h-[200px] md:h-[300px] lg:h-[clamp(280px,50vh,500px)] w-full overflow-hidden shadow-lg rounded-sm bg-zinc-100 hidden md:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeIndustry.id}
                initial={{ y: direction > 0 ? '100%' : '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: direction > 0 ? '-100%' : '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={activeIndustry.image}
                  alt={activeIndustry.name}
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = activeIndustry.fallbackImage;
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clients Grid */}
          <div className="flex flex-col h-auto lg:h-[clamp(280px,50vh,500px)] lg:pl-12">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndustry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-3 w-full"
                >
                  {(window.innerWidth < 1024 ? activeIndustry.clients : currentClients).map((client, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedClient(client)}
                      className="aspect-square bg-white p-2 lg:p-4 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.01)] grayscale hover:grayscale-0 transition-all duration-500 rounded-sm border border-black/[0.02] cursor-pointer hover:border-black/20 hover:scale-[1.02]"
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-w-[100%] max-h-[100%] object-contain opacity-50 hover:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = client.fallbackLogo;
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="hidden lg:flex items-center justify-between w-full pt-8">
              <div className="flex items-center gap-3">
                <Button
                  label={content.prevLabel}
                  onClick={prevPage}
                  bgColor="bg-black"
                  textColor="text-white"
                  borderColor="border-black"
                  className="px-6 py-2.5 text-[10px]"
                />
                <Button
                  label={content.nextLabel}
                  onClick={nextPage}
                  bgColor="bg-black"
                  textColor="text-white"
                  borderColor="border-black"
                  className="px-6 py-2.5 text-[10px]"
                />
              </div>
              {totalPages > 1 && (
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-0.5 text-right">
                      {content.pageLabel}
                  </span>
                  <span className="text-[11px] font-medium text-black font-mono">
                    {String(clientPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- POPUP LOGO MODAL CONTAINER --- */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking card body
              className="bg-white p-6 md:p-10 rounded-sm shadow-2xl max-w-md w-full flex flex-col items-center justify-center relative cursor-default border border-black/5"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors p-1 rounded-full hover:bg-zinc-100"
              >
                <X size={18} />
              </button>
              
              {/* Zoomed Logo View */}
              <div className="w-full aspect-square max-h-[240px] flex items-center justify-center mb-6 p-2 bg-zinc-50/50 rounded-sm border border-zinc-100">
                <img
                  src={selectedClient.logo}
                  alt={selectedClient.name}
                  className="max-w-[90%] max-h-[90%] object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = selectedClient.fallbackLogo;
                  }}
                />
              </div>
              
              {/* Client Info Text */}
              <h3 className="text-[18px] font-medium text-black font-agrandir text-center px-2 leading-snug">
                {selectedClient.name}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};