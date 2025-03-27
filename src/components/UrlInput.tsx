
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, RotateCw, Loader2, Globe } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
      // Ensure URL has https:// prefix if not already present
      let processedUrl = url.trim();
      if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = 'https://' + processedUrl;
      }
      onAnalyze(processedUrl);
    }
  };

  const handleVisitUrl = () => {
    if (!url) return;
    
    // Ensure URL has https:// prefix if not already present
    let processedUrl = url.trim();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }
    window.open(processedUrl, '_blank');
  };

  return (
    <Card className="mb-8 border-muted/30 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" /> 
          Website Performance Analysis
        </CardTitle>
        <CardDescription>
          Enter the URL of the website you want to analyze for performance insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <div className="flex">
              <Input
                id="url-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="rounded-r-none font-medium"
                required
                disabled={isLoading}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-l-none border-l-0"
                      disabled={!url || isLoading}
                      onClick={handleVisitUrl}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Open URL</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit website</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoading || !url} 
              className="md:w-auto w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Performance'
              )}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh analysis</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </form>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-3">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default UrlInput;
