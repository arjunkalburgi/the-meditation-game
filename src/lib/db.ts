import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { MeditationSession } from './types';

class AppDatabase extends Dexie {
    sessions!: Table<MeditationSession>;
    
    constructor() {
        super('MeditationGameDB');
        this.version(1).stores({
            sessions: '++id, levelId, timestamp'
        });
    }
}

export const db = new AppDatabase(); 