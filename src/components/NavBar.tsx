
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, Settings, Database } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { performanceMetrics } from '@/lib/data';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className={cn('sticky top-0 z-40 flex items-center justify-between px-6 py-4 glassmorphism', className)}>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-full bg-primary/10 p-2 text-primary">
          <Database className="h-5 w-5" />
        </div>
        <span className="text-xl font-medium tracking-tight">EcomPerform</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div 
          className="hidden md:flex items-center rounded-full bg-muted px-4 py-1.5 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="h-8 w-[200px] bg-transparent focus:outline-none text-sm text-muted-foreground">
            Search metrics... <kbd className="ml-3 rounded border bg-muted-foreground/20 px-1.5 font-mono text-xs text-muted-foreground">⌘K</kbd>
          </span>
        </div>
        
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput 
            placeholder="Search performance metrics..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Metrics">
              {performanceMetrics.filter((metric) => 
                metric.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                metric.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((metric) => (
                <CommandItem
                  key={metric.name}
                  onSelect={() => {
                    // Scroll to the metric card when selected
                    const metricElement = document.getElementById(`metric-${metric.name}`);
                    if (metricElement) {
                      metricElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      // Highlight the metric card temporarily
                      metricElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
                      setTimeout(() => {
                        metricElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
                      }, 2000);
                    }
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{metric.name}</span>
                    <span className="text-xs text-muted-foreground">{metric.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        
        <ThemeToggle />
        
        <button className="flex items-center gap-1 rounded-full p-2 hover:bg-muted/50 transition-colors">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default NavBar;
