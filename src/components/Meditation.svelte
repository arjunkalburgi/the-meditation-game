<script lang="ts">
	import { fade } from "svelte/transition";
	import { onDestroy } from "svelte";
	import { writable, derived, get } from "svelte/store"; 
	import { createEventDispatcher } from "svelte";

	export let nextStep: () => void;
	export let duration: number;
	const dispatch = createEventDispatcher<{ complete: number[] }>();

	// Timer settings
	const timeLeft = writable<number>(duration);
	const clickCount = writable<number>(0);
	const clickTimestamps = writable<number[]>([]);

	let timer: NodeJS.Timeout;

	const formattedTime = derived(timeLeft, ($t) => {
		const s = $t % 60;
		return `${Math.floor($t / 60)}:${s < 10 ? "0" : ""}${s}`;
	});

	const percentageTimeLeft = derived(timeLeft, ($t) => $t / duration);

	// Start countdown timer
	const startTimer = () => {
		timer = setInterval(() => {
			timeLeft.update((t) => {
				if (t > 0) return t - 1;
				clearInterval(timer);
				console.log("Meditation complete! Click data:", get(clickTimestamps));
				dispatch("complete", get(clickTimestamps));
				nextStep();
				return 0;
			});
		}, 1000);
	};
	startTimer();

	onDestroy(() => clearInterval(timer));

	const handleClick = () => {
		const timestamp = duration - get(timeLeft);
		clickCount.update((c) => c + 1);
		clickTimestamps.update((arr) => [...arr, timestamp]);
		console.log(`Click ${get(clickCount)} recorded at ${timestamp} seconds`);
	};

	const handleExit = () => {
		dispatch("complete", get(clickTimestamps));
		nextStep();
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center relative pointer-events-none">
	<div class="absolute flex flex-col items-center pointer-events-auto">
		<!-- Circular Timer -->
		<svg class="w-32 h-32" viewBox="0 0 100 100">
			<circle cx="50" cy="50" r="40" stroke="gray" stroke-width="5" fill="none" />
			<circle
				cx="50"
				cy="50"
				r="40"
				stroke="blue"
				stroke-width="5"
				fill="none"
				stroke-dasharray="251.2"
				stroke-dashoffset="{251.2 * $percentageTimeLeft}"
				transform="rotate(-90 50 50)"
			/>
			<text x="50" y="55" font-size="14" text-anchor="middle" fill="black">{$formattedTime}</text>
		</svg>

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
