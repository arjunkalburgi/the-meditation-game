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