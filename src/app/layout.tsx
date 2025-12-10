"use client"

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { StarryBackground } from '@/components/starry-background';
import { ThemeProvider, useTheme } from '@/contexts/theme-context';
import { FloatingBubbles } from '@/components/floating-bubbles';

// export const metadata: Metadata = {
//   title: 'Green Screen CV',
//   description: 'An interactive CV in a terminal-style interface.',
// };

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const isLightTheme = theme === 'theme-solar' || theme === 'theme-ocean';

  return (
    <>
      {isLightTheme ? <FloatingBubbles /> : <StarryBackground />}
      <div className="relative z-10">{children}</div>
      <Toaster />
    </>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Green Screen CV</title>
        <meta name="description" content="An interactive CV in a terminal-style interface." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-code antialiased relative">
        <ThemeProvider>
          <LanguageProvider>
            <AppLayout>{children}</AppLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
