import { db } from '$lib/db';
import type { FocusLevel } from '$lib/types';
import { focusLevels } from './levels';
import { calculateStars, selectBestSession } from '$lib/utils/gamification';

// Function to check task completion for a specific level
export async function checkTaskCompletion(levelId: string): Promise<Record<string, boolean>> {
    const level = focusLevels.find(l => l.id === levelId);
    if (!level) return {};
    
    const sessions = await db.sessions.where('levelId').equals(levelId).toArray();
    const taskCompletion: Record<string, boolean> = {};
    
    // Check each task based on its ID
    for (const task of level.completionTasks) {
        switch (task.id) {
            case 'complete_2_sessions':
                taskCompletion[task.id] = sessions.length >= 2;
                break;
            case 'complete_3_sessions':
                taskCompletion[task.id] = sessions.length >= 3;
                break;
            case 'tap_once':
                taskCompletion[task.id] = sessions.some(s => s.tapCount > 0);
                break;
            case 'no_early_exit':
                taskCompletion[task.id] = sessions.some(s => s.completed);
                break;
            case 'max_duration':
                taskCompletion[task.id] = sessions.some(s => s.duration >= level.maxDuration);
                break;
            case 'improve_tap_count':
                // This requires comparing tap counts across sessions
                if (sessions.length >= 3) {
                    const sortedSessions = [...sessions].sort((a, b) => a.timestamp - b.timestamp);
                    let improvements = 0;
                    for (let i = 1; i < sortedSessions.length; i++) {
                        if (sortedSessions[i].tapCount < sortedSessions[i-1].tapCount) {
                            improvements++;
                        }
                    }
                    taskCompletion[task.id] = improvements >= 2;
                } else {
                    taskCompletion[task.id] = false;
                }
                break;
            case 'session_under_5_taps':
                taskCompletion[task.id] = sessions.some(s => s.tapCount <= 5);
                break;
            case '2_sessions_under_8_taps':
                const sessionsUnder8Taps = sessions.filter(s => s.tapCount <= 8);
                taskCompletion[task.id] = sessionsUnder8Taps.length >= 2;
                break;
            case 'one_min_no_taps':
                // This requires checking if there's a 60-second period without taps
                taskCompletion[task.id] = sessions.some(s => {
                    if (s.tapTimestamps.length === 0) return true;
                    if (s.tapTimestamps.length === 1) return s.tapTimestamps[0] > 60 || s.duration - s.tapTimestamps[0] > 60;
                    
                    // Check gaps between consecutive taps
                    for (let i = 0; i < s.tapTimestamps.length - 1; i++) {
                        if (s.tapTimestamps[i+1] - s.tapTimestamps[i] > 60) {
                            return true;
                        }
                    }
                    
                    // Check gap at the beginning and end
                    if (s.tapTimestamps[0] > 60 || s.duration - s.tapTimestamps[s.tapTimestamps.length - 1] > 60) {
                        return true;
                    }
                    
                    return false;
                });
                break;
            default:
                taskCompletion[task.id] = false;
        }
    }
    
    return taskCompletion;
}

