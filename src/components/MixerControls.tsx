
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Save, Volume2, Music, Clock, Sliders } from 'lucide-react';
import { toast } from 'sonner';
import socketService from '@/lib/socket';

const MixerControls = ({ beat, onSave }) => {
  const [localBeat, setLocalBeat] = useState(beat);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const handleTempoChange = (values) => {
    const newBpm = values[0];
    setLocalBeat(prev => ({
      ...prev,
      bpm: newBpm
    }));
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(localBeat);
      toast.success('Beat saved successfully');
    } catch (error) {
      toast.error('Failed to save beat');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSend = async () => {
    try {
      setIsSending(true);
      
      // Send beat through socket
      socketService.mockSendBeat(localBeat);
      
      // In a real app, you'd use:
      // socketService.sendBeat(localBeat);
      
      toast.success('Beat sent for collaboration');
    } catch (error) {
      toast.error('Failed to send beat');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Card className="glass-morphism animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Sliders className="h-5 w-5 mr-2" />
          Mixer Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tempo</span>
              </div>
              <span className="text-sm font-medium">{localBeat.bpm} BPM</span>
            </div>
            <Slider
              value={[localBeat.bpm]}
              min={60}
              max={180}
              step={1}
              onValueChange={handleTempoChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Music className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Master Volume</span>
              </div>
            </div>
            <Slider
              defaultValue={[0.8]}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-4 pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send to Collaboration
              </>
            )}
          </Button>
          
          <Button
            className="w-full"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Beat
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MixerControls;
