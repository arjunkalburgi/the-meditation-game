<script lang="ts">
	import posthog from '$lib/posthog';
	import type { MeditationResults } from '$lib/types';
	import { secondsToDisplayTime } from '$lib/utils';
	import { focusLevels } from '$lib/utils/levels';

	export let closeModal;
	export let meditationResults: MeditationResults;

	const totalDistractions = meditationResults.clickTimestamps.length;
	const distractionRate = totalDistractions > 0 
		? (totalDistractions / (meditationResults.durationMeditated / 60)).toFixed(1)
		: '0';

	// Get the current level to access task descriptions
	const currentLevel = focusLevels.find(level => level.id === meditationResults.levelId);
	
	// Create a lookup map for task descriptions
	const taskDescriptions: Record<string, string> = {};
	if (currentLevel) {
		currentLevel.completionTasks.forEach(task => {
			taskDescriptions[task.id] = task.description;
		});
	}

	const getDurationText = (duration: number) => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		if (minutes === 0) {
			return seconds + ' second' + (seconds === 1 ? '' : 's');
		}
		return minutes + ' minute' + (minutes === 1 ? '' : 's') + (seconds > 0 ? ' and ' + seconds + ' second' + (seconds === 1 ? '' : 's') : '');
	};

	const shareResults = () => {
		if (navigator.share) {
			posthog.capture("results_shared", { 
				total_taps: totalDistractions, 
				distractionRate, 
				level: 0,
				stars_gained: meditationResults.newStarRating - meditationResults.previousStarRating,
				tasks_completed: meditationResults.newlyCompletedTasks.length
			});
			const shareText = 'The Meditation Game App\n' +
				'I just finished a ' + getDurationText(meditationResults.durationMeditated) + ' meditation with ' + totalDistractions + ' distractions.\n' +
				'That\'s about ' + distractionRate + ' distractions per minute.\n' +
				'I\'m at ' + meditationResults.newStarRating + '/3 ⭐ in this level!\n' +
				'Meditate here: https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share';
			navigator.share({
				text: shareText,
			}).catch((error) => console.error("Sharing failed", error));
		} else {
			console.log("Web Share API not supported");
		}
	};

	const handleExit = () => {
		posthog.capture("results_exit", { 
			shared: navigator.share !== undefined,
			stars_gained: meditationResults.newStarRating - meditationResults.previousStarRating,
			tasks_completed: meditationResults.newlyCompletedTasks.length
		});
		closeModal();
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center p-6">
	<h2 class="text-2xl font-bold">Great practice!</h2>

	{#if meditationResults.newStarRating > meditationResults.previousStarRating}
		<p class="mt-2 text-lg text-accent-foreground font-semibold animate-fade-in">
			{#if meditationResults.newStarRating === 3}
				Mastered this level! ✨
			{:else}
				You earned +{meditationResults.newStarRating - meditationResults.previousStarRating} ⭐ — keep going!
			{/if}
		</p>
	{/if}

	<div class="mt-2 flex items-center space-x-1">
		{#each Array(3) as _, i}
			<span class="text-xl">
				{i < meditationResults.newStarRating ? '⭐' : '☆'}
			</span>
		{/each}
	</div>

	{#if meditationResults.clickTimestamps.length > 0}
		<p class="text-lg mt-4">
			You meditated for {getDurationText(meditationResults.durationMeditated)} and recorded {totalDistractions} {totalDistractions === 1 ? 'distraction' : 'distractions'}.
		</p>
		<p class="text-lg mt-2">
			That's about {distractionRate} {Number(distractionRate) === 1 ? 'distraction' : 'distractions'} per minute.
		</p>
	{:else}
		<p class="text-lg mt-4">You completed your meditation distraction-free!</p>
	{/if}

	{#if meditationResults.isNewPersonalBest && meditationResults.personalBest}
		<p class="mt-4 text-green-600 font-medium animate-fade-in">
			New personal best 🎉 — {meditationResults.personalBest.tapCount} taps over {secondsToDisplayTime(meditationResults.personalBest.duration)}.
		</p>
	{:else if meditationResults.personalBest}
		<p class="mt-4 text-muted-foreground">
			Best so far: {meditationResults.personalBest.tapCount} taps · {secondsToDisplayTime(meditationResults.personalBest.duration)}.
		</p>
	{/if}

	<h3 class="mt-6 font-semibold">Level tasks</h3>
	<ul class="mt-2 space-y-1 text-left max-h-40 overflow-y-auto">
		{#each Object.entries(meditationResults.completionTaskResults) as [taskId, done]}
			<li class="flex items-center">
				<span class="mr-2">{done ? '✅' : '🔲'}</span>
				{taskDescriptions[taskId] || taskId}
			</li>
		{/each}
	</ul>

	{#if meditationResults.newlyCompletedTasks.length > 0}
		<p class="mt-2 text-sm text-accent-foreground">
			Nice! You just completed {meditationResults.newlyCompletedTasks.length} task{meditationResults.newlyCompletedTasks.length === 1 ? '' : 's'}.
		</p>
	{/if}

	<div class="mt-6 flex space-x-4">
		<button class="btn variant-filled px-4 py-2" on:click={shareResults}>
			Share
		</button>
	</div>

	<div class="mt-6 flex space-x-4">
		<button class="btn variant-outlined px-4 py-2" on:click={handleExit}>
			Exit
		</button>
	</div>
	
	<div class="absolute bottom-6 text-center text-sm text-gray-500">
		<p>
			Learn to meditate for real at 
			<a href="https://www.dhamma.org" target="_blank" class="text-blue-500 underline">dhamma.org ↗</a>
		</p>
		<p class="mt-2">
			This app was made by Arjun, PM with 5 years experience. 
			Hire him to build your 0-1 consumer products! 
			<a href="https://www.linkedin.com/in/arjunkalburgi" target="_blank" class="text-blue-500 underline">View LinkedIn ↗</a>
		</p>
	</div>
</div>

<style>
	.animate-fade-in {
		animation: fadeIn 0.2s ease-in-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
