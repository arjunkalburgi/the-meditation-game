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
            completed: ok
        };
    },
    
    session_with_3_or_fewer_taps: (sessions) => {
        const ok = anyMatching(sessions, s => s.tapCount <= 3);
        return {
            completed: ok
        };
    },
    
    distractions_early_on: ([first]) => ({
        completed: first?.tapTimestamps?.filter(t => t <= 60).length >= 2,
    }),
    
    complete_2_sessions: (sessions) => ({
        completed: sessions.length >= 2,
        info: sessions.length === 0 || sessions.length >= 2 ? undefined : `1/2 complete`,
    }),
    
    complete_3_sessions: (sessions) => ({
        completed: sessions.length >= 3,
        info: sessions.length === 0 || sessions.length >= 3 ? undefined : `${sessions.length}/3 complete`,
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
            info: sessions.length === 0 || streak === 2 ? undefined : `${Math.min(streak, 1)}/2 complete`,
        };
    },
    
    two_sessions_under_8_taps: (sessions) => {
        const count = countMatching(sessions, s => s.tapCount <= 8);
        return {
            completed: count >= 2,
            info: sessions.length === 0 || count >= 2 ? undefined : `${count}/2 complete`,
        };
    },
    
    one_min_no_taps: (sessions) => {
        const ok = anyMatching(sessions, s => longestNoTapStreak(s) >= 60);
        return {
            completed: ok
        };
    },
    
    one_min_no_taps_twice: (sessions) => {
        const count = countMatching(sessions, s => longestNoTapStreak(s) >= 60);
        return {
            completed: count >= 2,
            info: sessions.length === 0 || count >= 2 ? undefined : `${count}/2 complete`,
        };
    },
    
    two_min_no_taps: (sessions) => {
        const ok = anyMatching(sessions, s => longestNoTapStreak(s) >= 120);
        return {
            completed: ok
        };
    },
    
    three_min_no_taps: (sessions) => {
        const ok = anyMatching(sessions, s => longestNoTapStreak(s) >= 180);
        return {
            completed: ok
        };
    },
    
    improve_tap_count_2_sessions: (sessions) => {
        const improved = countImprovements(sessions);
        return {
            completed: improved >= 2,
            info: sessions.length === 0 || improved >= 2 ? undefined : `${improved}/2 complete`,
        };
    },
    
    max_duration: (sessions, level) => {
        const ok = sessions.some(s => s.duration >= level.maxDuration);
        return {
            completed: ok
        };
    },
};