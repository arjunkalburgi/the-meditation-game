<script lang="ts">
	import Modal from "$components/CoreLoop.svelte";
	import DurationPicker from "$components/subcomponents/DurationPicker.svelte";
	import { MeditationDuration } from "$lib/types";
	import { getLevelStatuses } from "$lib/utils/levelQueries";

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

<div class="container h-full mx-auto flex flex-col p-6">
	<div class="space-y-6 text-center">
		<h2 class="h2">Welcome to The Meditation Game!</h2>
		<p>Learn how to meditate through gameplay</p>
	</div>

	{#if loading}
		<div class="flex justify-center items-center mt-8">
			<div class="loading loading-spinner loading-lg"></div>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
			{#each levelStatuses as { level, isUnlocked, progress }}
				<div class="card p-4 {!isUnlocked ? 'opacity-50' : ''}">
					<div class="flex justify-between items-start mb-4">
						<div>
							<h3 class="text-xl font-bold">{level.name}</h3>
							<p class="text-sm text-gray-600">{level.description}</p>
						</div>
						{#if !isUnlocked}
							<span class="text-2xl">🔒</span>
						{/if}
					</div>

					{#if isUnlocked}
						<div class="space-y-4">
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
						<div class="space-y-2">
							<p class="text-sm text-gray-500">
								{#if progress}
									{#if progress.improvementNeeded}
										Improve by {progress.improvementNeeded.toFixed(1)} taps to unlock
									{:else}
										Complete {progress.requiredSessions - progress.sessionsCompleted} more sessions to unlock
									{/if}
								{:else}
									Complete previous levels to unlock
								{/if}
							</p>
							{#if progress}
								<div class="w-full bg-gray-200 rounded-full h-2.5">
									<div 
										class="bg-blue-600 h-2.5 rounded-full" 
										style="width: {(progress.sessionsCompleted / progress.requiredSessions) * 100}%"
									></div>
								</div>
								<p class="text-xs text-gray-500 text-right">
									{progress.sessionsCompleted}/{progress.requiredSessions} sessions
								</p>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<div class="absolute bottom-6 text-center text-sm text-gray-500">
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

<style lang="postcss">
	.container {
		@apply flex justify-center items-center;
	}
</style>
