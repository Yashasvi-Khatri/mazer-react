
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Square, 
  Volume2, 
  BarChart, 
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BeatPattern } from '@/lib/api';
import AudioEngine from '@/lib/AudioEngine';

type BeatVisualizerProps = {
  beat: BeatPattern;
  onSave?: () => void;
};

const BeatVisualizer = ({ beat, onSave }: BeatVisualizerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<BeatPattern>(beat);
  const [audioEngine, setAudioEngine] = useState<AudioEngine | null>(null);
  const [volumes, setVolumes] = useState({
    kick: 1,
    snare: 1,
    hihat: 1,
    percussion: 1,
  });
  const [activeStep, setActiveStep] = useState<number>(-1);
  
  // Initialize audio engine
  useEffect(() => {
    const engine = new AudioEngine();
    engine.init().then(() => {
      setAudioEngine(engine);
    });
    
    return () => {
      if (audioEngine) {
        audioEngine.stop();
      }
    };
  }, []);
  
  // Update audio engine when beat changes
  useEffect(() => {
    if (audioEngine && beat) {
      audioEngine.setPatterns(beat.patterns, beat.bpm);
      setCurrentBeat(beat);
    }
  }, [beat, audioEngine]);
  
  // Handle play/stop
  const togglePlay = () => {
    if (!audioEngine) return;
    
    if (isPlaying) {
      audioEngine.stop();
      setActiveStep(-1);
    } else {
      audioEngine.play();
      
      // Simulate steps for visualization
      let step = 0;
      const interval = setInterval(() => {
        setActiveStep(step);
        step = (step + 1) % 16;
      }, (60 / beat.bpm) / 4 * 1000);
      
      return () => clearInterval(interval);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle volume changes
  const handleVolumeChange = (instrument: 'kick' | 'snare' | 'hihat' | 'percussion', value: number[]) => {
    if (!audioEngine) return;
    
    const volume = value[0];
    setVolumes(prev => ({ ...prev, [instrument]: volume }));
    audioEngine.setVolume(instrument, volume);
  };
  
  // Handle pattern updates
  const toggleStep = (instrument: 'kick' | 'snare' | 'hihat' | 'percussion', step: number) => {
    if (!currentBeat || !currentBeat.patterns[instrument]) return;
    
    const newPattern = [...(currentBeat.patterns[instrument] || [])];
    newPattern[step] = newPattern[step] ? 0 : 1;
    
    const newBeat = {
      ...currentBeat,
      patterns: {
        ...currentBeat.patterns,
        [instrument]: newPattern,
      },
    };
    
    setCurrentBeat(newBeat);
    
    if (audioEngine) {
      audioEngine.setPatterns(newBeat.patterns, newBeat.bpm);
    }
  };
  
  return (
    <div className="w-full glass-morphism rounded-xl p-4 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{currentBeat.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{currentBeat.genre}</span>
            <span>•</span>
            <span>{currentBeat.bpm} BPM</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={togglePlay}
            className="h-10 w-10"
          >
            {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          {onSave && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onSave}
              className="h-10 w-10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(currentBeat.patterns).map(([instrument, pattern]) => (
          <div key={instrument} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">{instrument}</span>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volumes[instrument as keyof typeof volumes]]}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={(value) => handleVolumeChange(instrument as any, value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-16 gap-1">
              {pattern && Array.isArray(pattern) && pattern.map((value, index) => (
                <div
                  key={index}
                  className={`beat-grid-item h-10 rounded-md flex items-center justify-center cursor-pointer ${
                    value ? 'bg-beat-primary/80 text-white' : 'bg-muted/20'
                  } ${activeStep === index ? 'ring-2 ring-primary animate-beat-pulse' : ''}`}
                  onClick={() => toggleStep(instrument as any, index)}
                >
                  {value ? <BarChart className="h-4 w-4" /> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeatVisualizer;
