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
        completionTasks: [
            { id: 'complete_2_sessions', description: 'Complete 2 sessions' },
            { id: 'tap_once', description: 'Tap to mark at least one distraction' },
            { id: 'no_early_exit', description: 'Complete a session without ending early' },
            { id: 'max_duration', description: 'Complete a session with max duration' }
        ],
        starRules: [
            // SQL: SELECT COUNT(*) >= 1 FROM completed_tasks WHERE level_id = 'L1'
            {
                stars: 1,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 1,
                    from: 'all'
                }
            },
            // SQL: SELECT COUNT(*) >= 3 FROM completed_tasks WHERE level_id = 'L1' AND task_id IN ('complete_2_sessions', 'tap_once', 'no_early_exit')
            {
                stars: 2,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 3,
                    from: ['complete_2_sessions', 'tap_once', 'no_early_exit']
                }
            },
            // SQL: SELECT COUNT(*) = 4 FROM completed_tasks WHERE level_id = 'L1'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['complete_2_sessions', 'tap_once', 'no_early_exit', 'max_duration']
                }
            }
        ]
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
        completionTasks: [
            { id: 'complete_3_sessions', description: 'Complete 3 sessions' },
            { id: 'improve_tap_count', description: 'Improve your tap count in 2 of 3 sessions' },
            { id: 'session_under_5_taps', description: 'Complete a session with 5 taps or fewer' },
            { id: 'max_duration', description: 'Complete a session with max duration' }
        ],
        starRules: [
            // SQL: SELECT COUNT(*) >= 1 FROM completed_tasks WHERE level_id = 'L2'
            {
                stars: 1,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 1,
                    from: 'all'
                }
            },
            // SQL: SELECT COUNT(*) >= 2 FROM completed_tasks WHERE level_id = 'L2' AND task_id IN ('complete_3_sessions', 'improve_tap_count', 'session_under_5_taps')
            {
                stars: 2,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 2,
                    from: ['complete_3_sessions', 'improve_tap_count', 'session_under_5_taps']
                }
            },
            // SQL: SELECT COUNT(*) = 4 FROM completed_tasks WHERE level_id = 'L2'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['complete_3_sessions', 'improve_tap_count', 'session_under_5_taps', 'max_duration']
                }
            }
        ]
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
        completionTasks: [
            { id: '2_sessions_under_8_taps', description: 'Complete 2 sessions with 8 or fewer taps' },
            { id: 'one_min_no_taps', description: 'Go one full minute without tapping during a session' },
            { id: 'max_duration', description: 'Complete a session with max duration' }
        ],
        starRules: [
            // SQL: SELECT COUNT(*) >= 1 FROM completed_tasks WHERE level_id = 'L3'
            {
                stars: 1,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 1,
                    from: 'all'
                }
            },
            // SQL: SELECT EXISTS (
            //   SELECT 1 FROM sessions s
            //   WHERE s.level_id = 'L3' AND
            //   (SELECT COUNT(*) FROM completed_tasks ct 
            //    WHERE ct.session_id = s.id AND 
            //    ct.task_id IN ('2_sessions_under_8_taps', 'one_min_no_taps')) >= 2
            // )
            {
                stars: 2,
                scope: 'singleSession',
                requirement: {
                    type: 'minTasks',
                    count: 2,
                    from: ['2_sessions_under_8_taps', 'one_min_no_taps', 'max_duration']
                }
            },
            // SQL: SELECT COUNT(*) = 3 FROM completed_tasks WHERE level_id = 'L3'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['2_sessions_under_8_taps', 'one_min_no_taps', 'max_duration']
                }
            }
        ]
    }
]; 