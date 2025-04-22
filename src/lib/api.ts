
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
  // API key is now loaded from environment variable for security.
  generateBeat: async (prompt) => {
    const API_KEY = import.meta.env.VITE_UNIQUE_BEAT_API_KEY;
    try {
      const response = await fetch("https://api.uniquebeat.com/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error("Failed to generate beat");
      const data = await response.json();
      // Assume the API returns a beat object compatible with your app
      return {
        ...data.beat,
        id: data.beat.id || `gen-${Date.now()}`,
        name: data.beat.name || (prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt),
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      toast.error('Failed to generate beat from API. Using fallback.');
      // Fallback to mock beat
      const randomBeat = mockBeats[Math.floor(Math.random() * mockBeats.length)];
      return {
        ...randomBeat,
        id: `gen-${Date.now()}`,
        name: prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt,
        createdAt: new Date().toISOString(),
      };
    }
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
