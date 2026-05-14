import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  className?: string;
  disableAnimation?: boolean;
}

/**
 * A reusable component that implements a smooth text reveal animation.
 * Mimics the behavior of GSAP SplitText "lines" reveal.
 */
export const Copy: React.FC<CopyProps> = ({ 
  children, 
  animateOnScroll = true, 
  delay = 0,
  className,
  disableAnimation = false
}) => {
  const containerRef = useRef<HTMLElement | HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || disableAnimation) return;

    const element = containerRef.current;
    
    // The Indentation Edge Case
    const style = window.getComputedStyle(element);
    const textIndent = style.textIndent;
    if (textIndent !== '0px' && textIndent !== 'normal') {
      const firstLine = element.querySelector('.line-inner') as HTMLElement;
      if (firstLine) {
        firstLine.style.paddingLeft = textIndent;
      }
      element.style.textIndent = '0px';
    }

    const lines = element.querySelectorAll('.line-inner');
    
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      // The Animation: y: 100% to y: 0%
      gsap.fromTo(lines, 
        { y: '100%' },
        { 
          y: '0%', 
          duration: isMobile ? 0.6 : 1, 
          stagger: isMobile ? 0.05 : 0.1, 
          delay, 
          ease: 'power4.out',
          scrollTrigger: animateOnScroll ? {
            trigger: element,
            start: isMobile ? 'top 90%' : 'top 75%',
            once: true,
          } : null
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [children] });

  // DOM Structure: React.Children.count logic
  const childrenCount = React.Children.count(children);

  if (childrenCount === 1) {
    const child = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(child, {
      ref: containerRef,
      className: `${child.props.className || ''} ${className || ''} overflow-hidden`.trim(),
      children: (
        <span className="line-mask block overflow-hidden">
          <span className="line-inner block">
            {child.props.children}
          </span>
        </span>
      )
    });
  }

  return (
    <div 
      ref={containerRef as any} 
      data-copy-wrapper 
      className={`overflow-hidden ${className || ''}`}
    >
      {React.Children.map(children, (child) => (
        <span className="line-mask block overflow-hidden">
          <span className="line-inner block">
            {child}
          </span>
        </span>
      ))}
    </div>
  );
};
