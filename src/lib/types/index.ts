declare global {
    interface Window {
        audioContext?: AudioContext;
    }
}

export interface MeditationResults {
    clickTimestamps: number[], 
    durationMeditated: number, 
    completed: boolean,
    levelId: string,
    previousStarRating: 0 | 1 | 2 | 3,
    newStarRating: 0 | 1 | 2 | 3,
    newlyCompletedTasks: string[],
    completionTaskResults: Record<string, boolean>,
    isNewPersonalBest: boolean,
    personalBest: { tapCount: number; duration: number } | null
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