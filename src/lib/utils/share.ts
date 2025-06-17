import type { MeditationResults } from '$lib/types';

/**
* Builds a share text message based on meditation results using Dr. Rao's templates
*/
export function buildShareText(results: MeditationResults): string {
    const minutes = Math.floor(results.durationMeditated / 60);
    const mindWanders = results.clickTimestamps.length;
    const starsGained = results.newStarRating - results.previousStarRating;
    const baseUrl = 'https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share';
    const levelNum = results.levelId.replace(/^\D+/g, '');
    const tasksStr = Object.entries(results.completionTaskResults).map(t => t[1] ? '✅' : '🔲').join('')
    
    // Template A - New star earned
    if (starsGained > 0) {
        return `Major win! 🧘‍♂️  I just earned a new ⭐ in The Meditation Game!
I did a ${minutes}‑min meditation with only ${mindWanders} distractions.
I'm at ${'⭐'.repeat(results.newStarRating)} on Level ${levelNum} (${tasksStr})!
Learn and practice meditation here: ${baseUrl}`;
    }
    
    // Template B - Personal best achieved
    if (results.isNewPersonalBest) {
        const mindWanderText = mindWanders === 1 ? 'mind-wander' : 'mind-wanders';
        return `Mini‑win in The Meditation Game: my new personal best!
${minutes}‑min sit • only ${mindWanders} ${mindWanderText} • ${'⭐'.repeat(results.newStarRating)} on Level ${levelNum} (${tasksStr})
Learn and practice meditation here: ${baseUrl}`;
    }
    
    // Template C - Regular session (fallback)
    return `Sharing todays practice in The Meditation Game.
I did a ${minutes}‑min meditation with only ${mindWanders} distractions.
I'm at ${'⭐'.repeat(results.newStarRating)} on Level ${levelNum} (${tasksStr}).
Learn and practice meditation here: ${baseUrl}`;
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