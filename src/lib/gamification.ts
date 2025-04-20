import type { StarRule, Requirement } from './types/gamification';
import type { MeditationSession } from './types';

/**
* SQL equivalent for future Supabase migration:
* 
* SELECT tapCount, duration
* FROM meditationSessions
* WHERE levelId = :levelId AND completed = true
* ORDER BY tapCount ASC, duration DESC, timestamp DESC
* LIMIT 1;
*/
export function selectBestSession(sessions: MeditationSession[]): { tapCount: number; duration: number } | null {
    return sessions
    .filter(s => s.completed)
    .sort((a, b) =>
        a.tapCount !== b.tapCount
    ? a.tapCount - b.tapCount
    : b.duration !== a.duration
    ? b.duration - a.duration
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