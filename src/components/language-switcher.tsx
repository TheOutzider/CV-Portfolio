"use client";

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  const displayLanguage = language === 'fr' ? 'FRa' : 'ENg';

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="font-code text-accent hover:bg-primary hover:text-primary-foreground px-2 py-1 h-auto rounded transition-colors w-full justify-start"
    >
      <Globe className="w-4 h-4 mr-2" />
      <span>{displayLanguage}</span>
    </Button>
  );
};
