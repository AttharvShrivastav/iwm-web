import React from 'react';

type CMSHeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
  className?: string;
};

export const CMSHeading: React.FC<CMSHeadingProps> = ({
  as: Tag = 'h2',
  text,
  className,
}) => {
  const cleanText = text.replace(/\s*(\|\||\n)\s*/g, ' ').trim();

  const lines = text.includes('||')
    ? text.split('||').map((line) => line.trim()).filter(Boolean)
    : text.includes('\n')
      ? text.split('\n').map((line) => line.trim()).filter(Boolean)
      : [text];

  if (!text) return null;

  if (lines.length === 1) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={cleanText}>
      {lines.map((line, index) => (
        <React.Fragment key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 && <br aria-hidden="true" />}
        </React.Fragment>
      ))}
    </Tag>
  );
};