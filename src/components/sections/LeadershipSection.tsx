import React, { useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import { Copy } from '../common/Copy';

gsap.registerPlugin(ScrollTrigger);

interface Leader {
  name: string;
  designation: string;
  email: string;
  image: string;
}

const leaders: Leader[] = [
  {
    name: "Mr. Mohan Lal Pandey",
    designation: "Director and CEO",
    email: "mohan@iwm-india.com",
    image: "https://picsum.photos/seed/mohan/800/1000"
  },
  {
    name: "Mr. Sandeep Gole",
    designation: "Director",
    email: "sandeep@iwm-india.com",
    image: "https://picsum.photos/seed/sandeep/800/1000"
  },
  {
    name: "Mr. Hardik Pandey",
    designation: "General Manager",
    email: "hardik@iwm-india.com",
    image: "https://picsum.photos/seed/hardik/800/1000"
  },
  {
    name: "Ms. Radhika Patidar",
    designation: "Hr & Admin Head",
    email: "radhika@iwm-india.com",
    image: "https://picsum.photos/seed/radhika/800/1000"
  },
  {
    name: "Mr. Manoj Batra",
    designation: "Finance Head",
    email: "manojs@iwm-india.com",
    image: "https://picsum.photos/seed/manoj/800/1000"
  },
  {
    name: "Dr. Akhilesh Upadhyay",
    designation: "General Manager - Operations",
    email: "akhilesh@iwm-india.com",
    image: "https://picsum.photos/seed/akhilesh/800/1000"
  },
  {
    name: "Mr. Manas Pandey",
    designation: "Business Development",
    email: "manas@iwm-india.com",
    image: "https://picsum.photos/seed/manas/800/1000"
  },
  {
    name: "Mr. Nazir Mohammed",
    designation: "QHSE",
    email: "qhseiwm@iwm-india.com",
    image: "https://picsum.photos/seed/nazir/800/1000"
  },
  {
    name: "Mr. Ajit Shrivastava",
    designation: "Public Relation Manager",
    email: "ajit@iwm-india.com",
    image: "https://picsum.photos/seed/ajit/800/1000"
  }
];

export const LeadershipSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (email: string, name: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useGSAP(() => {
    const images = containerRef.current?.querySelectorAll('.parallax-img');
    images?.forEach((img) => {
      gsap.fromTo(img, 
        { y: '-5%' },
        { 
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-white py-24 md:py-32 px-6 md:px-16">
      <div className="w-full">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <SectionHeader label="PEOPLE" className="text-black/60" />
            <h2 className="text-3xl md:text-5xl font-medium text-black font-agrandir tracking-tight">
              Our Leadership
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-24">
            {leaders.map((leader, index) => (
              <div 
                key={index} 
                className="group flex flex-col gap-6 cursor-pointer"
                onClick={() => handleCopy(leader.email, leader.name)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="parallax-img w-full h-[110%] object-cover transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Maintained Your Original Arrow Box Design */}
                  <div className="absolute bottom-0 right-0 bg-white p-4 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    {copiedId === leader.name ? (
                      <Check size={24} className="text-green-600 animate-in fade-in zoom-in duration-300" />
                    ) : (
                      <ArrowUpRight size={24} className="text-black" />
                    )}
                  </div>
                  
                  {/* Subtle "Email Copied" Overlay */}
                  {copiedId === leader.name && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-20">
                      <span className="bg-black text-white text-[10px] tracking-[0.2em] font-bold px-4 py-2">
                        EMAIL COPIED
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Copy animateOnScroll={false}>
                    <h3 className="text-xl md:text-2xl font-medium text-black font-agrandir">
                      {leader.name}
                    </h3>
                  </Copy>
                  <Copy animateOnScroll={false} delay={0.1}>
                    <p className="text-zinc-500 font-sans text-sm md:text-base">
                      {leader.designation}
                    </p>
                  </Copy>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};