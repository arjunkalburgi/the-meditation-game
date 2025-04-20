import type { StarRule } from './types/gamification';

declare global {
    interface Window {
        audioContext?: AudioContext;
    }
}

export interface MeditationResults {
    clickTimestamps: number[], 
    durationMeditated: number, 
    completed: boolean 
}

export enum MeditationDuration {
    ONE_MINUTE = 60,
    TWO_MINUTES = 120,
    FIVE_MINUTES = 300,
    TEN_MINUTES = 600,
    FIFTEEN_MINUTES = 900,
    THIRTY_MINUTES = 1800,
    SIXTY_MINUTES = 3600
}

export const DURATION_LABELS: Record<MeditationDuration, string> = {
    [MeditationDuration.ONE_MINUTE]: '1 minute',
    [MeditationDuration.TWO_MINUTES]: '2 minutes',
    [MeditationDuration.FIVE_MINUTES]: '5 minutes',
    [MeditationDuration.TEN_MINUTES]: '10 minutes',
    [MeditationDuration.FIFTEEN_MINUTES]: '15 minutes',
    [MeditationDuration.THIRTY_MINUTES]: '30 minutes',
    [MeditationDuration.SIXTY_MINUTES]: '60 minutes'
};

export interface MeditationSession {
    id?: number;
    levelId: string;
    tapCount: number;
    duration: number;
    tapTimestamps: number[];
    timestamp: number;
    completed: boolean;
}

export type FocusLevel = {
    id: string;
    name: string;
    minDuration: MeditationDuration;
    maxDuration: MeditationDuration;
    description: string;
    instructions: string[];
    completionTasks: Array<{
        id: string;
        description: string;
    }>;
    starRules: StarRule[];
};  