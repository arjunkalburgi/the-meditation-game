import type { MeditationSession } from '$lib/types';
import type { TaskCompletionStatus, FocusLevel } from '$lib/types/gamification';
import { countImprovements, longestNoTapStreak, countMatching, anyMatching } from './gamification';

export const taskEvaluators: Record< string, (sessions: MeditationSession[], level: FocusLevel) => TaskCompletionStatus> = {
    tap_once: ([first]) => ({
        completed: first?.tapCount >= 1,
    }),
    
    no_early_exit: ([first]) => ({
        completed: first?.completed === true,
    }),
    
    session_under_5_taps: ([first]) => ({
        completed: first?.tapCount <= 5,
    }),
    
    session_with_2_or_fewer_taps: (sessions) => {
        const ok = anyMatching(sessions, s => s.tapCount <= 2);
        return {
            completed: ok,
            info: ok ? undefined : 'Need session with ≤2 taps',
        };
    },
    
    session_with_3_or_fewer_taps: (sessions) => {
        const ok = anyMatching(sessions, s => s.tapCount <= 3);
        return {
            completed: ok,
            info: ok ? undefined : 'Need session with ≤3 taps',
        };
    },
    
    distractions_early_on: ([first]) => ({
        completed: first?.tapTimestamps?.filter(t => t <= 60).length >= 2,
    }),
    
    complete_2_sessions: (sessions) => ({
        completed: sessions.length >= 2,
        info: sessions.length >= 2 ? undefined : `${2 - sessions.length} sessions left`,
    }),
    
    complete_3_sessions: (sessions) => ({
        completed: sessions.length >= 3,
        info: sessions.length >= 3 ? undefined : `${3 - sessions.length} sessions left`,
    }),
    
    two_sessions_under_5_taps: (sessions) => {
        let streak = 0;
        for (let i = sessions.length - 1; i >= 0; i--) {
            if (sessions[i].tapCount < 5) {
                streak++;
                if (streak === 2) break;
            } else {
                streak = 0;
            }
        }
        return {
            completed: streak === 2,
            info: streak === 2 ? undefined : `${2 - streak} in-a-row sessions left`,
        };
    },
    
    two_sessions_under_8_taps: (sessions) => {
        const count = countMatching(sessions, s => s.tapCount <= 8);
        return {
            completed: count >= 2,
            info: count >= 2 ? undefined : `${2 - count} sessions left`,
        };
    },
    
    one_min_no_taps: (sessions) => {
        const ok = anyMatching(sessions, s => longestNoTapStreak(s) >= 60);
        return {
            completed: ok,
            info: ok ? undefined : 'Need 1 minute without taps',
        };
    },
    
    one_min_no_taps_twice: (sessions) => {
        const count = countMatching(sessions, s => longestNoTapStreak(s) >= 60);
        return {
            completed: count >= 2,
            info: count >= 2 ? undefined : `${2 - count} sessions left`,
        };
    },
    
    two_min_no_taps: (sessions) => {
        const ok = anyMatching(sessions, s => longestNoTapStreak(s) >= 120);
        return {
            completed: ok,
            info: ok ? undefined : 'Need 2 minutes without taps',
        };
    },
    
    three_min_no_taps: (sessions) => {
        const ok = anyMatching(sessions, s => longestNoTapStreak(s) >= 180);
        return {
            completed: ok,
            info: ok ? undefined : 'Need 3 minutes without taps',
        };
    },
    
    improve_tap_count_2_sessions: (sessions) => {
        const improved = countImprovements(sessions);
        return {
            completed: improved >= 2,
            info: improved >= 2 ? undefined : `${2 - improved} improvements left`,
        };
    },
    
    max_duration: (sessions, level) => {
        const ok = sessions.some(s => s.duration >= level.maxDuration);
        return {
            completed: ok,
            info: ok ? undefined : 'Need session at max duration',
        };
    },
};