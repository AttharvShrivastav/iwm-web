import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../common/SectionHeader';
import {
  BadgeCheck, Clock3, Droplets,
  Fuel, Gauge,
  Globe, MapPin,
  Recycle,ChevronLeft,
  ChevronRight, Settings,
  Shield, Trash2,
  Truck, Waves,
  Weight, Zap
} from 'lucide-react';

interface Machine {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  image: string;
  fallback: string;
}

const machines: Machine[] = [
  {
    id: 'elgin-pelican-sweeper',
    name: 'Elgin Pelican Sweeper',
    category: 'ROAD SWEEPING',
    description: 'Three-wheel mechanical sweeper built for congested streets, heavy debris pickup, and reliable cleaning across challenging urban road conditions.',
    specs: [
      { label: 'ORIGIN', value: 'USA', icon: <Globe size={14} /> },
      { label: 'CAPACITY', value: '30 km', icon: <Gauge size={14} /> },
      { label: 'SHIFT', value: '8 Hours', icon: <Clock3 size={14} /> }
    ],
    image: '/src/assets/machinery/elgin-pelican-sweeper.png',
    fallback: 'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'dulevo-6000-sweeper',
    name: 'Dulevo 6000 Sweeper',
    category: 'ROAD SWEEPING',
    description: 'High-performance suction sweeper designed for dust control, cleaner air, and dependable municipal cleaning across major urban corridors.',
    specs: [
      { label: 'ORIGIN', value: 'Italy', icon: <Globe size={14} /> },
      { label: 'FUEL', value: 'CNG/Diesel', icon: <Fuel size={14} /> },
      { label: 'CAPACITY', value: '30-40 km', icon: <Gauge size={14} /> }
    ],
    image: '/src/assets/machinery/dulevo-6000-sweeper.png',
    fallback: 'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'citynet-road-sweeper',
    name: 'Citynet Road Sweeper',
    category: 'ROAD SWEEPING',
    description: 'Compact road sweeping machine designed for narrow streets, markets, industrial zones, parks, and public cleaning applications.',
    specs: [
      { label: 'ORIGIN', value: 'Europe', icon: <Globe size={14} /> },
      { label: 'CAPACITY', value: '50 km', icon: <Gauge size={14} /> },
      { label: 'SHIFT', value: '8 Hours', icon: <Clock3 size={14} /> }
    ],
    image: '/src/assets/machinery/citynet-road-sweeper.png',
    fallback: 'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'ravo-compact-sweeper',
    name: 'Ravo Compact Sweeper',
    category: 'ROAD SWEEPING',
    description: 'Highly manoeuvrable compact sweeper built for urban centres, narrow lanes, crowded markets, and noise-sensitive public areas.',
    specs: [
      { label: 'ORIGIN', value: 'Netherlands', icon: <Globe size={14} /> },
      { label: 'CAPACITY', value: '15 km', icon: <Gauge size={14} /> },
      { label: 'SHIFT', value: '8 Hours', icon: <Clock3 size={14} /> }
    ],
    image: '/src/assets/machinery/ravo-compact-sweeper.png',
    fallback: 'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'organic-waste-composter',
    name: 'Organic Waste Composter',
    category: 'WASTE PROCESSING',
    description: 'Fully automated composting machine that converts organic waste into nutrient-rich compost through controlled aerobic processing and deodorization.',
    specs: [
      { label: 'CAPACITY', value: '100–300 kg/day', icon: <Weight size={14} /> },
      { label: 'TIME', value: '24–48 Hours', icon: <Clock3 size={14} /> },
      { label: 'SYSTEM', value: 'PLC Automated', icon: <Settings size={14} /> }
    ],
    image: '/src/assets/machinery/organic-waste-composter.png',
    fallback: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 'jet-cleaning-machine',
    name: 'Jet Cleaning Machine',
    category: 'SURFACE CLEANING',
    description: 'High-pressure water jet system for deep cleaning stains, grime, oil spills, bird droppings, footpaths, signage, and public assets.',
    specs: [
      { label: 'ACTION', value: 'Deep Cleaning', icon: <Zap size={14} /> },
      { label: 'USE', value: 'Public Assets', icon: <Shield size={14} /> },
      { label: 'BRAND', value: 'Kärcher', icon: <BadgeCheck size={14} /> }
    ],
    image: '/src/assets/machinery/jet-cleaning-machine.png',
    fallback: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'sdox-oxygen-system',
    name: 'SDOX Oxygen System',
    category: 'WATER REMEDIATION',
    description: 'Supersaturated dissolved oxygen technology for polluted water treatment, odour control, biological remediation, and lake or reservoir restoration.',
    specs: [
      { label: 'OXYGEN', value: '350 mg/l', icon: <Droplets size={14} /> },
      { label: 'CONTROL', value: 'Odour Control', icon: <Shield size={14} /> },
      { label: 'USE', value: 'River Cleanup', icon: <Waves size={14} /> }
    ],
    image: '/src/assets/machinery/sdox-oxygen-system.png',
    fallback: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'legacy-waste-disposal',
    name: 'Legacy Waste Disposal',
    category: 'WASTE REMEDIATION',
    description: 'Scientific legacy waste processing using bioremediation and bio-mining to recover soil, recyclables, and reclaim impacted land areas.',
    specs: [
      { label: 'PROCESS', value: 'Bio-Mining', icon: <Settings size={14} /> },
      { label: 'SITE', value: 'Ujjain', icon: <MapPin size={14} /> },
      { label: 'OUTPUT', value: 'Land Recovery', icon: <Recycle size={14} /> }
    ],
    image: '/src/assets/machinery/legacy-waste-disposal.png',
    fallback: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 'door-collection-vehicle',
    name: 'Door Collection Vehicle',
    category: 'WASTE COLLECTION',
    description: 'Door-to-door wet and dry waste collection system supporting source segregation, safe transport, community participation, and sustainable disposal.',
    specs: [
      { label: 'WASTE', value: 'Wet/Dry', icon: <Trash2 size={14} /> },
      { label: 'COVERAGE', value: 'Door-to-Door', icon: <Truck size={14} /> },
      { label: 'USE', value: 'Source Segregation', icon: <Recycle size={14} /> }
    ],
    image: '/src/assets/machinery/door-collection-vehicle.png',
    fallback: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop'
  }
];

export const MachinerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const slide = contextSafe((direction: 'next' | 'prev') => {
    if (!trackRef.current) return;

    const totalMachines = machines.length;
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

    // Sub-elements animation for "mark" quality
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
              <SectionHeader label="ADVANCED MACHINERY" className="text-black/60" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-black font-agrandir leading-[1.1]">
                The Engine Behind <br /> Our Efficiency.
              </h2>
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
              {machines.map((machine) => (
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
