import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  className = '', 
  bgColor = 'bg-white/10', 
  textColor = 'text-white',
  borderColor = 'border-white/20',
  type = 'button',
  ...rest
}) => {

  const btnRef = useRef<HTMLButtonElement>(null);
  const primaryRef = useRef<HTMLSpanElement>(null);
  const secondaryRef = useRef<HTMLSpanElement>(null);

  // Split label into characters manually
  const chars = useMemo(() => label.split(''), [label]);

  const { contextSafe } = useGSAP(() => {
    if (!primaryRef.current || !secondaryRef.current) return;

    const primaryChars = primaryRef.current.querySelectorAll('.char');
    const secondaryChars = secondaryRef.current.querySelectorAll('.char');

    // Default initial state
    gsap.set(primaryChars, { yPercent: 0 });
    gsap.set(secondaryChars, { yPercent: 100 });
  }, { scope: btnRef });

  const handleMouseEnter = contextSafe(() => {
    const primaryChars = primaryRef.current?.querySelectorAll('.char');
    const secondaryChars = secondaryRef.current?.querySelectorAll('.char');

    if (!primaryChars || !secondaryChars) return;

    // Always slide up
    gsap.to(primaryChars, {
      yPercent: -100,
      stagger: 0.02,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    });
    
    // Ensure secondary starts at bottom, then animate to center
    gsap.set(secondaryChars, { yPercent: 100 });
    gsap.to(secondaryChars, {
      yPercent: 0,
      stagger: 0.02,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  });

  const handleMouseLeave = contextSafe(() => {
    const primaryChars = primaryRef.current?.querySelectorAll('.char');
    const secondaryChars = secondaryRef.current?.querySelectorAll('.char');

    if (!primaryChars || !secondaryChars) return;

    // Slide back to original positions
    gsap.to(primaryChars, {
      yPercent: 0,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto'
    });
    
    gsap.to(secondaryChars, {
      yPercent: 100,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto'
    });
  });

  return (
    <button 
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-fit backdrop-blur-md border transition-all duration-500 uppercase font-bold tracking-[0.2em] font-agrandir overflow-hidden ${bgColor} ${textColor} ${borderColor} ${className}`}
      {...rest}
    >
      <span className="relative block overflow-hidden leading-none">
        
        <span ref={primaryRef} className="block pointer-events-none">
          {chars.map((char, i) => (
            <span key={i} className="char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </span>

        <span ref={secondaryRef} className="absolute left-0 top-0 block pointer-events-none">
          {chars.map((char, i) => (
            <span key={i} className="char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </span>

      </span>
    </button>
  );
};