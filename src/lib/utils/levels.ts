import type { FocusLevel } from '$lib/types';
import { MeditationDuration } from '$lib/types';
import { db } from '$lib/db';

export const focusLevels: FocusLevel[] = [
    {
        id: "L1",
        name: "Level 1",
        minDuration: MeditationDuration.ONE_MINUTE,
        maxDuration: MeditationDuration.FIVE_MINUTES,
        description: "Sit. Breathe. Notice the mind.",
        instructions: [
            "Sit comfortably",
            "Focus on the feeling of breath through your nose",
            "Tap when you notice the mind has wandered",
            "Gently return to the breath each time"
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
        name: "Level 2",
        minDuration: MeditationDuration.TWO_MINUTES,
        maxDuration: MeditationDuration.TEN_MINUTES,
        description: "Let go of counting and images.",
        instructions: [
            "Focus on the breath through your nose",
            "Don’t count, visualize, or repeat words",
            "Tap when your mind wanders",
            "Return to the breath, without mental help"
        ],
        completionTasks: [
            { id: 'complete_3_sessions', description: 'Complete 3 sessions' },
            { id: 'improve_tap_count_2_sessions', description: 'Improve your tap count in 2 sessions' },
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
                    from: ['complete_3_sessions', 'improve_tap_count_2_sessions', 'session_under_5_taps']
                }
            },
            // SQL: SELECT COUNT(*) = 4 FROM completed_tasks WHERE level_id = 'L2'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['complete_3_sessions', 'improve_tap_count_2_sessions', 'session_under_5_taps', 'max_duration']
                }
            }
        ]
    },
    {
        id: "L3",
        name: "Level 3",
        minDuration: MeditationDuration.FIVE_MINUTES,
        maxDuration: MeditationDuration.FIFTEEN_MINUTES,
        description: "Observe thoughts as they arise.",
        instructions: [
            "Focus on the breath through your nose",
            "Don’t use any counting or mental images",
            "Tap when distracted, then silently observe the thought",
            "Label it if you can (e.g. “planning,” “judging”)",
            "Let it go and return to the breath"
        ],
        completionTasks: [
            { id: 'two_sessions_under_8_taps', description: 'Complete 2 sessions with 8 or fewer taps' },
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
            //    ct.task_id IN ('two_sessions_under_8_taps', 'one_min_no_taps')) >= 2
            // )
            {
                stars: 2,
                scope: 'singleSession',
                requirement: {
                    type: 'minTasks',
                    count: 2,
                    from: ['two_sessions_under_8_taps', 'one_min_no_taps', 'max_duration']
                }
            },
            // SQL: SELECT COUNT(*) = 3 FROM completed_tasks WHERE level_id = 'L3'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['two_sessions_under_8_taps', 'one_min_no_taps', 'max_duration']
                }
            }
        ]
    },
    {
        id: "L4",
        name: "Level 4",
        minDuration: MeditationDuration.FIVE_MINUTES,
        maxDuration: MeditationDuration.FIFTEEN_MINUTES,
        description: "Notice how you react to yourself.",
        instructions: [
            "Keep observing the breath",
            "No counting or images",
            "Tap when distracted, observe the thought",
            "Then notice how you feel about getting distracted",
            "If there’s frustration or judgment, notice that too — and let it go"
        ],
        completionTasks: [
            { id: 'two_sessions_under_5_taps', description: 'Have 2 sessions in a row with fewer than 5 taps' },
            { id: 'one_min_no_taps_twice', description: 'Go 1 minute without a tap in 2 separate sessions' },
            { id: 'improve_tap_count_2_sessions', description: 'Improve your tap count in 2 sessions' },
            { id: 'max_duration', description: 'Complete a session with max duration' }
        ],
        starRules: [
            // SQL: SELECT COUNT(*) >= 1 FROM completed_tasks WHERE level_id = 'L4'
            {
                stars: 1,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 1,
                    from: 'all'
                }
            },
            // SQL: SELECT COUNT(*) >= 2 FROM completed_tasks WHERE level_id = 'L4' AND task_id IN ('two_sessions_under_5_taps', 'one_min_no_taps_twice', 'improve_tap_count_2_sessions')
            {
                stars: 2,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 2,
                    from: ['two_sessions_under_5_taps', 'one_min_no_taps_twice', 'improve_tap_count_2_sessions']
                }
            },
            // SQL: SELECT COUNT(*) = 4 FROM completed_tasks WHERE level_id = 'L4'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['two_sessions_under_5_taps', 'one_min_no_taps_twice', 'improve_tap_count_2_sessions', 'max_duration']
                }
            }
        ]
        
    },
    {
        id: "L5",
        name: "Level 5",
        minDuration: MeditationDuration.TEN_MINUTES,
        maxDuration: MeditationDuration.THIRTY_MINUTES,
        description: "Everything changes. Keep observing.",
        instructions: [
            "Keep observing breath and distractions",
            "Tap when the mind wanders, observe the thought, notice your reaction",
            "Then remember: everything changes — including this",
            "Let the distraction and your reaction pass",
            "Return to the breath with calm awareness"
        ],
        completionTasks: [
            { id: 'session_with_3_or_fewer_taps', description: 'Have one session with 3 or fewer taps' },
            { id: 'improve_tap_count_2_sessions', description: 'Improve your tap count in 2 sessions' },
            { id: 'two_min_no_taps', description: 'Go 2 minutes without tapping' },
            { id: 'max_duration', description: 'Complete a session with max duration' }
        ],
        starRules: [
            // SQL: SELECT COUNT(*) >= 1 FROM completed_tasks WHERE level_id = 'L5'
            {
                stars: 1,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 1,
                    from: 'all'
                }
            },
            // SQL: SELECT COUNT(*) >= 3 FROM completed_tasks WHERE level_id = 'L5'
            {
                stars: 2,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 3,
                    from: ['session_with_3_or_fewer_taps', 'improve_tap_count_2_sessions', 'two_min_no_taps']
                }
            },
            // SQL: SELECT COUNT(*) = 4 FROM completed_tasks WHERE level_id = 'L5'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['session_with_3_or_fewer_taps', 'improve_tap_count_2_sessions', 'two_min_no_taps', 'max_duration']
                }
            }
        ]
        
    },
    {
        id: "L6",
        name: "Level 6",
        minDuration: MeditationDuration.FIFTEEN_MINUTES,
        maxDuration: MeditationDuration.SIXTY_MINUTES,
        description: "Sit still. Stay with discomfort.",
        instructions: [
            "Observe breath, distractions, and reactions as before",
            "Sit still in your chosen posture for the full session",
            "If discomfort arises, don’t shift — just observe it",
            "Notice the discomfort, let it change, and return to breath",
            "Everything will pass"
        ],
        completionTasks: [
            { id: 'three_min_no_taps', description: 'Go 3 minutes without a tap' },
            { id: 'session_with_2_or_fewer_taps', description: 'Have a session with 2 or fewer taps' },
            { id: 'improve_tap_count_2_sessions', description: 'Improve your tap count in 2 sessions' },
            { id: 'distractions_early_on', description: 'Finish a sit with multiple distractions early on' },
            { id: 'max_duration', description: 'Complete a session with max duration' }
        ],
        starRules: [
            // SQL: SELECT COUNT(*) >= 1 FROM completed_tasks WHERE level_id = 'L6'
            {
                stars: 1,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 1,
                    from: 'all'
                }
            },
            // SQL: SELECT COUNT(*) >= 3 FROM completed_tasks WHERE level_id = 'L6' AND task_id IN ('three_min_no_taps', 'session_with_2_or_fewer_taps', 'improve_tap_count_2_sessions')
            {
                stars: 2,
                scope: 'cumulative',
                requirement: {
                    type: 'minTasks',
                    count: 3,
                    from: ['three_min_no_taps', 'session_with_2_or_fewer_taps', 'improve_tap_count_2_sessions']
                }
            },
            // SQL: SELECT COUNT(*) = 5 FROM completed_tasks WHERE level_id = 'L6'
            {
                stars: 3,
                scope: 'cumulative',
                requirement: {
                    type: 'specificTasks',
                    taskIds: ['three_min_no_taps', 'session_with_2_or_fewer_taps', 'improve_tap_count_2_sessions', 'distractions_early_on', 'max_duration']
                }
            }
        ]
        
    }
];
