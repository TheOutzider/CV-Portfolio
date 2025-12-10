"use client";

import React from 'react';
import { useTheme, type Theme } from '@/contexts/theme-context';
import { Sun, Moon, Waves, Terminal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

const themes: { name: string; id: Theme; icon: React.ReactNode }[] = [
  { name: 'Terminal', id: 'dark', icon: <Terminal className="w-4 h-4 mr-2" /> },
  { name: 'Synthwave', id: 'theme-synthwave', icon: <Moon className="w-4 h-4 mr-2" /> },
  { name: 'Solaire', id: 'theme-solar', icon: <Sun className="w-4 h-4 mr-2" /> },
  { name: 'Océan', id: 'theme-ocean', icon: <Waves className="w-4 h-4 mr-2" /> },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-code text-accent hover:bg-primary hover:text-primary-foreground px-2 py-1 h-auto rounded transition-colors">
          {currentTheme?.icon}
          <span>{currentTheme?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map((t) => (
          <DropdownMenuItem key={t.id} onClick={() => setTheme(t.id)}>
            {t.icon}
            <span>{t.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
