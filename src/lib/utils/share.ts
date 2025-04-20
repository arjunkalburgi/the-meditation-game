import type { MeditationResults } from '$lib/types';

/**
* Builds a share text message based on meditation results using Dr. Rao's templates
*/
export function buildShareText(results: MeditationResults): string {
    const minutes = Math.floor(results.durationMeditated / 60);
    const mindWanders = results.clickTimestamps.length;
    const starsGained = results.newStarRating - results.previousStarRating;
    const baseUrl = 'https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share';
    
    // Template A - New star earned
    if (starsGained > 0) {
        return `🧘‍♂️  I just earned a new ⭐ in The Meditation Game!
First time I kept focus for a full minute without drifting.
Took only ${minutes} min and my mind feels lighter already.
Sit with me tomorrow?  ${baseUrl}`;
    }
    
    // Template B - Personal best achieved
    if (results.isNewPersonalBest) {
        const mindWanderText = mindWanders === 1 ? 'mind-wander' : 'mind-wanders';
        return `Mini‑win in The Meditation Game: my new personal best!
        ${minutes}‑min sit • only ${mindWanders} ${mindWanderText} • ${results.newStarRating}/3 ⭐ on this level
Care to beat my score or just breathe with me?  ${baseUrl}`;
    }
    
    // Template C - Regular session (fallback)
    return `Another calm ${minutes}‑min sit in The Meditation Game.
Feeling clearer already. Join me?  ${baseUrl}`;
}

/**
* Determines which template was used for analytics
*/
export function getTemplateUsed(results: MeditationResults): 'A' | 'B' | 'C' {
    const starsGained = results.newStarRating - results.previousStarRating;
    
    if (starsGained > 0) return 'A';
    if (results.isNewPersonalBest) return 'B';
    return 'C';
} 