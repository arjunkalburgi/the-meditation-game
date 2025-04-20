import { focusLevels } from './utils/levels';

// Create a lookup map for task descriptions
export const focusTaskLookup: Record<string, string> = {};

// Populate the lookup map from all levels
focusLevels.forEach(level => {
    level.completionTasks.forEach(task => {
        focusTaskLookup[task.id] = task.description;
    });
}); 