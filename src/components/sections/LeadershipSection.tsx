import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
    image: "/assets/people/leadership/mohan.webp" 
  },
  {
    name: "Mr. Sandeep Gole",
    designation: "Director",
    email: "sandeep@iwm-india.com",
    image: "/assets/people/leadership/sandeep.webp"
  },
  {
    name: "Mr. Hardik Pandey",
    designation: "General Manager",
    email: "hardik@iwm-india.com",
    image: "/assets/people/leadership/hardik.webp"
  },
  {
    name: "Mrs. Varsha Pandey",
    designation: "Director",
    email: "varsha@iwm-india.com",
    image: "/assets/people/leadership/varsha.webp"
  },
  {
    name: "Ms. Radhika Patidar",
    designation: "Hr & Admin Head",
    email: "radhika@iwm-india.com",
    image: "/assets/people/leadership/radhika.webp"
  },
  {
    name: "Mr. Manoj Batra",
    designation: "Finance Head",
    email: "manojs@iwm-india.com",
    image: "/assets/people/leadership/manoj.webp"
  },
  {
    name: "Dr. Akhilesh Upadhyay",
    designation: "General Manager - Operations",
    email: "akhilesh@iwm-india.com",
    image: "/assets/people/leadership/akhilesh.webp"
  },
  {
    name: "Mr. Manas Pandey",
    designation: "Business Development",
    email: "manas@iwm-india.com",
    image: "/assets/people/leadership/manas.webp"
  },
  {
    name: "Mr. Nazir Mohammed",
    designation: "QHSE",
    email: "qhseiwm@iwm-india.com",
    image: "/assets/people/leadership/nazir.webp"
  },
  {
    name: "Mr. Ajit Shrivastava",
    designation: "Public Relation Manager",
    email: "ajit@iwm-india.com",
    image: "/assets/people/leadership/ajit.webp"
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
        { yPercent: 0 }, // Starts at the top-[-10%] we set in CSS
        { 
          yPercent: 15,  // Slides down 15% as you scroll
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
                    className="parallax-img absolute top-[-10%] left-0 w-full h-[120%] object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Maintained Your Original Arrow Box Design */}
                  <div className="absolute bottom-0 right-0 bg-white p-4 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <ArrowUpRight size={24} className="text-black" />
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