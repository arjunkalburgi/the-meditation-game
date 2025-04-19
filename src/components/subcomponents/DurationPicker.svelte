<script lang="ts">
    import { MeditationDuration, DURATION_LABELS } from '$lib/types';
    
    export let selectedDuration: number;
    export let onDurationChange: (duration: number) => void;

    const durations = Object.values(MeditationDuration).filter(value => typeof value === 'number') as MeditationDuration[];
</script>

<div class="flex flex-col items-center gap-4">
    <label for="duration" class="text-lg font-medium">Select Meditation Duration</label>
    <select
        id="duration"
        class="select select-bordered w-full max-w-xs"
        value={selectedDuration}
        on:change={(e) => onDurationChange(Number(e.currentTarget.value))}
    >
        {#each durations as duration}
            <option value={duration}>{DURATION_LABELS[duration]}</option>
        {/each}
    </select>
</div> 