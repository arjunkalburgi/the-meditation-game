<script lang="ts">
	import Modal from "$components/CoreLoop.svelte";
	import DurationPicker from "$components/subcomponents/DurationPicker.svelte";
	import { MeditationDuration } from "$lib/types";
	import { getLevelStatuses } from "$lib/utils/levelQueries";
	import type { LevelStatus } from "$lib/types/gamification";
	import { sToMin } from "$lib/utils";
	import { preloadGong } from '$lib/audio';

	let showModal: boolean = false;
	let selectedDuration: number = MeditationDuration.ONE_MINUTE;
	let selectedLevel: string | null = null;
	let levelStatuses: LevelStatus[] = [];
	let loading: boolean = true;

	// Load page
	$: if (!showModal) {
		loading = true;
		getLevelStatuses()
			.then(s => {
				levelStatuses = s;
				s.forEach(({ level }) => {
					level.selectedDuration = level.minDuration;
				});
				loading = false;
			})
			.catch(error => {
				console.error('Failed to reload level statuses:', error);
				loading = false;
			});
	}

	const startMeditation = async () => {
		await preloadGong();
		showModal = true;
	}
</script>

<div class="h-full mx-auto flex flex-col p-6 mt-6">
	<div class="space-y-6 text-center mt-10 mb-8">
		<h1 class="h2">Welcome to <br/>The Meditation Game!</h1>
		<p>Learn how to meditate through gameplay</p>
	</div>

	{#if loading}
		<div class="flex justify-center items-center mt-8">
			<div class="loading loading-spinner loading-lg"></div>
		</div>
	{:else}
		<div class="flex flex-col gap-6 mt-8 max-w-3xl mx-auto w-full">
			{#each levelStatuses as { level, isUnlocked, taskCompletion, starRating, bestSession }}
				<div class="card bg-[#ffffffa6] p-8 {!isUnlocked ? 'opacity-60' : ''}">
					<div class="flex justify-between items-center mb-2">
						<h3 class="text-lg font-bold">
							{#if !isUnlocked}
								<span class="text-2xl">🔒</span>
							{/if}
							{level.name}
						</h3>
						{#if starRating !== undefined && isUnlocked}
							<div class="flex items-center">
								{#each Array(3) as _, i}
									{#if i < starRating}
										<span class="text-2xl">⭐</span>
									{:else}
										<span class="text-2xl text-gray-300">★</span>
									{/if}
								{/each}
							</div>
						{/if}
					</div>

					<div class="mb-2">
						<p class="text-sm text-muted-foreground mb-2">{level.description}</p>
						{#if bestSession && isUnlocked}
							<p class="text-sm text-gray-500">
								Your best: {bestSession.tapCount} taps · {sToMin(bestSession.duration)} min
							</p>
						{/if}
					</div>
					
					{#if taskCompletion && isUnlocked}
						<div class="space-y-0">
							{#each Object.entries(taskCompletion) as [_, task]}
								<div class="flex items-center">
									<span class="mr-2 text-sm text-gray-500">
										{(task).completed ? '✅' : '🔲'} {task.description} {task.info}
									</span>
								</div>
							{/each}
						</div>
					{/if}

					{#if isUnlocked}
						<div class="space-y-6 mt-8">
							<DurationPicker 
								selectedDuration={level.selectedDuration} 
								onDurationChange={(d) => level.selectedDuration = d}
								minDuration={level.minDuration}
								maxDuration={level.maxDuration}
							/>
							<button 
								class="btn variant-filled w-full" 
								on:click={() => {
									selectedLevel = level.id;
									selectedDuration = level.selectedDuration ?? level.minDuration;
									startMeditation();
								}}
							>
								Start meditation
							</button>
						</div>
					{:else}
						<div class="space-y-4 mt-8">
							<p class="text-sm text-gray-500">
								Achieve 2 stars in previous levels to unlock
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<div class="text-center text-sm text-gray-500 mt-40">
		<p>
			Learn to meditate for real at 
			<a href="https://www.dhamma.org" target="_blank" class="text-blue-500 underline">dhamma.org ↗</a>
		</p>
		<p class="mt-2">
			This app was made by Arjun Kalburgi, PM with 5 years experience. 
			Hire him to build your 0-1 consumer products! 
			<a href="https://www.linkedin.com/in/arjunkalburgi" target="_blank" class="text-blue-500 underline">View LinkedIn ↗</a>
		</p>
	</div>
</div>

<Modal bind:show={showModal} duration={selectedDuration} levelId={selectedLevel} />
