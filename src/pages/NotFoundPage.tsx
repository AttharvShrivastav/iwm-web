import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.not-found-label', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    tl.from('.not-found-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    }, "-=0.4");

    tl.from('.not-found-desc', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.6");

    tl.from('.not-found-btn', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.4");
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-8 md:px-16 py-32"
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-12">
        <div className="not-found-label">
          <SectionHeader label="404 ERROR" className="text-black/40" />
        </div>

        <div className="flex flex-col gap-6">
          <h1 
            ref={textRef}
            className="not-found-title text-5xl md:text-7xl lg:text-7xl font-medium font-agrandir text-black tracking-tighter leading-tight"
          >
            This page missed the collection route.
          </h1>
          <p className="not-found-desc text-zinc-500 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The page you are looking for has been cleared or moved. Let's get you back to the right track.
          </p>
        </div>

        <div className="not-found-btn pt-4">
          <Link to="/">
            <Button 
              label="BACK TO HOME" 
              bgColor="bg-black" 
              textColor="text-white"
              className="px-12 py-5 text-xs tracking-[0.3em]"
            />
          </Link>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-[0.03]">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-agrandir font-bold select-none">
          404
        </span>
      </div>
    </div>
  );
};
