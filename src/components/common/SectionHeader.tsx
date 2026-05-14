import React from 'react';

interface SectionHeaderProps {
  label: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, className = '' }) => {
  return (
    <div className={`text-[10px] md:text-[12px] font-bold tracking-[0.3em] uppercase font-agrandir-tight ${className}`}>
      + {label}
    </div>
  );
};
