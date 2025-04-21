
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Square, Mic } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const instruments = [
  { name: 'Piano', sample: '/samples/piano_c.wav', keys: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  { name: 'Drums', sample: '/samples/drum.wav', pads: ['Kick', 'Snare', 'Hi-Hat', 'Clap'] },
  { name: 'Bass', sample: '/samples/bass.wav', strings: ['E', 'A', 'D', 'G'] },
  { name: 'Synth', sample: '/samples/synth.wav', pads: ['Pad1', 'Pad2', 'Pad3', 'Pad4'] }
];

const InstrumentsCluster = () => {
  const [volumes, setVolumes] = useState(instruments.map(() => 1));
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioDestRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Play a sample for the instrument
  const playSample = async (sampleUrl: string, volume: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const response = await fetch(sampleUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode);
    // Connect gain node to destination (either speakers or recorder)
    if (audioDestRef.current) {
      gainNode.connect(audioDestRef.current);
    }
    gainNode.connect(audioContextRef.current.destination);
    source.start();
  };

  // Start/stop recording
  const handleRecord = async () => {
    if (!isRecording) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      audioDestRef.current = audioContextRef.current.createMediaStreamDestination();
      mediaRecorderRef.current = new MediaRecorder(audioDestRef.current.stream);
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setRecordedUrl(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  // Volume change handler
  const handleVolumeChange = (instrumentIndex: number, newVolume: number[]) => {
    setVolumes(prev => prev.map((vol, idx) => 
      idx === instrumentIndex ? newVolume[0] : vol
    ));
  };

  return (
    <Card className="w-full glass-morphism">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Real Instruments</h3>
          <Button
            variant={isRecording ? 'destructive' : 'outline'}
            size="icon"
            onClick={handleRecord}
          >
            {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        <div className="space-y-8">
          {/* Piano UI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold">Piano</span>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volumes[0]]}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={(value) => handleVolumeChange(0, value)}
                />
              </div>
            </div>
            <div className="flex gap-1">
              {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note, idx) => (
                <button
                  key={note}
                  className="w-8 h-24 bg-white border border-gray-400 rounded-md shadow-md active:bg-blue-200"
                  onClick={() => playSample('/samples/piano_c.wav', volumes[0])}
                  aria-label={`Piano key ${note}`}
                >
                  <span className="text-xs text-gray-600">{note}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Drums UI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold">Drums</span>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volumes[1]]}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={(value) => handleVolumeChange(1, value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['Kick', 'Snare', 'Hi-Hat', 'Clap'].map((pad, idx) => (
                <button
                  key={pad}
                  className="w-16 h-16 bg-yellow-200 border-2 border-yellow-500 rounded-full shadow-md active:bg-yellow-400"
                  onClick={() => playSample('/samples/drum.wav', volumes[1])}
                  aria-label={`Drum pad ${pad}`}
                >
                  <span className="text-xs text-gray-700">{pad}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Bass UI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold">Bass</span>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volumes[2]]}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={(value) => handleVolumeChange(2, value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['E', 'A', 'D', 'G'].map((string, idx) => (
                <button
                  key={string}
                  className="w-10 h-24 bg-green-200 border-2 border-green-500 rounded-md shadow-md active:bg-green-400"
                  onClick={() => playSample('/samples/bass.wav', volumes[2])}
                  aria-label={`Bass string ${string}`}
                >
                  <span className="text-xs text-gray-700">{string}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Synth UI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold">Synth</span>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volumes[3]]}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-24"
                  onValueChange={(value) => handleVolumeChange(3, value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['Pad1', 'Pad2', 'Pad3', 'Pad4'].map((pad, idx) => (
                <button
                  key={pad}
                  className="w-16 h-16 bg-purple-200 border-2 border-purple-500 rounded-lg shadow-md active:bg-purple-400"
                  onClick={() => playSample('/samples/synth.wav', volumes[3])}
                  aria-label={`Synth pad ${pad}`}
                >
                  <span className="text-xs text-gray-700">{pad}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Recording playback and download */}
        {recordedUrl && (
          <div className="mt-6 space-y-2">
            <audio controls src={recordedUrl} className="w-full" />
            <a href={recordedUrl} download="recording.wav" className="text-blue-600 underline">Download Recording</a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstrumentsCluster;
