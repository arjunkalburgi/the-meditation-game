<script lang="ts">
	import { onMount } from 'svelte';
	import posthog from '$lib/posthog';
	import type { MeditationResults } from '$lib/types';
	import { sToMin } from '$lib/utils';
	import { buildShareText, getTemplateUsed } from '$lib/utils/share';
	import { checkTaskCompletion } from '$lib/utils/levelQueries';
	import type { TaskCompletionMap } from '$lib/types/gamification';

	export let closeModal;
	export let meditationResults: MeditationResults;

	const totalDistractions = meditationResults.clickTimestamps.length;
	const distractionRate = totalDistractions > 0 
		? (totalDistractions / (meditationResults.durationMeditated / 60)).toFixed(1)
		: '0';
	let taskCompletion: TaskCompletionMap = {};

	onMount(async () => {
		if (meditationResults?.levelId) {
			taskCompletion = await checkTaskCompletion(meditationResults.levelId);
		}
	});

	const getDurationText = (duration: number) => {
		const minutes = Math.floor(duration / 60);
		const seconds = Math.round(duration % 60 * 100) / 100;
		if (minutes === 0) {
			return seconds + ' second' + (seconds === 1 ? '' : 's');
		}
		return minutes + ' minute' + (minutes === 1 ? '' : 's') + (seconds > 0 ? ' and ' + seconds + ' second' + (seconds === 1 ? '' : 's') : '');
	};

	const shareResults = () => {
		if (navigator.share) {
			const starsGained = meditationResults.newStarRating - meditationResults.previousStarRating;
			const templateUsed = getTemplateUsed(meditationResults);
			
			posthog.capture("results_shared", { 
				total_taps: totalDistractions, 
				distractionRate, 
				level: meditationResults.levelId,
				stars_gained: starsGained,
				tasks_completed: meditationResults.newlyCompletedTasks.length,
				template_used: templateUsed,
				personal_best: meditationResults.isNewPersonalBest
			});
			
			const shareText = buildShareText(meditationResults);
			
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
				You've mastered this level! ✨
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
		{#if meditationResults.isNewPersonalBest && meditationResults.personalBest}
			<p class="text-lg mt-4 text-green-600">
				New personal best 🎉 — {totalDistractions} tap{totalDistractions ? '' : 's'} over {getDurationText(meditationResults.durationMeditated)}.
			</p>
		{:else}
			<p class="text-lg mt-4">
				You meditated for {getDurationText(meditationResults.durationMeditated)} and recorded {totalDistractions} distraction{totalDistractions === 1 ? '' : 's'}.
			</p>
		{/if}
		<p class="text-lg mt-2">
			That's about {distractionRate} distraction{Number(distractionRate) === 1 ? '' : 's'} per minute.
		</p>
	{:else}
		<p class="text-lg mt-4">You completed your meditation distraction-free!</p>
	{/if}

	{#if meditationResults.personalBest && !meditationResults.isNewPersonalBest}
		<p class="mt-4 text-muted-foreground">
			Best so far: {meditationResults.personalBest.tapCount} taps · {sToMin(meditationResults.personalBest.duration)} min.
		</p>
	{/if}

	<h3 class="mt-6 font-semibold">Level tasks</h3>
	{#if taskCompletion}
		{#if meditationResults.newlyCompletedTasks.length > 0}
			<p class="mt-2 text-sm text-accent-foreground">
				Nice! You just completed {meditationResults.newlyCompletedTasks.length} new task{meditationResults.newlyCompletedTasks.length === 1 ? '' : 's'}.
			</p>
		{/if}
		<ul class="mt-2 space-y-1 text-left max-h-40 overflow-y-auto">
			{#each Object.entries(taskCompletion) as [_, task]}
				<li class="flex items-center">
					<span class="mr-2">
						{#if meditationResults.newlyCompletedTasks.some(t => t === task.id)}
							✅ 🆕🏆 {task.description} {task.info} 
						{:else if task.completed}
							✅ {task.description} {task.info}
						{:else}
							🔲 {task.description} {task.info}
						{/if}
					</span>
				</li>
			{/each}
		</ul>
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
