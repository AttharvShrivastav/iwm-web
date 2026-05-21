import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Simulate progress bar fill
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slightly random increments for a organic loading feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    // 2. Wait for BOTH the simulated progress AND the custom fonts to be ready
    Promise.all([
      new Promise<void>((resolve) => {
        const checkProgress = setInterval(() => {
          if (progress === 100) {
            clearInterval(checkProgress);
            resolve();
          }
        }, 50);
      }),
      document.fonts.ready // Native browser check for your custom typography
    ]).then(() => {
      setIsLoaded(true);
      // Let the fadeout finish before telling the parent app to init
      setTimeout(() => {
        // Essential: Recalculate all GSAP trigger coordinates now that everything exists
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
        onComplete();
      }, 600);
    });

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#f8f7f2] flex flex-col items-center justify-center px-10"
        >
          <div className="w-full max-w-xs flex flex-col items-center">
            {/* Minimalist Percentage Counter */}
            <span className="text-[12px] font-mono font-medium tracking-widest text-black mb-3">
              {Math.min(progress, 100)}%
            </span>
            
            {/* The Bar Track */}
            <div className="w-full h-[2px] bg-black/10 rounded-full overflow-hidden relative">
              {/* Active Loading Bar */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-black"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            
            <span className="text-[9px] font-bold tracking-[0.3em] text-zinc-400 uppercase mt-4">
              Loading Experience
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};