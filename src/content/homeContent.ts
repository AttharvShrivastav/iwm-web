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
  fallback: string;
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
      fallback:
        'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
    },
    {
      number: '35+',
      text: 'Projects delivering excellence in every corner',
      image: '/assets/home/impact/impact-2.png',
      fallback:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2048&auto=format&fit=crop',
    },
    {
      number: '15M',
      text: 'Lives touched through our sustainable infrastructure initiatives',
      image: '/assets/home/impact/impact-3.png',
      fallback:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
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
};

export type DiscoverServicesContent = {
  introLine1: string;
  introLine2: string;
  headerLabel: string;
  cursorLabel: string;
  items: DiscoverServiceItemContent[];
};

export const homeDiscoverServicesFallback: DiscoverServicesContent = {
  introLine1: 'DISCOVER',
  introLine2: 'Services',
  headerLabel: 'Discover',
  cursorLabel: 'Scroll',
  items: [
    {
      name: 'Integrated Facility Management',
      img: 'assets/home/services/service-1.webp',
      fallback:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Mechanized Road Sweeping',
      img: 'assets/home/services/service-2.webp',
      fallback:
        'https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Manual Road Sweeping',
      img: 'assets/home/services/service-3.webp',
      fallback:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'High Pressure Jet Cleaning',
      img: 'assets/home/services/service-4.webp',
      fallback:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Door to Door Collection',
      img: 'assets/home/services/service-5.webp',
      fallback:
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
    },
    {
      name: 'Maintenance of Landscapes',
      img: 'assets/home/services/service-6.webp',
      fallback:
        'https://images.unsplash.com/photo-1591193516411-ac56d827aa2d?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Bio Remidation',
      img: 'assets/home/services/service-7.webp',
      fallback:
        'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop',
    },
    {
      name: 'Water Rejuvenation',
      img: 'assets/home/services/service-8.webp',
      fallback:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Sewage System Inspection',
      img: 'assets/home/services/service-9.webp',
      fallback:
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop',
    },
  ],
};