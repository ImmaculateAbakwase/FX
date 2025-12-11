// types/video-management.types.ts

export interface VideoFormData {
  title: string;
  description: string;
  category: string;
  genre: string[];
  thumbnail: File | null;
  trailer: File | null;
  videoFile: File | null;
  accessType: string;
  regionLocks: string[];
  ageRating: string;
  subtitles: File[];
}

export interface EpisodeFormData {
  seriesId: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  description: string;
  videoFile: File | null;
  thumbnail: File | null;
  subtitles: File[];
  accessType: string;
  duration: string;
}

export interface LiveEventFormData {
  title: string;
  description: string;
  poster: File | null;
  price: string;
  isPPV: boolean;
  scheduledTime: string;
  scheduledDate: string;
  regionRestrictions: string[];
  ageRating: string;
  streamUrl: string;
}

export interface GameFormData {
  title: string;
  description: string;
  category: string;
  thumbnail: File | null;
  gameFile: File | null;
  isHTML5: boolean;
  tags: string[];
  ageRating: string;
  metadata: string;
}

export const VIDEO_CATEGORIES = [
  'Movie',
  'Series',
  'Documentary',
  'Show',
  'Trailer',
  'Original Content'
] as const;

export const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Thriller',
  'Documentary',
  'Animation',
  'Adventure'
] as const;

export const REGIONS = [
  'US',
  'UK',
  'EU',
  'Asia',
  'Africa',
  'South America',
  'Australia'
] as const;

export const AGE_RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-MA'] as const;

export const GAME_CATEGORIES = [
  'Action',
  'Puzzle',
  'Adventure',
  'Racing',
  'Sports',
  'Strategy'
] as const;

export const GAME_TAGS = [
  'Multiplayer',
  'Single Player',
  '3D',
  '2D',
  'Casual',
  'Competitive'
] as const;

export const GAME_AGE_RATINGS = [
  'E',
  'E10+',
  'T',
  'M'
] as const;