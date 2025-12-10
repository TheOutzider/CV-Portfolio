"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type Bubble = {
  id: number;
  left: string;
  size: number;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
};

export const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const numBubbles = 50;
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < numBubbles; i++) {
        newBubbles.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: Math.random() * 1 + 0.2, // from 0.2rem to 1.2rem
          opacity: Math.random() * 0.5 + 0.1, // from 0.1 to 0.6
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${Math.random() * 10 + 10}s`, // 10 to 20 seconds
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
    // No need to regenerate on resize for this effect
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden"
    >
      {bubbles.map(bubble => (
        <span
          key={bubble.id}
          className="absolute bottom-[-20px] text-primary animate-float-up"
          style={{
            left: bubble.left,
            fontSize: `${bubble.size}rem`,
            opacity: bubble.opacity,
            animationDelay: bubble.animationDelay,
            animationDuration: bubble.animationDuration,
          }}
        >
          ●
        </span>
      ))}
    </div>
  );
};
