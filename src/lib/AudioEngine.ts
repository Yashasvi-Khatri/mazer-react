
type AudioSample = {
  name: string;
  buffer: AudioBuffer;
};

type Instrument = 'kick' | 'snare' | 'hihat' | 'percussion';

type PatternMap = {
  [key in Instrument]?: number[];
};

export class AudioEngine {
  private context: AudioContext;
  private samples: Map<Instrument, AudioSample>;
  private isPlaying: boolean = false;
  private patternLength: number = 16;
  private bpm: number = 90;
  private currentStep: number = 0;
  private patterns: PatternMap = {};
  private intervalId: number | null = null;
  private gainNodes: Map<Instrument, GainNode>;
  
  constructor() {
    this.context = new AudioContext();
    this.samples = new Map();
    this.gainNodes = new Map();
    
    // Initialize default gain nodes for each instrument
    this.instruments.forEach(instrument => {
      const gainNode = this.context.createGain();
      gainNode.connect(this.context.destination);
      gainNode.gain.value = 1.0; // Default volume
      this.gainNodes.set(instrument, gainNode);
    });
  }
  
  get instruments(): Instrument[] {
    return ['kick', 'snare', 'hihat', 'percussion'];
  }
  
  async init() {
    await this.loadSamples();
  }
  
  async loadSamples() {
    try {
      const sampleFiles = {
        kick: '/samples/kick.wav',
        snare: '/samples/snare.wav',
        hihat: '/samples/hihat.wav',
        percussion: '/samples/percussion.wav',
      };
      
      // For each instrument, load its sample
      for (const [instrument, file] of Object.entries(sampleFiles)) {
        // In a real implementation, fetch the audio file and decode it
        // For demo purposes, we'll create mock audio buffers
        
        // Create a 1-second buffer with a simple sine wave
        const buffer = this.context.createBuffer(
          2, // stereo
          this.context.sampleRate, // 1 second of audio
          this.context.sampleRate
        );
        
        // Fill the buffer with a sine wave
        // In a real implementation, you'd load actual samples
        const leftChannel = buffer.getChannelData(0);
        const rightChannel = buffer.getChannelData(1);
        
        // Different frequency for each instrument to simulate different sounds
        let frequency = 1;
        switch (instrument) {
          case 'kick':
            frequency = 3;
            break;
          case 'snare':
            frequency = 5;
            break;
          case 'hihat':
            frequency = 10;
            break;
          case 'percussion':
            frequency = 7;
            break;
        }
        
        for (let i = 0; i < buffer.length; i++) {
          const t = i / buffer.sampleRate;
          const amplitude = Math.exp(-5 * t); // Decay envelope
          leftChannel[i] = amplitude * Math.sin(frequency * Math.PI * 2 * t);
          rightChannel[i] = amplitude * Math.sin(frequency * Math.PI * 2 * t);
        }
        
        this.samples.set(instrument as Instrument, {
          name: instrument,
          buffer,
        });
      }
      
      console.log('All samples loaded successfully');
    } catch (error) {
      console.error('Error loading samples:', error);
    }
  }
  
  setPatterns(patterns: PatternMap, bpm: number = 90) {
    this.patterns = patterns;
    this.bpm = bpm;
  }
  
  play() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.currentStep = 0;
    
    // Resume audio context if suspended
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
    
    const stepTime = (60 / this.bpm) / 4; // 16th notes
    
    const step = () => {
      this.playStep(this.currentStep);
      this.currentStep = (this.currentStep + 1) % this.patternLength;
    };
    
    // Initial step
    step();
    
    // Set up interval for subsequent steps
    this.intervalId = window.setInterval(step, stepTime * 1000);
  }
  
  stop() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  playStep(step: number) {
    // For each instrument, check if it should play on this step
    this.instruments.forEach(instrument => {
      const pattern = this.patterns[instrument];
      if (pattern && pattern[step]) {
        this.playSample(instrument);
      }
    });
  }
  
  playSample(instrument: Instrument) {
    const sample = this.samples.get(instrument);
    const gainNode = this.gainNodes.get(instrument);
    
    if (!sample || !gainNode) {
      console.error(`Sample or gain node not found for ${instrument}`);
      return;
    }
    
    // Create a buffer source
    const source = this.context.createBufferSource();
    source.buffer = sample.buffer;
    
    // Connect the source to the gain node
    source.connect(gainNode);
    
    // Play the sample
    source.start();
  }
  
  setVolume(instrument: Instrument, volume: number) {
    const gainNode = this.gainNodes.get(instrument);
    if (gainNode) {
      gainNode.gain.value = volume;
    }
  }
  
  resume() {
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }
}

export default AudioEngine;
