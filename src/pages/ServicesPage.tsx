import React from 'react';
import { PageHero } from '../components/sections/PageHero';
import { ValuesSection } from '../components/sections/ValuesSection';
import { ServiceList } from '../components/sections/ServiceList';
import { MachinerySection } from '../components/sections/MachinerySection';
import { Industries } from '../components/sections/Industries';

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  fullWriteup: string;
  features: string[];
}

export const servicesData: Service[] = [
  {
    id: "integrated-facility",
    title: "Integrated Facility Management",
    description: "Comprehensive one-stop solutions for large-scale operations, from housekeeping to technical maintenance.",
    image: "/assets/home/services/service-1.png",
    fullWriteup: "Our Integrated Facility Management provides comprehensive, one-stop solutions tailored for large-scale operations. We meticulously manage every aspect of your infrastructure, covering housekeeping, deep cleaning, security, plumbing, gardening, and specialized technical services. By streamlining these critical functions into a seamless, unified operation, we ensure efficient and uninterrupted facility performance. Our approach guarantees that your physical assets are maintained to the highest standards, allowing you to focus entirely on your core municipal or corporate objectives.",
    features: [
      "Unified operational management",
      "Specialized technical services",
      "Comprehensive housekeeping",
      "Infrastructure security",
      "Asset lifecycle optimization"
    ]
  },
  {
    id: "mechanized-sweeping",
    title: "Mechanized Road Sweeping",
    description: "Advanced automated sweeping technology for emission-conscious and efficient urban cleaning.",
    image: "/assets/home/services/service-2.png",
    fullWriteup: "We deploy advanced automated sweeping technology, utilizing highly specialized machines to efficiently remove dust, debris, and litter from city road surfaces. This modern approach ensures high-performance cleaning while strictly maintaining environmental and safety standards. By continually evaluating high-end European machinery and electric sweeper innovations, we aim to bring the most sophisticated, efficient, and emission-conscious street-cleaning infrastructure to Indian municipalities, ensuring our urban centers remain pristine and scalable.",
    features: [
      "High-end European machinery",
      "PM10/PM2.5 dust suppression",
      "Electric sweeper innovations",
      "Night-time silent operations",
      "Safety-first operational protocols"
    ]
  },
  {
    id: "manual-sweeping",
    title: "Manual Road Sweeping",
    description: "Precision traditional sweeping delivered with radical dignity and unparalleled attention to detail.",
    image: "/assets/home/services/service-3.png",
    fullWriteup: "Our manual road sweeping services rely on traditional street cleaning carried out by extensively trained workers to meticulously remove dust, litter, and waste, ensuring clean and hygienic roads. We approach this essential service through the lens of radical dignity, ensuring our frontline sanitation workers are equipped, respected, and empowered. By fostering a sense of pride and providing exceptional operational support, our teams deliver unparalleled attention to detail, creating cleaner, healthier communities across the nation.",
    features: [
      "Extensively trained workforce",
      "Radical dignity approach",
      "Meticulous litter removal",
      "Workforce empowerment",
      "Community health focus"
    ]
  },
  {
    id: "jet-cleaning",
    title: "High Pressure Jet Cleaning",
    description: "High-performance jet technology systems for fast, deep, and spotless restoration of urban surfaces.",
    image: "/assets/home/services/service-4.png",
    fullWriteup: "Experience powerful, high-performance cleaning with our advanced jet technology systems. Designed for heavy industrial and municipal applications, this mechanized solution effortlessly blasts away deeply ingrained dirt, heavy grease, and tough stains from various urban surfaces. By utilizing calibrated high-pressure water systems, we consistently deliver fast, deep, and spotless results every single time. This highly efficient service rapidly restores infrastructure aesthetics while minimizing chemical use and operational downtime in fast-moving environments.",
    features: [
      "Calibrated high-pressure systems",
      "Industrial-grade grit removal",
      "Chemical-minimized cleaning",
      "Rapid surface restoration",
      "Versatile application range"
    ]
  },
  {
    id: "door-to-door",
    title: "Door to Door Collection",
    description: "Structured residential waste pickup systems that serve as the foundation for resource recovery.",
    image: "assets/home/services/service-5.png",
    fullWriteup: "Our highly efficient door-to-door collection systems ensure the timely, reliable pickup of waste directly from residential households, promoting unparalleled cleanliness and convenience. By establishing structured and heavily monitored collection routes, we actively support better, more systematic waste management practices at the source. This foundational service is critical for preventing urban overflow, directly contributing to a healthier, vastly more sustainable community and serving as the crucial first step in our integrated resource recovery workflows.",
    features: [
      "Structured collection routes",
      "Real-time monitoring systems",
      "Source segregation awareness",
      "Resource recovery foundation",
      "Reliable pickup schedules"
    ]
  },
  {
    id: "landscape-maintenance",
    title: "Maintenance of Landscapes and Gardens",
    description: "Expert horticultural upkeep of sprawling lawns and vital green spaces for corporate and municipal assets.",
    image: "assets/home/services/service-6.png",
    fullWriteup: "We provide expert maintenance of landscapes and gardens, executing regular upkeep of plants, sprawling lawns, and essential green spaces. Our dedicated horticultural teams ensure the healthy, sustained growth and pristine cleanliness of your environments, guaranteeing an attractive, professional appearance year-round. We understand that well-maintained greenery is crucial for the aesthetic and environmental health of any corporate or municipal campus, and we apply rigorous standards to preserve the vitality and beauty of these natural assets.",
    features: [
      "Professional horticultural teams",
      "Pristine lawn maintenance",
      "Year-round greenery care",
      "Seasonal plant rotations",
      "Sustainable irrigation practices"
    ]
  },
  {
    id: "bio-remediation",
    title: "Bio Remediation - Legacy Waste",
    description: "Eco-friendly stabilization of landfill sites using natural microorganisms to recover urban land.",
    image: "assets/home/services/service-7.png",
    fullWriteup: "Our bioremediation of legacy waste tackles massive environmental challenges by utilizing natural microorganisms to actively break down and stabilize decades of old waste in overloaded landfills and dumpsites. This highly effective, eco-friendly process significantly reduces ground and air pollution, successfully recovers valuable urban land for future development, and heavily minimizes severe environmental and public health risks. We transform hazardous liabilities into neutralized, usable spaces, driving long-term sustainability for rapidly expanding cities.",
    features: [
      "Active biological stabilization",
      "Urban land recovery",
      "Significant pollution reduction",
      "Scientific site management",
      "Risk mitigation protocols"
    ]
  },
  {
    id: "water-rejuvenation",
    title: "Water Rejuvenation",
    description: "Advanced oxygen dissolution technology to revitalize dead water bodies and optimize treatment.",
    image: "assets/home/services/service-8.png",
    fullWriteup: "Our water rejuvenation services utilize an advanced oxygen dissolution system that absolutely maximizes efficiency in large-scale water and wastewater treatment facilities. This cutting-edge technology significantly enhances natural biological breakdown processes, effectively controls hazardous odor and infrastructure corrosion, and heavily supports municipal environmental remediation. Through high-performance oxygen delivery, we restore dead water bodies and optimize processing plants, ensuring vital water resources are safely managed and ecologically revitalized for future generations.",
    features: [
      "High-performance oxygen dissolution",
      "Biological breakdown enhancement",
      "Odor and corrosion control",
      "Environmental remediation support",
      "Water body ecological restoration"
    ]
  },
  {
    id: "sewage-inspection",
    title: "Sewage System Inspection & Maintenance",
    description: "Robotics and AI-driven analytics for precision detection and maintenance of urban sewer systems.",
    image: "assets/home/services/service-9.png",
    fullWriteup: "We use advanced technology to thoroughly inspect underground sewage pipelines, accurately detecting hidden cracks, severe silt buildup, and critical blockages. By pioneering specialized robotics and AI-driven fluid analytics for municipal infrastructure, we accurately identify precise problem areas. This allows us to provide targeted, minimally invasive solutions that drastically improve flow efficiency, significantly reduce ongoing maintenance costs, and ensure the long-term durability and structural integrity of complex urban sewer systems.",
    features: [
      "Advanced robotic inspection",
      "AI-driven fluid analytics",
      "Minimally invasive solutions",
      "Flow efficiency optimization",
      "Structural integrity monitoring"
    ]
  }
];

const serviceValues = [
  {
    description: "We are action-oriented and hands-on. Our confidence is based on visible results — not promises. Management on the ground, every day."
  },
  {
    description: "We embrace new technologies and new ways of working not for novelty, but because it is the difference between leading and being left behind."
  },
  {
    description: "The goodwill this company has earned rests on the shoulders of those who work day in and day out. We empower, stand by, and honour every Sipahi."
  }
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero 
        label="+ SERVICES"
        title="Waste Management. Delivered at Scale."
        subtitle="An integrated suite of collection, processing, sweeping and recovery solutions driving efficiency, compliance, and sustainability at a city-wide scale."
        image="/assets/heroes/services-hero.png"
        topRightLink={{
          label: "READ OUR STORY",
          href: "/about"
        }}
      />

      <ServiceList />
      <MachinerySection />
      <Industries />
    </div>
  );
};