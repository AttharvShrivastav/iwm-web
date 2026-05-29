import type { ReactNode } from 'react';
import {
  BadgeCheck,
  Clock3,
  Droplets,
  Fuel,
  Gauge,
  Globe,
  MapPin,
  Recycle,
  Settings,
  Shield,
  Trash2,
  Truck,
  Waves,
  Weight,
  Zap,
} from 'lucide-react';

export type ServiceItemContent = {
  id: string;
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
  fullWriteup: string;
  features: string[];
};

export type ServiceListContent = {
  heading: string;
  loadMoreLabel: string;
  exploreLabel: string;
  modalEyebrow: string;
  modalPhilosophy: string;
  modalButtonLabel: string;
  services: ServiceItemContent[];
};

export type MachineSpecContent = {
  label: string;
  value: string;
  icon: ReactNode;
};

export type MachineItemContent = {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: MachineSpecContent[];
  image: string;
  fallback: string;
};

export type MachinerySectionContent = {
  sectionLabel: string;
  heading: string;
  machines: MachineItemContent[];
};

export type ServicesPageContent = {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    image: string;
    topRightLink?: {
      label: string;
      href: string;
    };
  };
  serviceList: ServiceListContent;
  machinery: MachinerySectionContent;
};

export const servicesPageFallback: ServicesPageContent = {
  hero: {
    label: '+ SERVICES',
    title: 'Waste Management. Delivered at Scale.',
    subtitle:
      'An integrated suite of collection, processing, sweeping and recovery solutions driving efficiency, compliance, and sustainability at a city-wide scale.',
    image: '/assets/heroes/services-hero.webp',
    topRightLink: {
      label: 'READ OUR STORY',
      href: '/about',
    },
  },

  serviceList: {
    heading: 'Our Services',
    loadMoreLabel: 'LOAD MORE',
    exploreLabel: 'Explore Service',
    modalEyebrow: 'Service Specialization',
    modalPhilosophy:
      'At IWM, our operational philosophy is built on three pillars: visibility of results, relentless innovation, and radical dignity for our staff. This approach allows us to deliver scale and consistency where others see only complexity.',
    modalButtonLabel: 'CONTACT OUR TEAM',
    services: [
      {
        id: 'integrated-facility',
        title: 'Integrated Facility Management',
        description:
          'Comprehensive one-stop solutions for large-scale operations, from housekeeping to technical maintenance.',
        image: '/assets/home/services/service-1.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
        fullWriteup:
          'Our Integrated Facility Management provides comprehensive, one-stop solutions tailored for large-scale operations. We meticulously manage every aspect of your infrastructure, covering housekeeping, deep cleaning, security, plumbing, gardening, and specialized technical services. By streamlining these critical functions into a seamless, unified operation, we ensure efficient and uninterrupted facility performance. Our approach guarantees that your physical assets are maintained to the highest standards, allowing you to focus entirely on your core municipal or corporate objectives.',
        features: [
          'Unified operational management',
          'Specialized technical services',
          'Comprehensive housekeeping',
          'Infrastructure security',
          'Asset lifecycle optimization',
        ],
      },
      {
        id: 'mechanized-sweeping',
        title: 'Mechanized Road Sweeping',
        description:
          'Advanced automated sweeping technology for emission-conscious and efficient urban cleaning.',
        image: '/assets/home/services/service-2.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
        fullWriteup:
          'We deploy advanced automated sweeping technology, utilizing highly specialized machines to efficiently remove dust, debris, and litter from city road surfaces. This modern approach ensures high-performance cleaning while strictly maintaining environmental and safety standards. By continually evaluating high-end European machinery and electric sweeper innovations, we aim to bring the most sophisticated, efficient, and emission-conscious street-cleaning infrastructure to Indian municipalities, ensuring our urban centers remain pristine and scalable.',
        features: [
          'High-end European machinery',
          'PM10/PM2.5 dust suppression',
          'Electric sweeper innovations',
          'Night-time silent operations',
          'Safety-first operational protocols',
        ],
      },
      {
        id: 'manual-sweeping',
        title: 'Manual Road Sweeping',
        description:
          'Precision traditional sweeping delivered with radical dignity and unparalleled attention to detail.',
        image: '/assets/home/services/service-3.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
        fullWriteup:
          'Our manual road sweeping services rely on traditional street cleaning carried out by extensively trained workers to meticulously remove dust, litter, and waste, ensuring clean and hygienic roads. We approach this essential service through the lens of radical dignity, ensuring our frontline sanitation workers are equipped, respected, and empowered. By fostering a sense of pride and providing exceptional operational support, our teams deliver unparalleled attention to detail, creating cleaner, healthier communities across the nation.',
        features: [
          'Extensively trained workforce',
          'Radical dignity approach',
          'Meticulous litter removal',
          'Workforce empowerment',
          'Community health focus',
        ],
      },
      {
        id: 'jet-cleaning',
        title: 'High Pressure Jet Cleaning',
        description:
          'High-performance jet technology systems for fast, deep, and spotless restoration of urban surfaces.',
        image: '/assets/home/services/service-4.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
        fullWriteup:
          'Experience powerful, high-performance cleaning with our advanced jet technology systems. Designed for heavy industrial and municipal applications, this mechanized solution effortlessly blasts away deeply ingrained dirt, heavy grease, and tough stains from various urban surfaces. By utilizing calibrated high-pressure water systems, we consistently deliver fast, deep, and spotless results every single time. This highly efficient service rapidly restores infrastructure aesthetics while minimizing chemical use and operational downtime in fast-moving environments.',
        features: [
          'Calibrated high-pressure systems',
          'Industrial-grade grit removal',
          'Chemical-minimized cleaning',
          'Rapid surface restoration',
          'Versatile application range',
        ],
      },
      {
        id: 'door-to-door',
        title: 'Door to Door Collection',
        description:
          'Structured residential waste pickup systems that serve as the foundation for resource recovery.',
        image: '/assets/home/services/service-5.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
        fullWriteup:
          'Our highly efficient door-to-door collection systems ensure the timely, reliable pickup of waste directly from residential households, promoting unparalleled cleanliness and convenience. By establishing structured and heavily monitored collection routes, we actively support better, more systematic waste management practices at the source. This foundational service is critical for preventing urban overflow, directly contributing to a healthier, vastly more sustainable community and serving as the crucial first step in our integrated resource recovery workflows.',
        features: [
          'Structured collection routes',
          'Real-time monitoring systems',
          'Source segregation awareness',
          'Resource recovery foundation',
          'Reliable pickup schedules',
        ],
      },
      {
        id: 'landscape-maintenance',
        title: 'Maintenance of Landscapes and Gardens',
        description:
          'Expert horticultural upkeep of sprawling lawns and vital green spaces for corporate and municipal assets.',
        image: '/assets/home/services/service-6.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1591193516411-ac56d827aa2d?q=80&w=2070&auto=format&fit=crop',
        fullWriteup:
          'We provide expert maintenance of landscapes and gardens, executing regular upkeep of plants, sprawling lawns, and essential green spaces. Our dedicated horticultural teams ensure the healthy, sustained growth and pristine cleanliness of your environments, guaranteeing an attractive, professional appearance year-round. We understand that well-maintained greenery is crucial for the aesthetic and environmental health of any corporate or municipal campus, and we apply rigorous standards to preserve the vitality and beauty of these natural assets.',
        features: [
          'Professional horticultural teams',
          'Pristine lawn maintenance',
          'Year-round greenery care',
          'Seasonal plant rotations',
          'Sustainable irrigation practices',
        ],
      },
      {
        id: 'bio-remediation',
        title: 'Bio Remediation - Legacy Waste',
        description:
          'Eco-friendly stabilization of landfill sites using natural microorganisms to recover urban land.',
        image: '/assets/home/services/service-7.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
        fullWriteup:
          'Our bioremediation of legacy waste tackles massive environmental challenges by utilizing natural microorganisms to actively break down and stabilize decades of old waste in overloaded landfills and dumpsites. This highly effective, eco-friendly process significantly reduces ground and air pollution, successfully recovers valuable urban land for future development, and heavily minimizes severe environmental and public health risks. We transform hazardous liabilities into neutralized, usable spaces, driving long-term sustainability for rapidly expanding cities.',
        features: [
          'Active biological stabilization',
          'Urban land recovery',
          'Significant pollution reduction',
          'Scientific site management',
          'Risk mitigation protocols',
        ],
      },
      {
        id: 'water-rejuvenation',
        title: 'Water Rejuvenation',
        description:
          'Advanced oxygen dissolution technology to revitalize dead water bodies and optimize treatment.',
        image: '/assets/home/services/service-8.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
        fullWriteup:
          'Our water rejuvenation services utilize an advanced oxygen dissolution system that absolutely maximizes efficiency in large-scale water and wastewater treatment facilities. This cutting-edge technology significantly enhances natural biological breakdown processes, effectively controls hazardous odor and infrastructure corrosion, and heavily supports municipal environmental remediation. Through high-performance oxygen delivery, we restore dead water bodies and optimize processing plants, ensuring vital water resources are safely managed and ecologically revitalized for future generations.',
        features: [
          'High-performance oxygen dissolution',
          'Biological breakdown enhancement',
          'Odor and corrosion control',
          'Environmental remediation support',
          'Water body ecological restoration',
        ],
      },
      {
        id: 'sewage-inspection',
        title: 'Sewage System Inspection & Maintenance',
        description:
          'Robotics and AI-driven analytics for precision detection and maintenance of urban sewer systems.',
        image: '/assets/home/services/service-9.webp',
        fallbackImage:
          'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
        fullWriteup:
          'We use advanced technology to thoroughly inspect underground sewage pipelines, accurately detecting hidden cracks, severe silt buildup, and critical blockages. By pioneering specialized robotics and AI-driven fluid analytics for municipal infrastructure, we accurately identify precise problem areas. This allows us to provide targeted, minimally invasive solutions that drastically improve flow efficiency, significantly reduce ongoing maintenance costs, and ensure the long-term durability and structural integrity of complex urban sewer systems.',
        features: [
          'Advanced robotic inspection',
          'AI-driven fluid analytics',
          'Minimally invasive solutions',
          'Flow efficiency optimization',
          'Structural integrity monitoring',
        ],
      },
    ],
  },

  machinery: {
    sectionLabel: 'ADVANCED MACHINERY',
    heading: 'The Engine Behind || Our Efficiency.',
    machines: [
      {
        id: 'elgin-pelican-sweeper',
        name: 'Elgin Pelican Sweeper',
        category: 'ROAD SWEEPING',
        description:
          'Three-wheel mechanical sweeper built for congested streets, heavy debris pickup, and reliable cleaning across challenging urban road conditions.',
        specs: [
          { label: 'ORIGIN', value: 'USA', icon: <Globe size={14} /> },
          { label: 'CAPACITY', value: '30 km', icon: <Gauge size={14} /> },
          { label: 'SHIFT', value: '8 Hours', icon: <Clock3 size={14} /> },
        ],
        image: '/assets/machinery/machine-1.webp',
        fallback:
          'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 'dulevo-6000-sweeper',
        name: 'Dulevo 6000 Sweeper',
        category: 'ROAD SWEEPING',
        description:
          'High-performance suction sweeper designed for dust control, cleaner air, and dependable municipal cleaning across major urban corridors.',
        specs: [
          { label: 'ORIGIN', value: 'Italy', icon: <Globe size={14} /> },
          { label: 'FUEL', value: 'CNG/Diesel', icon: <Fuel size={14} /> },
          { label: 'CAPACITY', value: '30-40 km', icon: <Gauge size={14} /> },
        ],
        image: '/assets/machinery/machine-2.webp',
        fallback:
          'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 'citynet-road-sweeper',
        name: 'Citynet Road Sweeper',
        category: 'ROAD SWEEPING',
        description:
          'Compact road sweeping machine designed for narrow streets, markets, industrial zones, parks, and public cleaning applications.',
        specs: [
          { label: 'ORIGIN', value: 'Europe', icon: <Globe size={14} /> },
          { label: 'CAPACITY', value: '50 km', icon: <Gauge size={14} /> },
          { label: 'SHIFT', value: '8 Hours', icon: <Clock3 size={14} /> },
        ],
        image: '/assets/machinery/machine-3.webp',
        fallback:
          'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 'ravo-compact-sweeper',
        name: 'Ravo Compact Sweeper',
        category: 'ROAD SWEEPING',
        description:
          'Highly manoeuvrable compact sweeper built for urban centres, narrow lanes, crowded markets, and noise-sensitive public areas.',
        specs: [
          { label: 'ORIGIN', value: 'Netherlands', icon: <Globe size={14} /> },
          { label: 'CAPACITY', value: '15 km', icon: <Gauge size={14} /> },
          { label: 'SHIFT', value: '8 Hours', icon: <Clock3 size={14} /> },
        ],
        image: '/assets/machinery/machine-4.webp',
        fallback:
          'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 'organic-waste-composter',
        name: 'Organic Waste Composter',
        category: 'WASTE PROCESSING',
        description:
          'Fully automated composting machine that converts organic waste into nutrient-rich compost through controlled aerobic processing and deodorization.',
        specs: [
          { label: 'CAPACITY', value: '100–300 kg/day', icon: <Weight size={14} /> },
          { label: 'TIME', value: '24–48 Hours', icon: <Clock3 size={14} /> },
          { label: 'SYSTEM', value: 'PLC Automated', icon: <Settings size={14} /> },
        ],
        image: '/assets/machinery/machine-5.webp',
        fallback:
          'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
      },
      {
        id: 'jet-cleaning-machine',
        name: 'Jet Cleaning Machine',
        category: 'SURFACE CLEANING',
        description:
          'High-pressure water jet system for deep cleaning stains, grime, oil spills, bird droppings, footpaths, signage, and public assets.',
        specs: [
          { label: 'ACTION', value: 'Deep Cleaning', icon: <Zap size={14} /> },
          { label: 'USE', value: 'Public Assets', icon: <Shield size={14} /> },
          { label: 'BRAND', value: 'Kärcher', icon: <BadgeCheck size={14} /> },
        ],
        image: '/assets/machinery/machine-6.webp',
        fallback:
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 'sdox-oxygen-system',
        name: 'SDOX Oxygen System',
        category: 'WATER REMEDIATION',
        description:
          'Supersaturated dissolved oxygen technology for polluted water treatment, odour control, biological remediation, and lake or reservoir restoration.',
        specs: [
          { label: 'OXYGEN', value: '350 mg/l', icon: <Droplets size={14} /> },
          { label: 'CONTROL', value: 'Odour Control', icon: <Shield size={14} /> },
          { label: 'USE', value: 'River Cleanup', icon: <Waves size={14} /> },
        ],
        image: '/assets/machinery/sdox-oxygen-system.png',
        fallback:
          'https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=2070&auto=format&fit=crop',
      },
      {
        id: 'legacy-waste-disposal',
        name: 'Legacy Waste Disposal',
        category: 'WASTE REMEDIATION',
        description:
          'Scientific legacy waste processing using bioremediation and bio-mining to recover soil, recyclables, and reclaim impacted land areas.',
        specs: [
          { label: 'PROCESS', value: 'Bio-Mining', icon: <Settings size={14} /> },
          { label: 'SITE', value: 'Ujjain', icon: <MapPin size={14} /> },
          { label: 'OUTPUT', value: 'Land Recovery', icon: <Recycle size={14} /> },
        ],
        image: '/assets/machinery/machine-8.webp',
        fallback:
          'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
      },
      {
        id: 'door-collection-vehicle',
        name: 'Door Collection Vehicle',
        category: 'WASTE COLLECTION',
        description:
          'Door-to-door wet and dry waste collection system supporting source segregation, safe transport, community participation, and sustainable disposal.',
        specs: [
          { label: 'WASTE', value: 'Wet/Dry', icon: <Trash2 size={14} /> },
          { label: 'COVERAGE', value: 'Door-to-Door', icon: <Truck size={14} /> },
          { label: 'USE', value: 'Source Segregation', icon: <Recycle size={14} /> },
        ],
        image: '/assets/machinery/machine-9.webp',
        fallback:
          'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
      },
    ],
  },
};