"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Button } from '@/components/ui/button';
import { ProfileAsciiArt } from './profile-ascii-art';
import { User } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export const ProfileSwitcher = () => {
    const { theme } = useTheme();

    const isLightTheme = theme === 'theme-solar' || theme === 'theme-ocean';

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="font-code text-accent hover:bg-primary hover:text-primary-foreground h-9 w-9 rounded transition-colors"
                >
                    <User />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-auto bg-transparent border-none shadow-none flex items-center justify-center">
                <DialogHeader>
                    <DialogTitle className="sr-only">Carte de visite de Romain Tastet</DialogTitle>
                </DialogHeader>
                <div className="transform scale-75 sm:scale-90 md:scale-100">
                    <Tilt
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        perspective={1000}
                        scale={1.05}
                        transitionSpeed={2000}
                        gyroscope={true}
                        glareEnable={true}
                        glareMaxOpacity={isLightTheme ? 0.3 : 0.15}
                        glareColor="hsl(var(--primary))"
                        glarePosition="all"
                        glareBorderRadius="1.5rem"
                    >
                        <div
                            className={cn(
                                "relative rounded-3xl border border-white/10 p-4 shadow-2xl shadow-black/20 overflow-hidden w-[550px]",
                                isLightTheme ? "bg-card text-card-foreground" : "bg-black text-white"
                            )}
                            style={{ transform: 'translateZ(20px)' }}
                        >
                            {/* LiquidGlass gloss effect */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-25"
                                style={{
                                    mixBlendMode: 'soft-light',
                                    background: `radial-gradient(circle at 50% 50%, #fff, transparent 70%)`,
                                }}
                            ></div>

                            {/* Holographic overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-20"
                                style={{
                                    background: `linear-gradient(135deg, hsla(var(--primary), 0.3) 0%, hsla(var(--accent), 0.3) 100%)`,
                                    mixBlendMode: 'color-dodge',
                                }}
                            ></div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className={cn("bg-black rounded-xl", isLightTheme && "p-1")}>
                                    <div className="transform-gpu">
                                        <ProfileAsciiArt />
                                    </div>
                                </div>

                                <div className="mt-4 text-center p-2" style={{ transform: 'translateZ(40px)' }}>
                                    <h2 className="text-lg sm:text-xl font-bold text-primary">Ingénieur Logiciel .NET</h2>
                                    <p className="text-sm sm:text-md text-accent">Spécialiste Connectivité Industrielle & IA</p>
                                    <p className={cn("text-xs mt-2", isLightTheme ? "text-muted-foreground" : "text-white/70")}>
                                        C# | .NET Core | Blazor | SQL | Docker | IA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Tilt>
                </div>
            </DialogContent>
        </Dialog>
    );
};
