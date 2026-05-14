import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { MenuButton } from './MenuButton';

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 z-40 flex w-full items-center justify-between px-6 md:px-16 py-6 mix-blend-difference transition-transform duration-500 ${
        (isVisible || isMenuOpen) ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex-1 flex justify-start">
        <Logo />
      </div>
      
      <div className="flex-1 flex justify-end md:justify-center items-center">
        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </div>

      <div className="hidden md:block flex-1 text-right">
        <a 
          href="#story" 
          className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] uppercase hover:text-[#729fcf] transition-colors duration-300"
        >
          Read Our Story
        </a>
      </div>
    </nav>
  );
};
