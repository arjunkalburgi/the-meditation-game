import { db } from '$lib/db';
import type { FocusLevel, MeditationSession } from '$lib/types';
import { focusLevels } from './levels';
import { calculateStars } from '$lib/gamification';

// Helper function to execute a query and return a single result
async function executeQuery(query: string): Promise<any> {
    // This is a simplified implementation that maps SQL-like syntax to Dexie
    // In a real implementation, you would parse the SQL and convert it to Dexie operations
    
    if (query.includes('COUNT(*)') && query.includes('levelId = \'L1\'')) {
        return await db.sessions.where('levelId').equals('L1').count();
    }
    
    if (query.includes('COUNT(*)') && query.includes('levelId = \'L2\'')) {
        return await db.sessions.where('levelId').equals('L2').count();
    }
    
    if (query.includes('COUNT(*)') && query.includes('levelId = \'L3\'') && query.includes('tapCount <= 3')) {
        return await db.sessions.where('levelId').equals('L3').filter(s => s.tapCount <= 3).count();
    }
    
    if (query.includes('AVG(tapCount)') && query.includes('levelId = \'L1\'')) {
        const sessions = await db.sessions.where('levelId').equals('L1').toArray();
        if (sessions.length === 0) return 0;
        return sessions.reduce((sum, s) => sum + s.tapCount, 0) / sessions.length;
    }
    
    if (query.includes('AVG(tapCount)') && query.includes('levelId = \'L2\'')) {
        const sessions = await db.sessions.where('levelId').equals('L2').toArray();
        if (sessions.length === 0) return 0;
        return sessions.reduce((sum, s) => sum + s.tapCount, 0) / sessions.length;
    }
    
    return null;
}

// Function to check if Level 2 is unlocked
export async function isLevel2Unlocked(): Promise<boolean> {
    const l1SessionCount = await executeQuery("SELECT COUNT(*) as l1_session_count FROM sessions WHERE levelId = 'L1'");
    const l2SessionCount = await executeQuery("SELECT COUNT(*) as l2_session_count FROM sessions WHERE levelId = 'L2'");
    const l1AvgTaps = await executeQuery("SELECT AVG(tapCount) as l1_avg_taps FROM sessions WHERE levelId = 'L1'");
    const l2AvgTaps = await executeQuery("SELECT AVG(tapCount) as l2_avg_taps FROM sessions WHERE levelId = 'L2'");
    
    return l1SessionCount >= 3 && l2SessionCount >= 3 && l2AvgTaps < l1AvgTaps * 0.9;
}

// Function to check if Level 3 is unlocked
export async function isLevel3Unlocked(): Promise<boolean> {
    const successfulL3Count = await executeQuery("SELECT COUNT(*) as successful_l3_count FROM sessions WHERE levelId = 'L3' AND tapCount <= 3");
    
    return successfulL3Count >= 2;
}

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
    
    const l1Status = {
        level: focusLevels[0],
        isUnlocked: true,
        progress: {
            sessionsCompleted: l1Sessions.length,
            requiredSessions: 2
        },
        taskCompletion: l1TaskCompletion,
        starRating: l1StarRating
    };
    
    // Check Level 2
    const l2Sessions = await db.sessions.where('levelId').equals('L2').toArray();
    const l1AvgTaps = l1Sessions.length > 0 
    ? l1Sessions.reduce((sum, s) => sum + s.tapCount, 0) / l1Sessions.length 
    : 0;
    const l2AvgTaps = l2Sessions.length > 0 
    ? l2Sessions.reduce((sum, s) => sum + s.tapCount, 0) / l2Sessions.length 
    : Infinity;
    
    const l2IsUnlocked = await isLevel2Unlocked();
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
    
    const l2Status = {
        level: focusLevels[1],
        isUnlocked: l2IsUnlocked,
        progress: {
            sessionsCompleted: l2Sessions.length,
            requiredSessions: 3,
            improvementNeeded: l2Sessions.length >= 3 ? l1AvgTaps * 0.9 - l2AvgTaps : undefined
        },
        taskCompletion: l2TaskCompletion,
        starRating: l2StarRating
    };
    
    // Check Level 3
    const l3Sessions = await db.sessions.where('levelId').equals('L3').toArray();
    const successfulL3Sessions = l3Sessions.filter(s => s.tapCount <= 3);
    
    const l3IsUnlocked = await isLevel3Unlocked();
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
    
    const l3Status = {
        level: focusLevels[2],
        isUnlocked: l3IsUnlocked,
        progress: {
            sessionsCompleted: successfulL3Sessions.length,
            requiredSessions: 2
        },
        taskCompletion: l3TaskCompletion,
        starRating: l3StarRating
    };
    
    return [l1Status, l2Status, l3Status];
} 