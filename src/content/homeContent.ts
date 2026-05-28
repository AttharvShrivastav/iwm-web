export type HeroContent = {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  image: {
    src: string;
    alt: string;
    fallbackSrc: string;
  };
};

export const homeHeroFallback: HeroContent = {
  eyebrow: '+ Home',
  headline: 'Built on global standards || Driven by local impact',
  description:
    'We Understand how a clean living affects living in a city which is moving faster than ever',
  ctaLabel: 'Contact Us',
  ctaLink: '/contact',
  image: {
    src: '/assets/heroes/home-hero.webp',
    alt: 'IWM Truck Fleet',
    fallbackSrc:
      'https://images.unsplash.com/photo-1586864387917-f53bc464e81c?q=80&w=2070&auto=format&fit=crop',
  },
};

import { Plug, Bridge, Handshake } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

export type AboutFeatureContent = {
  icon: Icon;
  title: string;
  description: string;
};

export type AboutContent = {
  sectionLabel: string;
  mainText: string;
  highlightText: string;
  features: AboutFeatureContent[];
  ctaLabel: string;
};

export const homeAboutFallback: AboutContent = {
  sectionLabel: 'GET TO KNOW US',
  mainText:
    'We build and operate large-scale waste management systems that make cities cleaner, more efficient, ',
  highlightText:
    'and environmentally sustainable through structured execution, modern infrastructure, and a deeply human approach to sanitation.',
  features: [
    {
      icon: Plug,
      title: 'Integrated Operations',
      description:
        'Seamlessly connecting collection, transportation, and processing workflows to ensure maximum resource recovery and sustainable, long-term impact',
    },
    {
      icon: Bridge,
      title: 'Infrastructure & Technology',
      description:
        'Deployment of advanced mechanized systems, smart fleet routing, and high-capacity processing facilities engineered for maximum efficiency and scalability.',
    },
    {
      icon: Handshake,
      title: 'Municipal Partnerships',
      description:
        'Trusted execution partner for municipal corporations and public institutions, delivering reliable, end-to-end sanitation solutions at a city-wide scale.',
    },
  ],
  ctaLabel: 'KNOW MORE',
};

export type ImpactCardContent = {
  number: string;
  text: string;
  image: string;
};

export type ImpactContent = {
  sectionLabel: string;
  heading: string;
  cards: ImpactCardContent[];
};

export const homeImpactFallback: ImpactContent = {
  sectionLabel: 'OUR IMPACT',
  heading: 'The Numbers || Behind Our Impact',
  cards: [
    {
      number: '150+',
      text: 'Highly specialized machines cleaning cities across the nation everyday',
      image: '/assets/home/impact/impact-1.png',
    },
    {
      number: '35+',
      text: 'Projects delivering excellence in every corner',
      image: '/assets/home/impact/impact-2.png',
    },
    {
      number: '15M',
      text: 'Lives touched through our sustainable infrastructure initiatives',
      image: '/assets/home/impact/impact-3.png',
    },
  ],
};

export type HomeAnimatedTextContent = {
  label: string;
  mainText: string;
  buttonLabel: string;
  buttonLink: string;
};

export const homeAnimatedTextFallback: HomeAnimatedTextContent = {
  label: 'ABOUT US',
  mainText:
    'Our foundation is built on a singular drive: to fundamentally elevate the standards of environmental infrastructure in our country.',
  buttonLabel: 'ABOUT',
  buttonLink: '/about',
};

export type IndustryClientContent = {
  name: string;
  logo: string;
  fallbackLogo: string;
};

export type IndustryItemContent = {
  id: string;
  name: string;
  image: string;
  fallbackImage: string;
  clients: IndustryClientContent[];
};

export type IndustriesContent = {
  sectionLabel: string;
  heading: string;
  prevLabel: string;
  nextLabel: string;
  pageLabel: string;
  items: IndustryItemContent[];
};


