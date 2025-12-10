"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TerminalLine } from '@/components/terminal-line';
import { cvData } from '@/lib/cv-data';
import { useLanguage } from '@/contexts/language-context';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const commandList = {
  en: {
    about: 'Get a summary about me.',
    skills: 'List my technical skills.',
    experience: 'Show my work experience.',
    projects: 'Display my key projects.',
    contact: 'Show my contact information.',
    help: 'Show available commands.',
    all: 'Run all commands.',
    clear: 'Clear the terminal.',
  },
  fr: {
    about: 'Obtenir un résumé à mon sujet.',
    skills: 'Lister mes compétences techniques.',
    experience: 'Afficher mon expérience professionnelle.',
    projects: 'Afficher mes projets clés.',
    contact: 'Afficher mes informations de contact.',
    help: 'Afficher les commandes disponibles.',
    all: 'Exécuter toutes les commandes.',
    clear: 'Nettoyer le terminal.',
  }
};

type Line = {
  id: string;
  text: string;
  isInput?: boolean;
  isStatic?: boolean;
  className?: string;
};

export const CVDisplay = () => {
  const { language } = useLanguage();
  const [history, setHistory] = useState<Line[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  
  // ✅ Utiliser useRef pour le compteur au lieu d'une variable globale
  const lineIdCounterRef = useRef(0);
  
  const getUniqueId = useCallback(() => {
    return (lineIdCounterRef.current++).toString();
  }, []);
  
  const allCommandKeys = React.useMemo(() => Object. keys(commandList[language]), [language]);

  const currentCVData = cvData[language];
  const commands = commandList[language];

  const getWelcomeMessages = useCallback((): Line[] => {
    const messages = {
      fr: {
        welcome: `Bienvenue sur le CV interactif de ${cvData.fr.name}`,
        help: "Tapez 'help' ou utilisez le menu pour une liste de commandes.",
      },
      en: {
        welcome: `Welcome to ${cvData.en.name}'s Interactive CV`,
        help: "Type 'help' or use the menu for a list of commands.",
      }
    };
    return [
      { id: getUniqueId(), text: messages[language].welcome, isStatic: true },
      { id: getUniqueId(), text: messages[language].help, isStatic: true, className: 'mb-4' },
    ];
  }, [language, getUniqueId]);
  

  const addLines = useCallback((lines: Line[]) => {
    if (lines.length === 0) {
        setIsExecuting(false);
        return;
    }

    // ✅ Utiliser une ref pour suivre l'index et éviter les closures obsolètes
    let currentIndex = 0;
    
    const addLine = () => {
      if (currentIndex >= lines.length) {
        setIsExecuting(false);
        return;
      }
      
      const lineToAdd = lines[currentIndex];
      currentIndex++;
      
      setHistory(prev => {
        // ✅ Vérifier si la ligne existe déjà pour éviter les doublons
        if (prev.some(l => l.id === lineToAdd.id)) {
          return prev;
        }
        return [...prev, lineToAdd];
      });
      
      if (currentIndex < lines.length) {
        setTimeout(addLine, 50);
      } else {
        setIsExecuting(false);
      }
    };
    
    setIsExecuting(true);
    addLine();
  }, []);

  const getOutputForCommand = useCallback((command: string): Line[] => {
    const output: { text: string; className?: string }[] = [];
  
    const createLine = (text: string, className = ''): { text: string; className: string } => ({
      text,
      className,
    });
  
    switch (command) {
        case 'about':
            currentCVData.summary.forEach(item => {
                if (typeof item === 'string') {
                    output.push(createLine(item, 'text-secondary-foreground mb-2'));
                } else if (item.type === 'bold') {
                    output.push(createLine(item.content, 'font-bold text-accent mt-2'));
                }
            });
            break;
      case 'skills':
        output.push(createLine(language === 'fr' ? 'Compétences:' : 'Skills:', 'text-accent'));
        output.push(createLine(currentCVData.skills.join(', ')));
        break;
      case 'experience':
        output.push(createLine(language === 'fr' ? 'Expérience Professionnelle:' : 'Work Experience:', 'text-accent'));
        currentCVData.experience.forEach((exp) => {
          output.push(createLine(`\n${exp.role} @ ${exp.company} (${exp. period})`, "font-bold"));
          exp.details.forEach(detail => output.push(createLine(`- ${detail}`)));
        });
        break;
      case 'projects':
        output.push(createLine(language === 'fr' ? 'Projets:' : 'Projects:', 'text-accent'));
        currentCVData. projects.forEach((proj) => {
            const projectLines = [
                createLine(`\n${proj.name}`, "font-bold"),
                proj.description ? createLine(proj.description, "text-muted-foreground") : undefined,
                proj.tech?. length > 0 ? createLine(`Tech: ${proj.tech.join(', ')}`) : undefined,
                proj.link ? createLine(`Link: ${proj.link}`) : undefined
            ].filter(Boolean) as { text: string; className: string }[];
            output.push(...projectLines);
        });
        break;
      case 'contact':
        output. push(createLine('Contact:', 'text-accent'));
        output.push(createLine(`Email: ${currentCVData. contact.email}`));
        output. push(createLine(`LinkedIn: ${currentCVData.contact.linkedin}`));
        output. push(createLine(`GitHub: ${currentCVData.contact.github}`));
        break;
      case 'help':
        output.push(createLine(language === 'fr' ?  'Commandes disponibles:' : 'Available commands:', 'text-accent'));
        Object.entries(commands).forEach(([cmd, desc]) => {
          output.push(createLine(`${cmd. padEnd(12, ' ')} - ${desc}`));
        });
        break;
      default:
        if (command) {
          const notFound = language === 'fr' ? `Commande non trouvée: ${command}.  Tapez 'help' pour les commandes disponibles.` : `Command not found: ${command}.  Type 'help' for available commands.`;
          output.push(createLine(notFound));
        }
        break;
    }
  
    if (output.length > 0) {
      const separator = createLine('--------------------', 'text-muted-foreground my-2');
      output.unshift(separator);
      output.push(separator);
    }
    
    return output
      .filter(line => line && line.text)
      .map(line => ({
        id: getUniqueId(),
        text: line.text,
        isInput: false,
        className: `${line.className || ''} space-y-2 sm:space-y-1`,
      }));
  }, [currentCVData, language, commands, getUniqueId]);

  const executeCommand = useCallback(async (command: string) => {
    const normalizedCommand = command.trim().toLowerCase();
    if (! normalizedCommand) return;

    setHistory(prev => [...prev, { id: getUniqueId(), text: normalizedCommand, isInput: true }]);

    if (normalizedCommand === 'clear') {
      // ✅ Réinitialiser le compteur seulement ici
      lineIdCounterRef.current = 0;
      setHistory(getWelcomeMessages());
      setIsExecuting(false);
    } else if (normalizedCommand === 'all') {
      const allCommands = ['about', 'skills', 'experience', 'projects', 'contact'];
      let allLines: Line[] = [];
      for (const cmd of allCommands) {
        allLines. push({ id: getUniqueId(), text: cmd, isInput: true });
        const outputLines = getOutputForCommand(cmd);
        allLines = [... allLines, ...outputLines];
      }
      addLines(allLines);
    } else {
      const output = getOutputForCommand(normalizedCommand);
      addLines(output);
    }
  }, [getOutputForCommand, addLines, getWelcomeMessages, getUniqueId]);


  // ✅ Utiliser une ref pour éviter la double exécution en Strict Mode
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    if (hasInitialized.current && language) {
      // Changement de langue - réinitialiser
      lineIdCounterRef.current = 0;
      setHistory(getWelcomeMessages());
    } else {
      // Premier montage
      hasInitialized.current = true;
      setHistory(getWelcomeMessages());
    }
  }, [language, getWelcomeMessages]);


  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const focusInput = () => {
        if (! isExecuting) {
          inputRef.current?.focus();
        }
    };
    
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        focusInput();
    }
  }, [isExecuting]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const match = allCommandKeys.find(cmd => cmd.startsWith(value. toLowerCase()));
      setSuggestion(match || '');
    } else {
      setSuggestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
        e.preventDefault();
        setInputValue(suggestion);
        setSuggestion('');
    }
  };

  const handleInputSubmit = (e: React. FormEvent) => {
    e.preventDefault();
    if (! inputValue || isExecuting) return;
    executeCommand(inputValue);
    setInputValue('');
    setSuggestion('');
  };

  const handleCommandClick = (cmd: string) => {
    setIsSheetOpen(false);
    setTimeout(() => {
      executeCommand(cmd);
    }, 150);
  };
  

  return (
    <>
      <div className="flex-grow overflow-y-auto pr-2" onClick={() => {
          if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            inputRef.current?.focus();
          }
      }}>
        <div className="flex flex-col space-y-2 sm:space-y-1">
          {history.map((line) => (
            line ?  (
                <TerminalLine
                  key={line.id}
                  text={line.text}
                  isInput={line.isInput}
                  isStatic={line.isStatic}
                  className={line.className}
                />
            ) : null
          ))}
          <div ref={endOfHistoryRef} />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-primary/20">
        <div className="flex items-center relative bg-background/50 p-2 rounded-b-lg">
            <form onSubmit={handleInputSubmit} className="flex-grow flex items-center relative">
            <span className="text-accent mr-2">$</span>
            <div className="relative w-full">
                <Input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={isExecuting}
                    className="bg-transparent border-none text-foreground focus:ring-0 w-full font-code"
                    autoComplete="off"
                    placeholder={language === 'fr' ? 'Tapez une commande...' : 'Type a command...'}
                />
                {suggestion && inputValue && (
                    <div className="absolute inset-y-0 left-0 text-muted-foreground font-code pointer-events-none p-2 flex items-center">
                    <span className="text-transparent">{inputValue}</span>
                    <span>{suggestion. substring(inputValue.length)}</span>
                    </div>
                )}
            </div>
            </form>
            
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isExecuting} className="ml-2">
                <Menu className="h-6 w-6 text-accent" />
                <span className="sr-only">Open Commands Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                <SheetTitle>{language === 'fr' ? 'Commandes' : 'Commands'}</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-2 gap-2 mt-4">
                {Object.entries(commands).map(([cmd, desc]) => (
                    <Button
                    key={cmd}
                    variant="outline"
                    className="font-code justify-start h-auto"
                    onClick={() => handleCommandClick(cmd)}
                    >
                    <div className="flex flex-col items-start text-left">
                        <div>{cmd}</div>
                        <div className="text-xs text-muted-foreground font-normal whitespace-normal">{desc}</div>
                    </div>
                    </Button>
                ))}
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </>
  );
};
