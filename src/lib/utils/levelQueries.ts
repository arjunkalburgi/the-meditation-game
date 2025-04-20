import { db } from '$lib/db';
import type { FocusLevel } from '$lib/types';
import { focusLevels } from './levels';

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

// Function to get level unlock status and progress
export async function getLevelStatuses(): Promise<Array<{
    level: FocusLevel;
    isUnlocked: boolean;
    progress?: {
        sessionsCompleted: number;
        requiredSessions: number;
        improvementNeeded?: number;
    };
}>> {
    // Level 1 is always unlocked
    const l1Sessions = await db.sessions.where('levelId').equals('L1').toArray();
    const l1Status = {
        level: focusLevels[0],
        isUnlocked: true,
        progress: {
            sessionsCompleted: l1Sessions.length,
            requiredSessions: 2
        }
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
    const l2Status = {
        level: focusLevels[1],
        isUnlocked: l2IsUnlocked,
        progress: {
            sessionsCompleted: l2Sessions.length,
            requiredSessions: 3,
            improvementNeeded: l2Sessions.length >= 3 ? l1AvgTaps * 0.9 - l2AvgTaps : undefined
        }
    };
    
    // Check Level 3
    const l3Sessions = await db.sessions.where('levelId').equals('L3').toArray();
    const successfulL3Sessions = l3Sessions.filter(s => s.tapCount <= 3);
    
    const l3IsUnlocked = await isLevel3Unlocked();
    const l3Status = {
        level: focusLevels[2],
        isUnlocked: l3IsUnlocked,
        progress: {
            sessionsCompleted: successfulL3Sessions.length,
            requiredSessions: 2
        }
    };
    
    return [l1Status, l2Status, l3Status];
} 