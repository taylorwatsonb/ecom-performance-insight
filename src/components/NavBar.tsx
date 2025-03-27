
import React from 'react';
import { cn } from '@/lib/utils';
import { Search, Settings, Database } from 'lucide-react';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  return (
    <header className={cn('sticky top-0 z-40 flex items-center justify-between px-6 py-4 glassmorphism', className)}>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-full bg-primary/10 p-2 text-primary">
          <Database className="h-5 w-5" />
        </div>
        <span className="text-xl font-medium tracking-tight">EcomPerform</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center rounded-full bg-muted px-4 py-1.5">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search metrics..." 
            className="h-8 w-[200px] bg-transparent focus:outline-none text-sm" 
          />
        </div>
        
        <button className="flex items-center gap-1 rounded-full p-2 hover:bg-muted/50 transition-colors">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default NavBar;
