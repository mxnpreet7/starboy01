export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  mode: 'synth' | 'silent';
  hasInteracted: boolean;
}

export type SectionId = 
  | 'hero'
  | 'identity'
  | 'personality'
  | 'why-starboy'
  | 'music'
  | 'books'
  | 'style'
  | 'technology'
  | 'super60'
  | 'athletes'
  | 'travel'
  | 'belief'
  | 'philosophy'
  | 'social'
  | 'final';

export interface EasterEggNotification {
  id: string;
  title: string;
  message: string;
  badge?: string;
}
