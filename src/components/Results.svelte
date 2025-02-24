<script lang="ts">
	import { writable, derived } from "svelte/store"; 
	export let closeModal;
	export let duration: number;
	export let meditationResults: number[] = [];

	const mediResults = writable(meditationResults);
	const percentage = derived(mediResults, ($res) => {
		const secondsWithAClick = new Set($res.map((t) => Math.floor(t))).size;
		const calculatedPercentage = Math.round((secondsWithAClick / duration) * 100);
		return Math.min(100, Math.max(0, calculatedPercentage));
	});
	const progressBar = derived(percentage, ($percentage)  => {
		const barLength = 20; // Total length of the bar
		const filled = Math.round(($percentage / 100) * barLength);
		const empty = barLength - filled;
		return "▓".repeat(filled) + "░".repeat(empty);
	});

	const shareResults = () => {
		if (navigator.share) {
			navigator.share({
				text: `The Meditation Game App\nI just finished a 2-minute meditation with only ${meditationResults.length} distractions.\n${$progressBar} ${$percentage}% distracted\nMeditate here: https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share`,
			}).catch((error) => console.error("Sharing failed", error));
		} else {
			console.log("Web Share API not supported");
		}
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<h2 class="text-2xl font-bold">Great practice!</h2>

	{#if meditationResults.length > 0}
		<p class="text-lg mt-4">You recorded {meditationResults.length} distractions, spending {$percentage}% of your meditation distracted.</p>
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
		<button class="btn variant-outlined px-4 py-2" on:click={closeModal}>
			Exit
		</button>
	</div>
</div>
