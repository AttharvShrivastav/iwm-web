import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../common/SectionHeader';
import { Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import type { SipahiVoicesContent } from '../../content/peopleContent';
import { CMSHeading } from '../../cms/CMSHeading';



type SipahiVoicesProps = {
  content: SipahiVoicesContent;
};

export const SipahiVoices: React.FC<SipahiVoicesProps> = ({ content }) => {
  const [activeGroup, setActiveGroup] = useState(0);

  const nextGroup = () => {
    setActiveGroup((prev) => (prev + 1) % content.groups.length);
  };

  const prevGroup = () => {
    setActiveGroup((prev) => (prev - 1 + content.groups.length) % content.groups.length);
  };

  if (!content.groups.length) return null;

  return (
    <section className="w-full bg-[#1B5FB4] py-24 md:py-32 px-8 md:px-16 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-24">
          <div className="flex flex-col gap-6 max-w-2xl">
            <SectionHeader label={content.sectionLabel} className="text-white/90" />
            <CMSHeading
              as="h2"
              text={content.heading}
              className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white font-agrandir leading-[1.1]"
            />
            <p className="text-white/90 font-sans text-lg md:text-xl leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevGroup}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#003358] transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextGroup}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#003358] transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeGroup}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {content.groups[activeGroup].map((quote) => (
                <div 
                  key={quote.id} 
                  className="bg-[#002846] p-10 md:p-12 flex flex-col gap-10 group relative border border-white/5 h-full"
                >
                  <Quote className="absolute top-10 right-10 text-white/5 w-12 h-12" />
                  
                  <div className="relative z-10 flex-grow">
                    <p className={`text-white leading-relaxed italic font-sans opacity-90 ${quote.isHindi ? 'text-xl' : 'text-lg'}`}>
                      "{quote.statement}"
                    </p>
                  </div>

                  <div className="flex items-center gap-5 mt-auto pt-8 border-t border-white/10">
                    <div className="w-16 h-16 bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={quote.image} 
                        alt={quote.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white font-medium font-agrandir text-lg uppercase tracking-tight">
                        {quote.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{quote.role}</span>
                        {quote.yearsWithIwm && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{quote.yearsWithIwm}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

