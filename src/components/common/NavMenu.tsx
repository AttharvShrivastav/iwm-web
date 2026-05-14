import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Logo } from './Logo';
import { Copy } from './Copy';
import { MenuButton } from './MenuButton';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PEOPLE', href: '/people' },
  { label: 'CONTACT', href: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Whatsapp', href: '#' },
  { label: 'Linkedin', href: '#' },
  { label: 'X', href: '#' },
];

const address = [
  '663, East, Ring Rd,',
  'Near Bombay Hospital,',
  'Indore,',
  'Madhya Pradesh 452018',
];

export const NavMenu: React.FC<NavMenuProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useGSAP(() => {
    if (!isVisible) return;

    if (isOpen) {
      const tl = gsap.timeline();
      
      // Reset panels to be above the screen
      gsap.set(panelsRef.current, { y: '-100%' });
      gsap.set(contentRef.current, { opacity: 0 });

      // Panel reveal sequence: Top to Bottom
      tl.to(panelsRef.current, {
        y: '0%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.inOut',
      })
      .to(contentRef.current, {
        opacity: 1,
        duration: 0.4,
      }, '-=0.6');
    } else {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false)
      });

      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
      })
      .to(panelsRef.current, {
        y: '-100%',
        duration: 0.8, // Faster
        stagger: 0.05,
        ease: 'expo.inOut',
      }, '-=0.1');
    }
  }, { scope: container, dependencies: [isOpen, isVisible] });

  if (!isVisible) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
    >
      {/* Animated Background Panels - Stacked to show bottom bars */}
      <div 
        ref={(el) => el && (panelsRef.current[0] = el)}
        className="absolute inset-x-0 top-0 bg-[#005696] z-10 h-screen md:h-[85vh]"
      />
      <div 
        ref={(el) => el && (panelsRef.current[1] = el)}
        className="absolute inset-x-0 top-0 bg-[#729fcf] z-20 h-screen md:h-[81vh]"
      />
      <div 
        ref={(el) => el && (panelsRef.current[2] = el)}
        className="absolute inset-x-0 top-0 bg-[#f8f7f2] z-30 h-screen md:h-[77vh]"
      />

      {/* Content Layer - Constrained to the white panel height (77vh) */}
      <div 
        ref={contentRef}
        className="relative z-40 h-screen md:h-[77vh] w-full flex flex-col p-8 md:px-16 md:py-12 md:pb-16 text-[#005696] pointer-events-auto"
      >
        {/* Top Bar */}
        <div className="flex items-center w-full relative">
          <div className="flex-1 flex justify-start">
            <Logo className="scale-100 md:scale-110" />
          </div>

          <div className="flex-1 flex justify-end md:justify-center items-center">
            <MenuButton 
              isOpen={isOpen} 
              onClick={onClose} 
              className="text-[#005696]"
            />
          </div>
          
          <div className="hidden md:block flex-1"></div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-8 items-center mt-6 md:mt-8 overflow-hidden">
          {/* Left Column: Socials & Legal */}
          <div className="flex flex-row md:flex-col gap-6 md:gap-12 h-full justify-between md:justify-center items-end md:items-start order-2 md:order-1">
            <div className="flex flex-col gap-1">
              {socialLinks.map((link, i) => (
                <Copy key={link.label} animateOnScroll={false} delay={1.2 + i * 0.05}>
                  <a 
                    href={link.href} 
                    className="text-[13px] md:text-[14px] font-medium hover:text-[#729fcf] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </Copy>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[10px] md:text-[11px] font-bold opacity-40 uppercase tracking-wider mb-1">Address</p>
              {address.map((line, i) => (
                <Copy key={line} animateOnScroll={false} delay={1.5 + i * 0.05}>
                  <p className="text-[10px] md:text-[11px] font-medium opacity-80 leading-tight">
                    {line}
                  </p>
                </Copy>
              ))}
            </div>
          </div>

          {/* Center Column: Main Links */}
          <div className="flex flex-col items-center md:items-start gap-0.5 md:gap-1 order-1 md:order-2">
            {mainLinks.map((link, i) => (
              <Copy key={link.label} animateOnScroll={false} delay={1 + i * 0.1}>
                <Link 
                  to={link.href} 
                  onClick={onClose}
                  className="text-[24px] md:text-[36px] lg:text-[42px] font-light tracking-tighter leading-[1.1] hover:text-[#729fcf] hover:translate-x-4 transition-all duration-500 ease-out inline-block uppercase"
                >
                  {link.label}
                </Link>
              </Copy>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
