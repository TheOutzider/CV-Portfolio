"use client";

import React, { useState, useEffect } from 'react';

type Star = {
  id: number;
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
};

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const numStars = window.innerWidth > 768 ? 200 : 50;
      const newStars: Star[] = [];
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`, // 2 to 5 seconds
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);

    return () => window.removeEventListener('resize', generateStars);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    >
      {stars.map(star => (
        <span
          key={star.id}
          className="absolute text-primary text-xs animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        >
          +
        </span>
      ))}
    </div>
  );
};

export { StarryBackground };
