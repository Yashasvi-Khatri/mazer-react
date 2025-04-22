import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const BeatGenerator = ({ onBeatGenerated, onStop }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate a beat');
      return;
    }
    
    try {
      setIsGenerating(true);
      const beat = await api.generateBeat(prompt);
      
      toast.success('Beat generated successfully!');
      onBeatGenerated(beat);
    } catch (error) {
      console.error('Error generating beat:', error);
      toast.error('Failed to generate beat. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card className="w-full neo-blur">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Describe the beat you want to create
            </label>
            <Input
              id="prompt"
              placeholder="e.g., A trap beat with heavy 808s and fast hi-hats"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
              disabled={isGenerating}
            />
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Beat
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => onStop && onStop()}
              className="w-full"
            >
              Stop
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Try prompts like:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPrompt("A classic hip-hop beat with boom bap drums")}>
                A classic hip-hop beat with boom bap drums
              </li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPrompt("A modern trap beat with 808 bass")}>
                A modern trap beat with 808 bass
              </li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPrompt("A house beat with a solid four-on-the-floor kick")}>
                A house beat with a solid four-on-the-floor kick
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeatGenerator;
