import type { MeditationDuration } from ".";

export type FocusLevel = {
    id: string;
    name: string;
    minDuration: MeditationDuration;
    maxDuration: MeditationDuration;
    description: string;
    instructions: string[];
    completionTasks: Array<{
        id: string;
        description: string;
    }>;
    starRules: StarRule[];
    selectedDuration?: MeditationDuration;
};  

export type LevelStatus = {
    level: FocusLevel;
    isUnlocked: boolean;
    taskCompletion?: TaskCompletionMap | null;
    starRating?: number;
    bestSession?: {
        tapCount: number;
        duration: number;
    } | null;
};

export type Scope = 'cumulative' | 'singleSession';

export interface MinTasksRule {
    type: 'minTasks';
    count: number;
    from: string[] | 'all'; // task ids
}

export interface SpecificTasksRule {
    type: 'specificTasks';
    taskIds: string[]; // must complete *all* of these
}

export type Requirement = MinTasksRule | SpecificTasksRule;

export interface StarRule {
    stars: 1 | 2 | 3;
    scope: Scope;
    requirement: Requirement;
}

export type TaskCompletionStatus = {
    completed: boolean;
    info?: string;
    id?: string;
    description?: string;
};

export type TaskCompletionMap = {
    [taskId: string]: TaskCompletionStatus;
};