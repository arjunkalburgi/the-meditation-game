<script lang="ts">
	import posthog from '$lib/posthog';
	import { fade } from "svelte/transition";
	import CircularTimer from "./subcomponents/CircularTimer.svelte";

	export let nextStep: () => void;
	export let closeModal: () => void;
	export let levelId: string | null = "L1";

	const duration: number = 10;
	let startTimestamp: number = 0; // milliseconds

	posthog.capture("countdown_started", { level: levelId });

	const handleTimerComplete = () => {
		posthog.capture("countdown_complete", { level: levelId });
		nextStep();
	};

	const handleExit = () => {
		posthog.capture("countdown_exit", { duration_counteddown: ((Date.now() - startTimestamp) / 1000), level: levelId });
		closeModal();
	};
</script>

<div class="w-full h-full flex flex-col items-center justify-center relative pointer-events-none">
	<div class="absolute flex flex-col items-center pointer-events-auto">
		<p class="text-lg mt-4 text-center">Your meditation starts in:</p>
		<CircularTimer {duration} bind:startTimestamp on:complete={handleTimerComplete} />
	</div>

	<button 
		class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"
		on:click={handleExit} 
		transition:fade
	>
		Exit Meditation
	</button>
</div>
