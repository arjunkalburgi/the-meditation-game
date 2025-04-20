import type { MeditationSession, FocusLevel } from '$lib/types';

/**
 * Evaluates which completion tasks were fulfilled in a given meditation session.
 * This function must stay in sync with SQL when we migrate to Supabase.
 * 
 * @param session A single MeditationSession object
 * @param level The FocusLevel containing completionTasks
 * @returns Set of task IDs completed in this session
 */
export function getCompletedTasksForSession(session: MeditationSession, level: FocusLevel): Set<string> {
    const completedTasks = new Set<string>();
    
    // Check each task based on its ID
    for (const task of level.completionTasks) {
        switch (task.id) {
            case 'tap_once':
                if (session.tapCount > 0) completedTasks.add(task.id);
                break;
                
            case 'no_early_exit':
                if (session.completed) completedTasks.add(task.id);
                break;
                
            case 'max_duration':
                if (session.duration >= level.maxDuration) completedTasks.add(task.id);
                break;
                
            case 'session_under_5_taps':
                if (session.tapCount <= 5) completedTasks.add(task.id);
                break;
                
            case '2_sessions_under_8_taps':
                if (session.tapCount <= 8) completedTasks.add(task.id);
                break;
                
            case 'one_min_no_taps':
                // Check if there's a 60-second period without taps
                if (session.tapTimestamps.length === 0) {
                    completedTasks.add(task.id);
                } else if (session.tapTimestamps.length === 1) {
                    if (session.tapTimestamps[0] > 60 || session.duration - session.tapTimestamps[0] > 60) {
                        completedTasks.add(task.id);
                    }
                } else {
                    // Check gaps between consecutive taps
                    for (let i = 0; i < session.tapTimestamps.length - 1; i++) {
                        if (session.tapTimestamps[i+1] - session.tapTimestamps[i] > 60) {
                            completedTasks.add(task.id);
                            break;
                        }
                    }
                    
                    // Check gap at the beginning and end
                    if (session.tapTimestamps[0] > 60 || session.duration - session.tapTimestamps[session.tapTimestamps.length - 1] > 60) {
                        completedTasks.add(task.id);
                    }
                }
                break;
        }
    }
    
    return completedTasks;
} 