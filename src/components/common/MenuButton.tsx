import React from 'react';
import { cn } from '@/src/lib/utils';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-10 w-12 flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:opacity-70",
        className
      )}
      aria-label="Toggle Menu"
    >
      <span
        className={cn(
          "h-0.5 w-8 bg-current transition-all duration-300",
          isOpen && "translate-y-2 rotate-45"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-8 bg-current transition-all duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-8 bg-current transition-all duration-300",
          isOpen && "-translate-y-2 -rotate-45"
        )}
      />
    </button>
  );
};
