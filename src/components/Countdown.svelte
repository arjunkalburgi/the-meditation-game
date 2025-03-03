<script lang="ts">
	import posthog from '$lib/posthog';
	import { fade } from "svelte/transition";
	import { writable, get } from "svelte/store"; 
	import CircularTimer from "./subcomponents/CircularTimer.svelte";

	export let nextStep: () => void;
	export let closeModal: () => void;

	const duration: number = 5;
	const timeLeft = writable<number>(duration);

	posthog.capture("countdown_started", { level: 0 });

	const handleTimerComplete = () => {
		posthog.capture("countdown_complete", { level: 0 });
		nextStep();
	};

	const handleExit = () => {
		posthog.capture("countdown_exit", { duration_counteddown: duration - get(timeLeft), level: 0 });
		closeModal();
	};
</script>

<div class="w-full h-full flex flex-col items-center justify-center relative pointer-events-none">
	<div class="absolute flex flex-col items-center pointer-events-auto">
		<p class="text-lg mt-4 text-center">Your meditation starts in:</p>
		<CircularTimer duration={duration} timeLeft={timeLeft} on:complete={handleTimerComplete} />
	</div>

	<button 
		class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"
		on:click={handleExit} 
		transition:fade
	>
		Exit Meditation
	</button>
</div>