export const homeIndustriesFallback: IndustriesContent = {
  sectionLabel: 'WHO WE WORK WITH',
  heading: 'Industries we serve',
  prevLabel: 'PREV',
  nextLabel: 'NEXT',
  pageLabel: 'PAGE',
  items: [
    {
    id: 'municipal',
    name: 'Municipal Corporations',
    image: '/assets/home/industries/images/industry-municipal.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    clients: [
      { name: 'Indore Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-1.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Dewas Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-2.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Ujjain Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-3.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Ratlam Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-4.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Satna Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-5.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Greater Chennai Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-6.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Jabalpur Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-7.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Tirupati Smart City', logo: '/assets/home/industries/logos/industry-municipal-logo-8.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Jabalpur Smart City', logo: '/assets/home/industries/logos/industry-municipal-logo-9.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Pithampur (MPIDC)', logo: '/assets/home/industries/logos/industry-municipal-logo-10.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Surat Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-11.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Gwalior Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-12.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Mandsaur Nagar Palika', logo: '/assets/home/industries/logos/industry-municipal-logo-13.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
      { name: 'Rewa Municipal Corporation', logo: '/assets/home/industries/logos/industry-municipal-logo-18.webp', fallbackLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Seal_of_Madhya_Pradesh.svg/1200px-Seal_of_Madhya_Pradesh.svg.png' },
    ]
  },
  {
    id: 'authority',
    name: 'Government Authority',
    image: '/assets/home/industries/images/industry-authority.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    clients: [
      { name: 'Maa Chamunda Shaskiya Devsthan Praband Samiti', logo: '/assets/home/industries/logos/industry-authority-logo-1.webp', fallbackLogo: 'https://picsum.photos/seed/gov1/200/200' },
      { name: 'Pollution Control Board', logo: '/assets/home/industries/logos/industry-authority-logo-2.webp', fallbackLogo: 'https://picsum.photos/seed/gov2/200/200' },
      { name: 'NHAI', logo: '/assets/home/industries/logos/industry-authority-logo-3.webp', fallbackLogo: 'https://picsum.photos/seed/gov3/200/200' },
      { name: 'IIT', logo: '/assets/home/industries/logos/industry-authority-logo-4.webp', fallbackLogo: 'https://picsum.photos/seed/gov4/200/200' },
      { name: 'IIM', logo: '/assets/home/industries/logos/industry-authority-logo-5.webp', fallbackLogo: 'https://picsum.photos/seed/gov5/200/200' },
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Firms',
    image: '/assets/home/industries/images/industry-corporate.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    clients: [
      { name: 'Phoenix Mall', logo: '/assets/home/industries/logos/industry-corporate-logo-1.webp', fallbackLogo: 'https://picsum.photos/seed/corp1/200/200' },
      { name: 'Blue Neck', logo: '/assets/home/industries/logos/industry-corporate-logo-2.svg', fallbackLogo: 'https://picsum.photos/seed/corp2/200/200' },
      { name: 'Cooper Standard', logo: '/assets/home/industries/logos/industry-corporate-logo-3.webp', fallbackLogo: 'https://picsum.photos/seed/corp3/200/200' },
      { name: 'GKN Driveline', logo: '/assets/home/industries/logos/industry-corporate-logo-4.webp', fallbackLogo: 'https://picsum.photos/seed/corp4/200/200' },
      { name: 'Hitachi', logo: '/assets/home/industries/logos/industry-corporate-logo-5.webp', fallbackLogo: 'https://picsum.photos/seed/corp5/200/200' },
      { name: 'Trivitron', logo: '/assets/home/industries/logos/industry-corporate-logo-6.webp', fallbackLogo: 'https://picsum.photos/seed/corp6/200/200' },
      { name: 'Talent Maximus', logo: '/assets/home/industries/logos/industry-corporate-logo-8.webp', fallbackLogo: 'https://picsum.photos/seed/corp8/200/200' },
      { name: 'RKFL', logo: '/assets/home/industries/logos/industry-corporate-logo-9.svg', fallbackLogo: 'https://picsum.photos/seed/corp9/200/200' },
      { name: 'Diesel', logo: '/assets/home/industries/logos/industry-corporate-logo-12.webp', fallbackLogo: 'https://picsum.photos/seed/corp12/200/200' },
      { name: 'Zeel Rainwear', logo: '/assets/home/industries/logos/industry-corporate-logo-13.webp', fallbackLogo: 'https://picsum.photos/seed/corp13/200/200' },
    ]
  },
  {
    id: 'events',
    name: 'Events',
    image: '/assets/home/industries/images/industry-events.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    clients: [
      { name: 'MPCA', logo: '/assets/home/industries/logos/industry-events-logo-1.webp', fallbackLogo: 'https://picsum.photos/seed/event1/200/200' },
      { name: 'TNCA', logo: '/assets/home/industries/logos/industry-events-logo-2.webp', fallbackLogo: 'https://picsum.photos/seed/event2/200/200' },
    ]
  }
  ],
};