// Function to get level unlock status and progress
export async function getLevelStatuses(): Promise<Array<{
    level: FocusLevel;
    isUnlocked: boolean;
    progress?: {
        sessionsCompleted: number;
        requiredSessions: number;
        improvementNeeded?: number;
    };
    taskCompletion?: Record<string, boolean>;
    starRating?: number;
    bestSession?: { tapCount: number; duration: number } | null;
}>> {
    // Level 1 is always unlocked
    const l1Sessions = await db.sessions.where('levelId').equals('L1').toArray();
    const l1TaskCompletion = await checkTaskCompletion('L1');
    
    // Calculate star rating using the new gamification utilities
    const l1CompletedTaskIds = new Set(
        Object.entries(l1TaskCompletion)
            .filter(([_, completed]) => completed)
            .map(([taskId]) => taskId)
    );
    
    // For per-session task completion, we need to determine which tasks were completed in each session
    // This is a simplified approach - in a real implementation, you would track this per session
    const l1PerSessionCompleted: Set<string>[] = l1Sessions.map(session => {
        const sessionCompletedTasks = new Set<string>();
        
        // Add tasks that are completed based on this specific session
        if (session.tapCount > 0) sessionCompletedTasks.add('tap_once');
        if (session.completed) sessionCompletedTasks.add('no_early_exit');
        if (session.duration >= focusLevels[0].maxDuration) sessionCompletedTasks.add('max_duration');
        
        return sessionCompletedTasks;
    });
    
    const l1StarRating = calculateStars(
        focusLevels[0].starRules,
        l1CompletedTaskIds,
        l1PerSessionCompleted
    );
    
    // Get the best session for Level 1
    const l1BestSession = selectBestSession(l1Sessions);
    
    const l1Status = {
        level: focusLevels[0],
        isUnlocked: true,
        progress: {
            sessionsCompleted: l1Sessions.length,
            requiredSessions: 2
        },
        taskCompletion: l1TaskCompletion,
        starRating: l1StarRating,
        bestSession: l1BestSession
    };
    
    // Check Level 2
    const l2Sessions = await db.sessions.where('levelId').equals('L2').toArray();
    const l2TaskCompletion = await checkTaskCompletion('L2');
    
    // Calculate star rating for Level 2
    const l2CompletedTaskIds = new Set(
        Object.entries(l2TaskCompletion)
            .filter(([_, completed]) => completed)
            .map(([taskId]) => taskId)
    );
    
    const l2PerSessionCompleted: Set<string>[] = l2Sessions.map(session => {
        const sessionCompletedTasks = new Set<string>();
        
        // Add tasks that are completed based on this specific session
        if (session.tapCount <= 5) sessionCompletedTasks.add('session_under_5_taps');
        if (session.duration >= focusLevels[1].maxDuration) sessionCompletedTasks.add('max_duration');
        
        return sessionCompletedTasks;
    });
    
    const l2StarRating = calculateStars(
        focusLevels[1].starRules,
        l2CompletedTaskIds,
        l2PerSessionCompleted
    );
    
    // Get the best session for Level 2
    const l2BestSession = selectBestSession(l2Sessions);
    
    // Level 2 is unlocked if Level 1 has 2 or more stars
    const l2IsUnlocked = l1StarRating >= 2;
    
    const l2Status = {
        level: focusLevels[1],
        isUnlocked: l2IsUnlocked,
        progress: {
            sessionsCompleted: l2Sessions.length,
            requiredSessions: 3
        },
        taskCompletion: l2TaskCompletion,
        starRating: l2StarRating,
        bestSession: l2BestSession
    };
    
    // Check Level 3
    const l3Sessions = await db.sessions.where('levelId').equals('L3').toArray();
    const successfulL3Sessions = l3Sessions.filter(s => s.tapCount <= 3);
    
    const l3TaskCompletion = await checkTaskCompletion('L3');
    
    // Calculate star rating for Level 3
    const l3CompletedTaskIds = new Set(
        Object.entries(l3TaskCompletion)
            .filter(([_, completed]) => completed)
            .map(([taskId]) => taskId)
    );
    
    const l3PerSessionCompleted: Set<string>[] = l3Sessions.map(session => {
        const sessionCompletedTasks = new Set<string>();
        
        // Add tasks that are completed based on this specific session
        if (session.tapCount <= 8) sessionCompletedTasks.add('2_sessions_under_8_taps');
        if (session.duration >= focusLevels[2].maxDuration) sessionCompletedTasks.add('max_duration');
        
        // Check for one_min_no_taps
        if (session.tapTimestamps.length === 0) {
            sessionCompletedTasks.add('one_min_no_taps');
        } else if (session.tapTimestamps.length === 1) {
            if (session.tapTimestamps[0] > 60 || session.duration - session.tapTimestamps[0] > 60) {
                sessionCompletedTasks.add('one_min_no_taps');
            }
        } else {
            // Check gaps between consecutive taps
            for (let i = 0; i < session.tapTimestamps.length - 1; i++) {
                if (session.tapTimestamps[i+1] - session.tapTimestamps[i] > 60) {
                    sessionCompletedTasks.add('one_min_no_taps');
                    break;
                }
            }
            
            // Check gap at the beginning and end
            if (session.tapTimestamps[0] > 60 || session.duration - session.tapTimestamps[session.tapTimestamps.length - 1] > 60) {
                sessionCompletedTasks.add('one_min_no_taps');
            }
        }
        
        return sessionCompletedTasks;
    });
    
    const l3StarRating = calculateStars(
        focusLevels[2].starRules,
        l3CompletedTaskIds,
        l3PerSessionCompleted
    );
    
    // Get the best session for Level 3
    const l3BestSession = selectBestSession(l3Sessions);
    
    // Level 3 is unlocked if Level 2 has 2 or more stars
    const l3IsUnlocked = l2StarRating >= 2;
    
    const l3Status = {
        level: focusLevels[2],
        isUnlocked: l3IsUnlocked,
        progress: {
            sessionsCompleted: successfulL3Sessions.length,
            requiredSessions: 2
        },
        taskCompletion: l3TaskCompletion,
        starRating: l3StarRating,
        bestSession: l3BestSession
    };
    
    return [l1Status, l2Status, l3Status];
} 