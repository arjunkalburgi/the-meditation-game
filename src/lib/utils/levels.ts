import type { FocusLevel } from '$lib/types';
import { MeditationDuration } from '$lib/types';
import { db } from '$lib/db';

export const focusLevels: FocusLevel[] = [
    {
        id: "L1",
        name: "The First Catch",
        minDuration: MeditationDuration.ONE_MINUTE,
        maxDuration: MeditationDuration.FIVE_MINUTES,
        description: "Notice distraction without judgment.",
        unlockCriteria: async (sessions) => {
            const l1Sessions = await db.sessions.where('levelId').equals('L1').toArray();
            return l1Sessions.length >= 2;
        },
    },
    {
        id: "L2",
        name: "Hold the Thread",
        minDuration: MeditationDuration.FIVE_MINUTES,
        maxDuration: MeditationDuration.FIFTEEN_MINUTES,
        description: "Gently return the mind to focus.",
        unlockCriteria: async (sessions) => {
            const l1Sessions = await db.sessions.where('levelId').equals('L1').toArray();
            if (l1Sessions.length < 3) return false;
            
            const l1Avg = l1Sessions.reduce((sum, s) => sum + s.tapCount, 0) / l1Sessions.length;
            const l2Sessions = await db.sessions.where('levelId').equals('L2').toArray();
            if (l2Sessions.length < 3) return false;
            
            const l2Avg = l2Sessions.reduce((sum, s) => sum + s.tapCount, 0) / l2Sessions.length;
            return l2Avg < l1Avg * 0.9;
        }
    },
    {
        id: "L3",
        name: "Steady Beam",
        minDuration: MeditationDuration.TEN_MINUTES,
        maxDuration: MeditationDuration.THIRTY_MINUTES,
        description: "Felt sense of continuity and confidence.",
        unlockCriteria: async (sessions) => {
            const l3Sessions = await db.sessions.where('levelId').equals('L3').toArray();
            const successful = l3Sessions.filter(s => s.tapCount <= 3);
            return successful.length >= 2;
        }
    }
]; 