import type { MeditationSession } from '$lib/types';
import type { TaskCompletionStatus, FocusLevel } from '$lib/types/gamification';
import { countImprovements, longestNoTapStreak, countMatching, anyMatching } from './gamification';

export const taskEvaluators: Record< string, (sessions: MeditationSession[], level: FocusLevel) => TaskCompletionStatus> = {
    tap_once: (sessions) => ({
        completed: anyMatching(sessions, s => s.tapCount >= 1),
        info: ''
    }),

    no_early_exit: (sessions) => ({
        completed: anyMatching(sessions, s => s.completed === true),
        info: ''
    }),

    session_under_5_taps: (sessions) => ({
        completed: anyMatching(sessions, s => s.tapCount <= 5),
        info: ''
    }),
    
    session_with_2_or_fewer_taps: (sessions) => ({
        completed: anyMatching(sessions, s => s.tapCount <= 2),
        info: ''
    }),
    
    session_with_3_or_fewer_taps: (sessions) => ({
        completed: anyMatching(sessions, s => s.tapCount <= 3),
        info: ''
    }),
    
    distractions_early_on: (sessions) => ({
        completed: anyMatching(sessions, s => (s.tapTimestamps?.filter(t => t <= 60).length ?? 0) >= 2),
        info: ''
    }),

    complete_2_sessions: (sessions) => ({
        completed: sessions.length >= 2,
        info: sessions.length === 0 || sessions.length >= 2 ? '' : `(1/2 complete)`,
    }),
    
    complete_3_sessions: (sessions) => ({
        completed: sessions.length >= 3,
        info: sessions.length === 0 || sessions.length >= 3 ? '' : `(${sessions.length}/3 complete)`,
    }),
    
    two_sessions_under_5_taps: (sessions) => {
        let streak = 0;
        for (let i = sessions.length - 1; i >= 0; i--) {
            if (sessions[i].tapCount <= 5) {
                streak++;
                if (streak === 2) break;
            } else {
                streak = 0;
            }
        }
        return {
            completed: streak === 2,
            info: sessions.length === 0 || streak === 2 ? '' : `(${Math.min(streak, 1)}/2 complete)`,
        };
    },
    
    two_sessions_under_8_taps: (sessions) => {
        const count = countMatching(sessions, s => s.tapCount <= 8);
        return {
            completed: count >= 2,
            info: sessions.length === 0 || count >= 2 ? '' : `(${count}/2 complete)`,
        };
    },
    
    one_min_no_taps: (sessions) => ({
        completed: anyMatching(sessions, s => longestNoTapStreak(s) >= 60),
        info: ''
    }),
    
    one_min_no_taps_twice: (sessions) => {
        const count = countMatching(sessions, s => longestNoTapStreak(s) >= 60);
        return {
            completed: count >= 2,
            info: sessions.length === 0 || count >= 2 ? '' : `(${count}/2 complete)`,
        };
    },
    
    two_min_no_taps: (sessions) => ({
        completed: anyMatching(sessions, s => longestNoTapStreak(s) >= 120),
        info: ''
    }),
    
    three_min_no_taps: (sessions) => ({
        completed: anyMatching(sessions, s => longestNoTapStreak(s) >= 180),
        info: ''
    }),
    
    improve_tap_count_2_sessions: (sessions) => {
        const improved = countImprovements(sessions);
        return {
            completed: improved >= 2,
            info: sessions.length === 0 || improved >= 2 ? '' : `(${improved}/2 complete)`,
        };
    },
    
    max_duration: (sessions, level) => ({
        completed: sessions.some(s => s.duration >= level.maxDuration),
        info: ''
    }),
};