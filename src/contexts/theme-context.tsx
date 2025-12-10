"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Theme = 'dark' | 'theme-solar' | 'theme-ocean' | 'theme-synthwave';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const body = document.body;
    body.classList.remove('dark', 'theme-solar', 'theme-ocean', 'theme-synthwave');
    body.classList.add(theme);

    const html = document.documentElement;
    if (theme === 'dark' || theme === 'theme-synthwave') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
