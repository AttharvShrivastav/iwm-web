import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../common/SectionHeader';
import { Quote, ChevronRight, ChevronLeft } from 'lucide-react';

interface SipahiQuote {
  id: number;
  name: string;
  role: string;
  statement: string;
  image: string;
  yearsWithIwm?: string;
  isHindi?: boolean;
}

const sipahiGroups: SipahiQuote[][] = [
  [
    {
      id: 1,
      name: "Sourabh Pandey",
      role: "Project Manager",
      statement: "I have been working with the company since 15th December 2019 as a Project Manager in the Operations department. My experience here has been highly rewarding, with continuous learning and growth opportunities. The management is supportive and encourages innovation and responsibility. The work environment is professional, and teamwork is highly valued. I am proud to be associated with an organization that is committed to excellence in its services.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b8ee4a14?q=80&w=2070&auto=format&fit=crop",
      yearsWithIwm: "Since 2019"
    },
    {
      id: 2,
      name: "पदम सिंह सोलंकी",
      role: "मैकेनिक (वर्कशॉप)",
      statement: "मैं पिछले 6+ वर्षों से इस कंपनी में मैकेनिक के रूप में कार्य कर रहा हूँ। यहाँ मुझे विभिन्न मशीनों पर काम करने का अवसर मिला है, जिससे मेरी तकनीकी जानकारी और कौशल में काफी सुधार हुआ है। कंपनी समय पर वेतन देती है और काम का वातावरण भी अच्छा है। हमारे वरिष्ठ हमेशा मार्गदर्शन करते हैं और जरूरत पड़ने पर पूरा सहयोग मिलता है। मुझे इस कंपनी का हिस्सा बनकर गर्व महसूस होता है।",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      yearsWithIwm: "6+ Years",
      isHindi: true
    }
  ],
  [
    {
      id: 3,
      name: "अजोध्या बरिया",
      role: "सफाई मित्र",
      statement: "मैं पिछले कई वर्षों से इस कंपनी में कार्य कर रही हूँ। यहाँ काम करने का अनुभव अच्छा है। कंपनी समय पर वेतन देती है और काम भी नियमित मिलता है। हमारे सुपरवाइजर सहयोग करते हैं और काम को सही तरीके से समझाते हैं। मुझे यहाँ काम करके संतोष और सुरक्षा महसूस होती है।",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      yearsWithIwm: "Multiple Years",
      isHindi: true
    },
    {
      id: 4,
      name: "गंगा बाई साठे",
      role: "सफाई मित्र",
      statement: "मैं पिछले 2 वर्षों से इस कंपनी में सड़क सफाई का कार्य कर रही हूँ। यहाँ का माहौल अच्छा है और सभी एक-दूसरे का सहयोग करते हैं। कंपनी हमें जरूरी उपकरण और सुरक्षा का ध्यान रखती है। समय पर वेतन मिलने से परिवार चलाने में सुविधा होती है। मुझे यहाँ काम करके अच्छा लगता है।",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=1974&auto=format&fit=crop",
      yearsWithIwm: "2 Years",
      isHindi: true
    }
  ]
];

export const SipahiVoices: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState(0);

  const nextGroup = () => {
    setActiveGroup((prev) => (prev + 1) % sipahiGroups.length);
  };

  const prevGroup = () => {
    setActiveGroup((prev) => (prev - 1 + sipahiGroups.length) % sipahiGroups.length);
  };

  return (
    <section className="w-full bg-[#003358] py-24 md:py-32 px-8 md:px-16 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-24">
          <div className="flex flex-col gap-6 max-w-2xl">
            <SectionHeader label="VOICE FROM THE GROUND" className="text-white/60" />
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white font-agrandir leading-[1.1]">
              Radical Dignity in <br /> 
              <span className="italic font-normal opacity-80">Every Action.</span>
            </h2>
            <p className="text-white/60 font-sans text-lg md:text-xl leading-relaxed">
              Our Swachhata Sipahis are the backbone of everything we do. Professionalism, discipline, and pride define their journey.
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
              {sipahiGroups[activeGroup].map((quote) => (
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
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
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

