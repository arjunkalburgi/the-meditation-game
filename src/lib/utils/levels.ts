import type { FocusLevel } from '$lib/types';
import { MeditationDuration } from '$lib/types';
import { db } from '$lib/db';

export const focusLevels: FocusLevel[] = [
    {
        id: "L1",
        name: "Start here",
        minDuration: MeditationDuration.ONE_MINUTE,
        maxDuration: MeditationDuration.FIVE_MINUTES,
        description: "Notice distraction without judgment.",
        instructions: [
            "Sit comfortably and bring your attention to the breath",
            "Feel the air move through your nose as you breathe",
            "Tap when you notice the mind has wandered",
            "Every tap is a sign of awareness — it means you're learning",
            "You're not here to be perfect. Just to begin."
        ],
        unlockCriteria: async (sessions) => {
            const l1Sessions = await db.sessions.where('levelId').equals('L1').toArray();
            return l1Sessions.length >= 2;
        },
    },
    {
        id: "L2",
        name: "Keep improving",
        minDuration: MeditationDuration.FIVE_MINUTES,
        maxDuration: MeditationDuration.FIFTEEN_MINUTES,
        description: "Gently return the mind to focus.",
        instructions: [
            "Bring your attention to the feeling of the breath",
            "Notice when thoughts pull you away, and tap when they do",
            "Gently return your focus to the breath, again and again",
            "Let the practice be steady, not strict",
            "You're building the habit of coming back."
        ],
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
        name: "Focus power",
        minDuration: MeditationDuration.TEN_MINUTES,
        maxDuration: MeditationDuration.THIRTY_MINUTES,
        description: "Feel a sense of continuity and confidence.",
        instructions: [
            "Rest your mind on the breath like a steady beam of light",
            "If the mind wanders, tap to acknowledge, then return",
            "Let distractions come and go — stay grounded in breath",
            "You're developing continuity — not by force, but by ease",
            "Allow the mind to settle. You're ready for this."
        ],
        unlockCriteria: async (sessions) => {
            const l3Sessions = await db.sessions.where('levelId').equals('L3').toArray();
            const successful = l3Sessions.filter(s => s.tapCount <= 3);
            return successful.length >= 2;
        }
    }
]; 