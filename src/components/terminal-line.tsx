"use client";

import { useState, useEffect, useMemo } from 'react';
import { BlinkingCursor } from '@/components/blinking-cursor';
import { cn } from '@/lib/utils';

type TerminalLineProps = {
  text: string;
  isInput?: boolean;
  isStatic?: boolean;
  className?: string;
};

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const TerminalLine = ({ text, isInput = false, isStatic = false, className }: TerminalLineProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const typingSpeed = 20;

  useEffect(() => {
    if (isStatic) {
      setDisplayedText(text);
      setTypingComplete(true);
      return;
    }

    setTypingComplete(false);
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        setTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, isStatic]);

  const prefix = isInput ? <span className="text-accent">$ </span> : '';

  const renderContent = useMemo(() => {
    const parts = displayedText.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-primary transition-colors"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [displayedText]);

  return (
    <div className={cn('break-words', className)}>
      {prefix}
      <span className="text-foreground">{renderContent}</span>
      {!typingComplete && <BlinkingCursor />}
    </div>
  );
};
