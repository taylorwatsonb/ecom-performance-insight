
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, RotateCw } from 'lucide-react';

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ 
  onAnalyze, 
  isLoading, 
  lastUpdated,
  onRefresh
}) => {
  const [url, setUrl] = useState('https://www.example.com');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="mb-8 p-4 rounded-lg border bg-card">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="url-input" className="text-sm font-medium mb-1 block">
            Website URL to analyze
          </label>
          <div className="flex">
            <Input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com"
              className="rounded-r-none"
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-l-none border-l-0"
              disabled={!url}
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open URL</span>
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading || !url} className="md:w-auto w-full">
            {isLoading ? 'Analyzing...' : 'Analyze Performance'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RotateCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </form>
      {lastUpdated && (
        <p className="text-xs text-muted-foreground mt-2">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default UrlInput;
