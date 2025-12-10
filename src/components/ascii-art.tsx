"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

type AsciiArtProps = {
  text: string;
  className?: string;
  isAnimated?: boolean;
};

export const AsciiArt = ({ text, className, isAnimated = true }: AsciiArtProps) => {
  const lines = useMemo(() => text.split('\n'), [text]);

  return (
    <pre className={cn("text-primary font-black leading-none whitespace-pre mb-4", className)}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} style={{ animationDelay: isAnimated ? `${lineIndex * 0.05}s` : undefined }}>
          {line.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={isAnimated ? "animate-wave" : ""}
              style={{ animationDelay: isAnimated ? `${(lineIndex * 0.05 + charIndex * 0.01)}s` : undefined }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
};
