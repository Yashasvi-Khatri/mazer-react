export type BeatPattern = {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  patterns: {
    kick: boolean[];
    snare: boolean[];
    hihat: boolean[];
    [key: string]: boolean[]; // Allow additional patterns
  };
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
};

export type BeatPatternPartial = Partial<BeatPattern> & {
  id: string; // At least require ID
};

export type NewBeatPattern = Omit<BeatPattern, 'id' | 'createdAt' | 'updatedAt'>;