export type DiscoverServiceItemContent = {
  name: string;
  img: string;
  fallback: string;

  modalTitle?: string;
  modalEyebrow?: string;
  modalDescription?: string;
  modalDetails?: string[];
};

export type DiscoverServicesContent = {
  introLine1: string;
  introLine2: string;
  headerLabel: string;
  items: DiscoverServiceItemContent[];
};

export const homeDiscoverServicesFallback: DiscoverServicesContent = {
  introLine1: 'DISCOVER',
  introLine2: 'Services',
  headerLabel: 'Discover',
  items: [
    {
      name: 'Integrated Facility Management',
      img: '/assets/home/services/service-1.webp',
      fallback:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
      modalTitle: 'Integrated Facility Management',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'Our Integrated Facility Management provides comprehensive, one-stop solutions tailored for large-scale operations. We meticulously manage every aspect of your infrastructure, covering housekeeping, deep cleaning, security, plumbing, gardening, and specialized technical services. By streamlining these critical functions into a seamless, unified operation, we ensure efficient and uninterrupted facility performance. Our approach guarantees that your physical assets are maintained to the highest standards, allowing you to focus entirely on your core municipal or corporate objectives.',
      modalDetails: [
        'Unified operational management',
        'Specialized technical services',
        'Comprehensive housekeeping',
        'Infrastructure security',
        'Asset lifecycle optimization',
      ],
    },
    {
      name: 'Mechanized Road Sweeping',
      img: '/assets/home/services/service-2.webp',
      fallback:
        'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
      modalTitle: 'Mechanized Road Sweeping',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'We deploy advanced automated sweeping technology, utilizing highly specialized machines to efficiently remove dust, debris, and litter from city road surfaces. This modern approach ensures high-performance cleaning while strictly maintaining environmental and safety standards. By continually evaluating high-end European machinery and electric sweeper innovations, we aim to bring the most sophisticated, efficient, and emission-conscious street-cleaning infrastructure to Indian municipalities, ensuring our urban centers remain pristine and scalable.',
      modalDetails: [
        'High-end European machinery',
        'PM10/PM2.5 dust suppression',
        'Electric sweeper innovations',
        'Night-time silent operations',
        'Safety-first operational protocols',
      ],
    },
    {
      name: 'Manual Road Sweeping',
      img: '/assets/home/services/service-3.webp',
      fallback:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
      modalTitle: 'Manual Road Sweeping',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'Our manual road sweeping services rely on traditional street cleaning carried out by extensively trained workers to meticulously remove dust, litter, and waste, ensuring clean and hygienic roads. We approach this essential service through the lens of radical dignity, ensuring our frontline sanitation workers are equipped, respected, and empowered. By fostering a sense of pride and providing exceptional operational support, our teams deliver unparalleled attention to detail, creating cleaner, healthier communities across the nation.',
      modalDetails: [
        'Extensively trained workforce',
        'Radical dignity approach',
        'Meticulous litter removal',
        'Workforce empowerment',
        'Community health focus',
      ],
    },
    {
      name: 'High Pressure Jet Cleaning',
      img: '/assets/home/services/service-4.webp',
      fallback:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
      modalTitle: 'High Pressure Jet Cleaning',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'Experience powerful, high-performance cleaning with our advanced jet technology systems. Designed for heavy industrial and municipal applications, this mechanized solution effortlessly blasts away deeply ingrained dirt, heavy grease, and tough stains from various urban surfaces. By utilizing calibrated high-pressure water systems, we consistently deliver fast, deep, and spotless results every single time. This highly efficient service rapidly restores infrastructure aesthetics while minimizing chemical use and operational downtime in fast-moving environments.',
      modalDetails: [
        'Calibrated high-pressure systems',
        'Industrial-grade grit removal',
        'Chemical-minimized cleaning',
        'Rapid surface restoration',
        'Versatile application range',
      ],
    },
    {
      name: 'Door to Door Collection',
      img: '/assets/home/services/service-5.webp',
      fallback:
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
      modalTitle: 'Door to Door Collection',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'Our highly efficient door-to-door collection systems ensure the timely, reliable pickup of waste directly from residential households, promoting unparalleled cleanliness and convenience. By establishing structured and heavily monitored collection routes, we actively support better, more systematic waste management practices at the source. This foundational service is critical for preventing urban overflow, directly contributing to a healthier, vastly more sustainable community and serving as the crucial first step in our integrated resource recovery workflows.',
      modalDetails: [
        'Structured collection routes',
        'Real-time monitoring systems',
        'Source segregation awareness',
        'Resource recovery foundation',
        'Reliable pickup schedules',
      ],
    },
    {
      name: 'Maintenance of Landscapes and Gardens',
      img: '/assets/home/services/service-6.webp',
      fallback:
        'https://images.unsplash.com/photo-1591193516411-ac56d827aa2d?q=80&w=2070&auto=format&fit=crop',
      modalTitle: 'Maintenance of Landscapes and Gardens',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'We provide expert maintenance of landscapes and gardens, executing regular upkeep of plants, sprawling lawns, and essential green spaces. Our dedicated horticultural teams ensure the healthy, sustained growth and pristine cleanliness of your environments, guaranteeing an attractive, professional appearance year-round. We understand that well-maintained greenery is crucial for the aesthetic and environmental health of any corporate or municipal campus, and we apply rigorous standards to preserve the vitality and beauty of these natural assets.',
      modalDetails: [
        'Professional horticultural teams',
        'Pristine lawn maintenance',
        'Year-round greenery care',
        'Seasonal plant rotations',
        'Sustainable irrigation practices',
      ],
    },
    {
      name: 'Bio Remediation - Legacy Waste',
      img: '/assets/home/services/service-7.webp',
      fallback:
        'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
      modalTitle: 'Bio Remediation - Legacy Waste',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'Our bioremediation of legacy waste tackles massive environmental challenges by utilizing natural microorganisms to actively break down and stabilize decades of old waste in overloaded landfills and dumpsites. This highly effective, eco-friendly process significantly reduces ground and air pollution, successfully recovers valuable urban land for future development, and heavily minimizes severe environmental and public health risks. We transform hazardous liabilities into neutralized, usable spaces, driving long-term sustainability for rapidly expanding cities.',
      modalDetails: [
        'Active biological stabilization',
        'Urban land recovery',
        'Significant pollution reduction',
        'Scientific site management',
        'Risk mitigation protocols',
      ],
    },
    {
      name: 'Water Rejuvenation',
      img: '/assets/home/services/service-8.webp',
      fallback:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
      modalTitle: 'Water Rejuvenation',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'Our water rejuvenation services utilize an advanced oxygen dissolution system that absolutely maximizes efficiency in large-scale water and wastewater treatment facilities. This cutting-edge technology significantly enhances natural biological breakdown processes, effectively controls hazardous odor and infrastructure corrosion, and heavily supports municipal environmental remediation. Through high-performance oxygen delivery, we restore dead water bodies and optimize processing plants, ensuring vital water resources are safely managed and ecologically revitalized for future generations.',
      modalDetails: [
        'High-performance oxygen dissolution',
        'Biological breakdown enhancement',
        'Odor and corrosion control',
        'Environmental remediation support',
        'Water body ecological restoration',
      ],
    },
    {
      name: 'Sewage System Inspection & Maintenance',
      img: '/assets/home/services/service-9.webp',
      fallback:
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
      modalTitle: 'Sewage System Inspection & Maintenance',
      modalEyebrow: 'Service Specialization',
      modalDescription:
        'We use advanced technology to thoroughly inspect underground sewage pipelines, accurately detecting hidden cracks, severe silt buildup, and critical blockages. By pioneering specialized robotics and AI-driven fluid analytics for municipal infrastructure, we accurately identify precise problem areas. This allows us to provide targeted, minimally invasive solutions that drastically improve flow efficiency, significantly reduce ongoing maintenance costs, and ensure the long-term durability and structural integrity of complex urban sewer systems.',
      modalDetails: [
        'Advanced robotic inspection',
        'AI-driven fluid analytics',
        'Minimally invasive solutions',
        'Flow efficiency optimization',
        'Structural integrity monitoring',
      ],
    },
  ],
};


export type HomePageContent = {
  hero: HeroContent;
  about: AboutContent;
  impact: ImpactContent;
  animatedText: HomeAnimatedTextContent;
  discoverServices: DiscoverServicesContent;
  industries: IndustriesContent;
};

export const homePageFallback: HomePageContent = {
  hero: homeHeroFallback,
  about: homeAboutFallback,
  impact: homeImpactFallback,
  animatedText: homeAnimatedTextFallback,
  discoverServices: homeDiscoverServicesFallback,
  industries: homeIndustriesFallback,
};