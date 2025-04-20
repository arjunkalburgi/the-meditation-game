<script lang="ts">
	import Modal from "$components/CoreLoop.svelte";
	import DurationPicker from "$components/subcomponents/DurationPicker.svelte";
	import { MeditationDuration } from "$lib/types";
	import { getLevelStatuses } from "$lib/utils/levelQueries";
	import { sToMin } from "$lib/utils";

	let showModal: boolean = false;
	let selectedDuration: number = MeditationDuration.ONE_MINUTE;
	let selectedLevel: string | null = null;
	let levelStatuses: any[] = [];
	let loading: boolean = true;

	// Load page
	$: if (!showModal) {
		loading = true;
		getLevelStatuses()
			.then(s => {
				levelStatuses = s;
				console.log(s);
				loading = false;
			})
			.catch(error => {
				console.error('Failed to reload level statuses:', error);
				loading = false;
			});
	}

	const startMeditation = () => {
		if (!window.audioContext) {
			window.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		}

		showModal = true;
	}
</script>

<div class="h-full mx-auto flex flex-col p-6 mt-6">
	<div class="space-y-6 text-center">
		<h1 class="h2">Welcome to The Meditation Game!</h1>
		<p>Learn how to meditate through gameplay</p>
	</div>

	{#if loading}
		<div class="flex justify-center items-center mt-8">
			<div class="loading loading-spinner loading-lg"></div>
		</div>
	{:else}
		<div class="flex flex-col gap-6 mt-8">
			<h2>Section 1: Focus</h2>
			{#each levelStatuses as { level, isUnlocked, taskCompletion, starRating, bestSession }}
				<div class="card p-8 {!isUnlocked ? 'opacity-90' : ''}">
					<div class="flex justify-between items-start mb-8">
						<div class="space-y-3">
							<h3 class="text-xl font-bold">
								{#if !isUnlocked}
									<span class="text-2xl">🔒</span>
								{/if}
								{level.name}
							</h3>
							<p class="text-sm text-gray-600">{level.description}</p>
							{#if bestSession && isUnlocked}
								<p class="text-sm text-muted-foreground">
									Best: {bestSession.tapCount} taps · {sToMin(bestSession.duration)} min
								</p>
							{/if}
						</div>
						{#if starRating !== undefined && isUnlocked}
							<div class="flex items-center">
								{#each Array(3) as _, i}
									<span class="text-2xl {i < starRating ? 'text-yellow-500' : 'text-gray-300'}">
										★
									</span>
								{/each}
							</div>
						{/if}
					</div>

					{#if isUnlocked}
						<div class="space-y-6">
							<DurationPicker 
								selectedDuration={selectedDuration} 
								onDurationChange={(d) => selectedDuration = d}
								minDuration={level.minDuration}
								maxDuration={level.maxDuration}
							/>
							<button 
								class="btn variant-filled w-full" 
								on:click={() => {
									selectedLevel = level.id;
									startMeditation();
								}}
							>
								Start meditation
							</button>
						</div>
					{:else}
						<div class="space-y-4">
							<p class="text-sm text-gray-500">
								Complete previous levels to unlock
							</p>
						</div>
					{/if}
					
					{#if taskCompletion && isUnlocked}
						<div class="mt-6 space-y-3">
							<h4 class="font-medium">Completion Tasks:</h4>
							<div class="space-y-2">
								{#each level.completionTasks as task, i}
									<div class="flex items-center">
										<span class="mr-2 {taskCompletion[task.id] ? 'text-green-500' : 'text-gray-400'}">
											{taskCompletion[task.id] ? '✅' : '🔲'}
										</span>
										<span class="text-sm {taskCompletion[task.id] ? 'text-gray-700' : 'text-gray-500'}">
											{task.description}
										</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="mt-8">
			<h2>Section 2: Sharpness</h2>
			<i>Coming soon</i>
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
