
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
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';
import { getApiKey, setApiKey } from '@/services/pagespeedService';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ApiKeyFormProps {
  onKeySet?: (key: string) => void;
}

// Define form schema with validation
const formSchema = z.object({
  apiKey: z.string().min(1, {
    message: "API Key is required",
  }).refine(val => val !== 'yourAPIKey', {
    message: "Please enter your actual Google PageSpeed API key",
  })
});

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onKeySet }) => {
  const [open, setOpen] = useState(false);
  const hasKey = Boolean(getApiKey());

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: getApiKey() || '',
    },
  });

  // Load API key on component mount
  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      form.setValue('apiKey', savedKey);
    }
  }, [form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const trimmedKey = values.apiKey.trim();
    
    // Extract the actual key if the user pasted the entire URL
    let keyToSave = trimmedKey;
    if (trimmedKey.includes('key=')) {
      try {
        const url = new URL(trimmedKey);
        const keyParam = url.searchParams.get('key');
        if (keyParam) {
          keyToSave = keyParam;
        } else {
          // Try to extract from regular string if not a valid URL
          const keyMatch = trimmedKey.match(/[&?]key=([^&]+)/);
          if (keyMatch && keyMatch[1]) {
            keyToSave = keyMatch[1];
          }
        }
      } catch (e) {
        // Not a valid URL, try to extract directly
        const keyMatch = trimmedKey.match(/[&?]key=([^&]+)/);
        if (keyMatch && keyMatch[1]) {
          keyToSave = keyMatch[1];
        }
      }
    }

    // Save API key
    setApiKey(keyToSave);
    
    toast({
      title: "API Key Saved",
      description: "Your Google PageSpeed API key has been saved securely.",
      // Use a React element in description for the icon
      description: (
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Your Google PageSpeed API key has been saved securely.</span>
        </div>
      )
    });
    
    if (onKeySet) {
      onKeySet(keyToSave);
    }
    
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {hasKey ? <ShieldCheck className="h-4 w-4 text-green-500" /> : <KeyRound className="h-4 w-4" />}
          {hasKey ? "Update API Key" : "Set API Key"}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Google PageSpeed API Key
          </SheetTitle>
          <SheetDescription>
            API keys are stored locally and securely in your browser's local storage.
            You can get a free API key from the{" "}
            <a 
              href="https://developers.google.com/speed/docs/insights/v5/get-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-medium text-primary hover:text-primary/80"
            >
              Google Cloud Console
            </a>.
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your Google PageSpeed API key" 
                      {...field} 
                      className="font-mono text-sm"
                    />
                  </FormControl>
                  <FormDescription className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                    <span>
                      You can paste the full URL containing your key, and we'll extract just the key portion.
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="rounded-md bg-muted p-4">
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium leading-none mb-2">Enterprise-Grade Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Your API key is never transmitted to our servers and is only used for direct API calls from your browser to Google's services.
                  </p>
                </div>
              </div>
            </div>
            
            <SheetFooter className="pt-2">
              <Button type="submit">Save API Key</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ApiKeyForm;
