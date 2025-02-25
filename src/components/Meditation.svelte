<script lang="ts">
	import { fade } from "svelte/transition";
	import { writable, get } from "svelte/store";
	import { createEventDispatcher } from "svelte";
	import CircularTimer from "./subcomponents/CircularTimer.svelte";

	export let nextStep: () => void;
	export let duration: number;
	const dispatch = createEventDispatcher<{ complete: { clickTimestamps: number[], durationMeditated: number, completed: boolean } }>();

	const timeLeft = writable<number>(duration);
	const clickCount = writable<number>(0);
	const clickTimestamps = writable<number[]>([]);

	const handleClick = () => {
		const timestamp = duration - get(timeLeft);
		clickCount.update((c) => c + 1);
		clickTimestamps.update((arr) => [...arr, timestamp]);
		console.log(`Click ${get(clickCount)} recorded at ${timestamp} seconds`);
	};

	const handleExit = () => {
		dispatch("complete", {
			clickTimestamps: get(clickTimestamps), 
			durationMeditated: duration - get(timeLeft), 
			completed: get(timeLeft) < 5
		});
		nextStep();
	};

	const handleTimerComplete = () => {
		console.log("Meditation complete! Click data:", get(clickTimestamps));
		dispatch("complete", {
			clickTimestamps: get(clickTimestamps), 
			durationMeditated: duration, 
			completed: true
		});
		nextStep();
	};
</script>

<div class="w-full h-full flex flex-col items-center justify-center relative pointer-events-none">
	<div class="absolute flex flex-col items-center pointer-events-auto">
		<CircularTimer {duration} {timeLeft} on:complete={handleTimerComplete} />
		<p class="text-lg mt-4 text-center">Tap anywhere on the screen to record your distractions</p>
	</div>

	<!-- Fullscreen Tap Button -->
	<button class="absolute inset-0 w-full h-full bg-transparent pointer-events-auto" on:click={handleClick}></button>

	<button 
		class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"
		on:click={handleExit} 
		transition:fade
	>
		Exit Meditation
	</button>
</div>
