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
    id: "material-recovery",
    title: "Material Recovery Facility",
    description: "Advanced recovery facilities designed to process and segregate recyclable materials from municipal waste streams.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
    fullWriteup: "Our Material Recovery Facilities (MRF) represent the pinnacle of waste segregation technology. We utilize a combination of mechanized sorting systems and manual expertise to ensure the highest possible recovery rates for plastics, paper, metals, and glass. By diverting these materials from landfills, we directly contribute to a circular economy and reduce the environmental footprint of municipal systems.",
    features: [
      "Mechanized sorting conveyors",
      "Optical sorting technology",
      "Magnetic and eddy current separators",
      "Manual quality control checkpoints",
      "Baling and logistics management"
    ]
  },
  {
    id: "mechanized-sweeping",
    title: "Mechanized Road Sweeping",
    description: "High-efficiency mechanized sweeping operations for urban roads, ensuring dust-free and clean city thoroughfares.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    fullWriteup: "Sipahi's mechanized road sweeping operations are engineered for the challenges of dense urban environments. Our fleet of advanced vacuum sweepers operates with precision, removing fine dust and debris that manual sweeping often misses. This not only improves city aesthetics but also significantly enhances air quality by reducing PM10 and PM2.5 particles.",
    features: [
      "Advanced vacuum suction technology",
      "Dual-broom system for edge-to-edge cleaning",
      "Dust suppression water spray systems",
      "GPS-tracked operation monitoring",
      "Low-noise nighttime operations"
    ]
  },
  {
    id: "jet-cleaning",
    title: "High Pressure Jet Cleaning",
    description: "Deep cleaning services for urban infrastructure, monuments, and public spaces using specialized high-pressure equipment.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    fullWriteup: "Restoring the original glory of urban infrastructure requires more than basic cleaning. Our high-pressure jet cleaning service uses specialized machinery to remove stubborn grime, pollutants, and organic growth from public spaces, monuments, and pavements. We use eco-friendly additives and filtered water to ensure thorough cleaning without damaging surfaces.",
    features: [
      "Variable pressure systems (up to 350 bar)",
      "Hot/Cold water cleaning options",
      "Surface-specific nozzle technology",
      "Water recycling capabilities",
      "Mobile self-contained units"
    ]
  },
  {
    id: "waste-collection",
    title: "Waste Collection & Transport",
    description: "Efficient and reliable waste collection systems designed for urban environments, ensuring timely removal.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
    fullWriteup: "Reliable waste collection is the backbone of urban sanitation. Sipahi operates a disciplined fleet of collection vehicles that follow strict, optimized routes to ensure no household or commercial point is left behind. Our transport systems are sealed and monitored to prevent secondary pollution during transit to processing facilities.",
    features: [
      "Door-to-door collection models",
      "Segregated waste compartments",
      "Compact compactor vehicles",
      "Real-time route optimization",
      "Digital attendance and logging"
    ]
  },
  {
    id: "landfill-management",
    title: "Landfill Management",
    description: "Scientific management of landfill sites to minimize environmental impact and maximize space utilization.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    fullWriteup: "We move beyond the traditional dump-and-cover approach. Our scientific landfill management incorporates advanced compaction techniques to maximize volume efficiency, while leachate and gas management systems protect the surrounding soil and atmosphere. We also focus on the eventual remediation and capping of sites for future public use.",
    features: [
      "High-density compaction",
      "Leachate collection and treatment",
      "Methane gas monitoring",
      "Erosion and sediment control",
      "Site remediation planning"
    ]
  },
  {
    id: "composting",
    title: "Composting & Organic Waste",
    description: "Transforming organic waste into high-quality compost through mechanized processes.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    fullWriteup: "Organic waste shouldn't be a burden—it's a resource. Our composting facilities use aerobic decomposition processes to turn organic municipal waste into nutrient-rich soil conditioners. By processing organics separately, we reduce greenhouse gas emissions and provide high-quality compost for landscaping and agriculture.",
    features: [
      "Aerobic windrow composting",
      "Mechanized screening and turning",
      "Temperature and moisture monitoring",
      "Odor control biofilters",
      "Final product testing and bagging"
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
        image="/src/assets/heroes/services-hero.png"
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
