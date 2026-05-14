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

  // Detect vertical entry direction
  const getDirection = (e: React.MouseEvent) => {
    if (!btnRef.current) return 'top';
    const rect = btnRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;

    return y < rect.height / 2 ? 'top' : 'bottom';
  };

  useGSAP(() => {
    if (!primaryRef.current || !secondaryRef.current) return;

    const primaryChars = primaryRef.current.querySelectorAll('.char');
    const secondaryChars = secondaryRef.current.querySelectorAll('.char');

    // Default initial state
    gsap.set(primaryChars, { y: '0%' });
    gsap.set(secondaryChars, { y: '100%' });
  }, { scope: btnRef });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const dir = getDirection(e);
    const primaryChars = primaryRef.current?.querySelectorAll('.char');
    const secondaryChars = secondaryRef.current?.querySelectorAll('.char');

    if (!primaryChars || !secondaryChars) return;

    if (dir === 'top') {
      // Coming from top: primary goes up, secondary comes from bottom
      gsap.set(secondaryChars, { y: '100%' });
      gsap.to(primaryChars, {
        y: '-100%',
        stagger: 0.02,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true
      });
      gsap.to(secondaryChars, {
        y: '0%',
        stagger: 0.02,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true
      });
    } else {
      // Coming from bottom: primary goes down, secondary comes from top
      gsap.set(secondaryChars, { y: '-100%' });
      gsap.to(primaryChars, {
        y: '100%',
        stagger: 0.02,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true
      });
      gsap.to(secondaryChars, {
        y: '0%',
        stagger: 0.02,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const dir = getDirection(e);
    const primaryChars = primaryRef.current?.querySelectorAll('.char');
    const secondaryChars = secondaryRef.current?.querySelectorAll('.char');

    if (!primaryChars || !secondaryChars) return;

    if (dir === 'top') {
      // Leaving from top: primary comes back from top, secondary goes to bottom
      gsap.to(primaryChars, {
        y: '0%',
        stagger: 0.02,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: true
      });
      gsap.to(secondaryChars, {
        y: '100%',
        stagger: 0.02,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: true
      });
    } else {
      // Leaving from bottom: primary comes back from bottom, secondary goes to top
      gsap.to(primaryChars, {
        y: '0%',
        stagger: 0.02,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: true
      });
      gsap.to(secondaryChars, {
        y: '-100%',
        stagger: 0.02,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: true
      });
    }
  };

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
        
        <span ref={primaryRef} className="block">
          {chars.map((char, i) => (
            <span key={i} className="char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </span>

        <span ref={secondaryRef} className="absolute left-0 top-0 block">
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
