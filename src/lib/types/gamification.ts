// Gamification types
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
