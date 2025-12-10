import React from 'react';
import { cn } from '@/lib/utils';

type BlinkingCursorProps = {
  className?: string;
};

export const BlinkingCursor = ({ className }: BlinkingCursorProps) => {
  return (
    <span
      className={cn('inline-block w-2.5 h-5 bg-primary animate-blink ml-1', className)}
      aria-hidden="true"
    />
  );
};
