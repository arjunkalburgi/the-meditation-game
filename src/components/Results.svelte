<script lang="ts">
	import posthog from '$lib/posthog';
	import type { MeditationResults } from '$lib/types';
	import { secondsToDisplayTime } from '$lib/utils';
	import { writable, derived, get } from "svelte/store"; 

	export let closeModal;
	export let meditationResults: MeditationResults;

	const mediResults = writable(meditationResults);
	const percentage = derived(mediResults, ($res) => {
		if (!$res.clickTimestamps) return 0;
		const secondsWithAClick = new Set($res.clickTimestamps.map((t) => Math.floor(t))).size;
		const calculatedPercentage = Math.round((secondsWithAClick / $res.durationMeditated) * 100);
		return Math.min(100, Math.max(0, calculatedPercentage));
	});
	const progressBar = derived(percentage, ($percentage) => {
		const barLength = 20;
		const filled = Math.round(($percentage / 100) * barLength);
		const empty = barLength - filled;
		return "▓".repeat(filled) + "░".repeat(empty);
	});

	const shareResults = () => {
		if (navigator.share) {
			posthog.capture("results_shared", {total_taps: meditationResults.clickTimestamps.length, distraction_percentage: get(percentage), level: 0 });
			navigator.share({
				text: `The Meditation Game App\nI just finished a ${meditationResults.durationMeditated / 60}-minute meditation with ${meditationResults.clickTimestamps.length} distractions.\n${get(progressBar)} ${get(percentage)}% distracted\nMeditate here: https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share`,
			}).catch((error) => console.error("Sharing failed", error));
		} else {
			console.log("Web Share API not supported");
		}
	};

	const handleExit = () => {
		posthog.capture("results_exit", { shared: navigator.share !== undefined });
		closeModal();
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center p-6">
	<h2 class="text-2xl font-bold">Great practice!</h2>

	{#if meditationResults.clickTimestamps.length > 0}
		<p class="text-lg mt-4">
			You meditated for {secondsToDisplayTime(meditationResults.durationMeditated)} and recorded {meditationResults.clickTimestamps.length} distractions, spending {$percentage}% of your meditation distracted.
		</p>
		<p class="text-lg font-mono mt-2">{$progressBar}</p>
	{:else}
		<p class="text-lg mt-4">You completed your meditation distraction-free!</p>
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
