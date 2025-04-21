
import { toast } from 'sonner';

// Mock data for beat patterns
const mockBeats = [
  {
    id: 'beat1',
    name: 'Trap Beat',
    bpm: 140,
    patterns: {
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'beat2',
    name: 'Boom Bap',
    bpm: 90,
    patterns: {
      kick: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hihat: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// API service
export const api = {
  // Generate a beat based on a prompt
  generateBeat: async (prompt) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we'll return a random beat pattern
    const randomBeat = mockBeats[Math.floor(Math.random() * mockBeats.length)];
    
    // Modify the beat based on the prompt (in a real app, this would be AI-generated)
    const modifiedBeat = {
      ...randomBeat,
      id: `gen-${Date.now()}`,
      name: prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt,
      createdAt: new Date().toISOString(),
    };
    
    return modifiedBeat;
  },
  
  // Save a beat
  saveBeat: async (beat) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would save to a backend
    const savedBeat = {
      ...beat,
      id: beat.id || `beat-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    
    return savedBeat;
  },
  
  // Get user's beats
  getUserBeats: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would fetch from a backend
    return [...mockBeats];
  },
  
  // Delete a beat
  deleteBeat: async (beatId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would delete from a backend
    console.log(`Beat ${beatId} deleted`);
    return { success: true };
  }
};

// Export the Beat Pattern type for type checking
export class BeatPattern {
  constructor() {
    this.id = '';
    this.name = '';
    this.bpm = 120;
    this.patterns = {};
    this.createdAt = new Date().toISOString();
  }
}
