
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Key, KeyRound } from 'lucide-react';
import { getApiKey, setApiKey } from '@/services/pagespeedService';
import { toast } from '@/hooks/use-toast';

interface ApiKeyFormProps {
  onKeySet?: (key: string) => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onKeySet }) => {
  const [apiKey, setApiKeyState] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKeyState(savedKey);
    }
  }, []);

  const handleSaveKey = () => {
    const trimmedKey = apiKey.trim();
    if (!trimmedKey) {
      toast({
        title: "API Key Required",
        description: "Please enter a Google PageSpeed API key.",
        variant: "destructive",
      });
      return;
    }

    // Save API key
    setApiKey(trimmedKey);
    
    toast({
      title: "API Key Saved",
      description: "Your Google PageSpeed API key has been saved.",
    });
    
    if (onKeySet) {
      onKeySet(trimmedKey);
    }
    
    setOpen(false);
  };

  const hasKey = Boolean(getApiKey());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {hasKey ? <KeyRound className="h-4 w-4" /> : <Key className="h-4 w-4" />}
          {hasKey ? "Update API Key" : "Set API Key"}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Google PageSpeed API Key</SheetTitle>
          <SheetDescription>
            Enter your Google PageSpeed Insights API key to analyze real websites.
            You can get a free API key from the 
            <a 
              href="https://developers.google.com/speed/docs/insights/v5/get-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline ml-1 text-primary hover:text-primary/80"
            >
              Google Cloud Console
            </a>.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Label htmlFor="api-key" className="text-sm font-medium mb-2 block">
            API Key
          </Label>
          <Input
            id="api-key"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="Enter your Google PageSpeed API key"
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">
            Your API key is stored locally in your browser.
          </p>
        </div>
        
        <SheetFooter>
          <Button onClick={handleSaveKey}>Save API Key</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ApiKeyForm;
