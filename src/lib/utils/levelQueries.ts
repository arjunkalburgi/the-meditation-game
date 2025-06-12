import { db } from '$lib/db';
import type { FocusLevel, LevelStatus } from '$lib/types/gamification';
import { focusLevels } from './levels';
import { calculateStars, selectBestSession } from '$lib/utils/gamification';
import { taskEvaluators } from './taskEvaluation';
import type { TaskCompletionMap } from '$lib/types/gamification';

// Function to check task completion for a specific level
export async function checkTaskCompletion(levelId: string): Promise<TaskCompletionMap> {
    const level = focusLevels.find(l => l.id === levelId);
    if (!level) return {};
    
    const sessions = await db.sessions.where('levelId').equals(levelId).toArray();
    const taskCompletion: TaskCompletionMap = {};
    
    // Check each task based on its ID
    for (const task of level.completionTasks) {
        const evaluator = taskEvaluators[task.id];
        if (!evaluator) {
            console.warn(`Missing evaluator for task '${task.id}' in level '${levelId}'`);
            taskCompletion[task.id] = { completed: false };
            continue;
        }
        
        taskCompletion[task.id] = evaluator(sessions, level);
    }
    
    return taskCompletion;
}

export async function getLevelStatuses(): Promise<LevelStatus[]> {
    const results: LevelStatus[] = [];
    
    for (let i = 0; i < focusLevels.length; i++) {
        const level: FocusLevel = focusLevels[i];
        const sessions = await db.sessions.where('levelId').equals(level.id).toArray();
        const isUnlocked = i === 0 || (results[i - 1]?.starRating ?? 0) > 1;

        let taskCompletion = null;
        let starRating = undefined;
        let bestSession = null;
        
        if (isUnlocked) {
            taskCompletion = await checkTaskCompletion(level.id);
            const completedTaskIds = new Set(
                Object.entries(taskCompletion)
                    .filter(([_, v]) => v.completed)
                    .map(([id]) => id)
                );
            
            const perSessionCompleted = sessions.map((session) =>
                new Set(
                    level.completionTasks
                        .filter((task) => taskEvaluators[task.id]?.([session], level).completed)
                        .map((task) => task.id)
                )
            );
        
            starRating = calculateStars(level.starRules, completedTaskIds, perSessionCompleted);
            bestSession = selectBestSession(sessions);
        }
        
        results.push({
            level,
            isUnlocked,
            taskCompletion,
            starRating,
            bestSession,
        });
    }

    return results;
}