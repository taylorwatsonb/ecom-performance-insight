
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      aria-label="Toggle dark mode" 
      pressed={theme === 'dark'} 
      onPressedChange={toggleTheme}
      className="p-2"
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
