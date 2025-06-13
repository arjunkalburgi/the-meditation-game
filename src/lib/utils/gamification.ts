import type { StarRule, Requirement } from '$lib/types/gamification';
import type { MeditationSession } from '$lib/types';

/**
* SQL equivalent for future Supabase migration:
* 
* SELECT tapCount, duration
* FROM meditationSessions
* WHERE levelId = :levelId AND completed = true
* ORDER BY duration DESC, tapCount ASC, timestamp DESC
* LIMIT 1;
*/
export function selectBestSession(sessions: MeditationSession[]): { tapCount: number; duration: number } | null {
    return sessions
        .filter(s => s.completed)
        .sort((a, b) =>
            b.duration !== a.duration
                ? b.duration - a.duration
                : a.tapCount !== b.tapCount
                ? a.tapCount - b.tapCount
                : b.timestamp - a.timestamp
        )[0] ?? null;
}

/**
* Evaluates a single star rule against completed tasks
* 
* @param rule The star rule to evaluate
* @param cumulativeCompleted Set of all completed task IDs across all sessions
* @param perSessionCompleted Array of Sets, each containing task IDs completed in a single session
* @returns Whether the rule is satisfied
* 
* Note: This function is designed to be easily ported to SQL in the future.
* For SQL implementation, the logic will remain the same, but will be executed
* on the server side using SQL queries.
*/
export function evaluateRule(
    rule: StarRule,
    cumulativeCompleted: Set<string>,
    perSessionCompleted: Set<string>[]
): boolean {
    const { scope, requirement } = rule;
    
    // For cumulative scope, evaluate against all completed tasks
    if (scope === 'cumulative') {
        return evaluateRequirement(requirement, cumulativeCompleted);
    }
    
    // For singleSession scope, check if any session individually satisfies the rule
    return perSessionCompleted.some(sessionCompleted => 
        evaluateRequirement(requirement, sessionCompleted)
    );
}

/**
* Evaluates a requirement against a set of completed task IDs
*/
function evaluateRequirement(
    requirement: Requirement,
    completedTasks: Set<string>
): boolean {
    if (requirement.type === 'minTasks') {
        const { count, from } = requirement;
        
        // If 'all' is specified, check against all tasks
        if (from === 'all') {
            return completedTasks.size >= count;
        }
        
        // Otherwise, check against specific tasks
        const completedFromSet = from.filter(taskId => completedTasks.has(taskId));
        return completedFromSet.length >= count;
    }
    
    if (requirement.type === 'specificTasks') {
        // All specified tasks must be completed
        return requirement.taskIds.every(taskId => completedTasks.has(taskId));
    }
    
    return false;
}

/**
* Calculates the highest star rating based on completed tasks
* 
* @param starRules Array of star rules to evaluate
* @param cumulativeCompleted Set of all completed task IDs across all sessions
* @param perSessionCompleted Array of Sets, each containing task IDs completed in a single session
* @returns The highest star rating (0-3) that can be awarded
*/
export function calculateStars(
    starRules: StarRule[],
    cumulativeCompleted: Set<string>,
    perSessionCompleted: Set<string>[]
): 0 | 1 | 2 | 3 {
    // Sort rules by stars in descending order to evaluate highest first
    const sortedRules = [...starRules].sort((a, b) => b.stars - a.stars);
    
    // Find the first rule that is satisfied
    for (const rule of sortedRules) {
        if (evaluateRule(rule, cumulativeCompleted, perSessionCompleted)) {
            return rule.stars;
        }
    }
    
    // No rules satisfied
    return 0;
} 

/**
 * Counts how many times the user improved their tap rate (taps per minute)
 * across sessions, compared to the previous session.
 * 
 * Improvement is defined as a lower tap rate, or same tap rate with longer duration.
 */
export function countImprovements(sessions: MeditationSession[]): number {
    if (sessions.length < 2) return 0;

    const sorted = [...sessions].sort((a, b) => a.timestamp - b.timestamp);
    let improvements = 0;

    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1];
        const curr = sorted[i];

        const prevRate = prev.tapCount / Math.max(prev.duration, 1);
        const currRate = curr.tapCount / Math.max(curr.duration, 1);

        if (currRate < prevRate) {
            improvements++;
        } else if (
            Math.abs(currRate - prevRate) <= 0.005 &&
            curr.duration > prev.duration
        ) {
            improvements++;
        }
    }

    return improvements;
}

/**
 * Returns the longest streak (in minutes) of no taps during a session.
 * Assumes session.tapTimestamps is sorted and session.duration is in seconds.
 */
export function longestNoTapStreak(session: MeditationSession): number {
    if (!session.tapTimestamps || session.tapTimestamps.length === 0) {
        return session.duration / 60; // no taps at all — entire session is a streak
    }

    const gaps: number[] = [];

    // Start to first tap
    gaps.push(session.tapTimestamps[0]);

    // Between taps
    for (let i = 1; i < session.tapTimestamps.length; i++) {
        gaps.push(session.tapTimestamps[i] - session.tapTimestamps[i - 1]);
    }

    // Last tap to end of session
    const lastTap = session.tapTimestamps[session.tapTimestamps.length - 1];
    gaps.push(session.duration - lastTap);

    const maxGapSeconds = Math.max(...gaps);
    return maxGapSeconds / 60;
}

export const countMatching = (sessions: MeditationSession[], fn: (s: MeditationSession) => boolean) =>
    sessions.filter(fn).length;

export const anyMatching = (sessions: MeditationSession[], fn: (s: MeditationSession) => boolean) =>
    sessions.some(fn);