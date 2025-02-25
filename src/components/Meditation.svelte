<script lang="ts">
	import posthog from '$lib/posthog';
	import { fade } from "svelte/transition";
	import { writable, derived, get } from "svelte/store";
	import { createEventDispatcher } from "svelte";
	import CircularTimer from "./subcomponents/CircularTimer.svelte";
	import type { MeditationResults } from '$lib/types';

	export let nextStep: () => void;
	export let duration: number;
	const dispatch = createEventDispatcher<{ complete: MeditationResults }>();

	const timeLeft = writable<number>(duration);
	const clickCount = writable<number>(0);
	const clickTimestamps = writable<number[]>([]);
	const ripple = writable<{ x: number, y: number } | null>(null);

	const handleClick = (event: MouseEvent) => {
		const timestamp = duration - get(timeLeft);
		clickCount.update((c) => c + 1);
		clickTimestamps.update((arr) => [...arr, timestamp]);
		console.log(`Click ${get(clickCount)} recorded at ${timestamp} seconds`);
		posthog.capture("game_tap", { timestamp, total_taps: get(clickCount), level: 0, button: "distracted" });

		const { clientX, clientY, currentTarget } = event;
		const rect = (currentTarget as HTMLElement).getBoundingClientRect();
		ripple.set({ x: clientX - rect.left, y: clientY - rect.top });
		setTimeout(() => ripple.set(null), 600);
	};

	const handleExit = () => {
		posthog.capture("meditation_exit", { duration_meditated: duration - get(timeLeft), total_taps: get(clickTimestamps).length, level: 0 });
		dispatch("complete", {
			clickTimestamps: get(clickTimestamps), 
			durationMeditated: duration - get(timeLeft), 
			completed: get(timeLeft) < 5
		});
		nextStep();
	};

	const handleTimerComplete = () => {
		console.log("Meditation complete! Click data:", get(clickTimestamps));
		posthog.capture("meditation_completed", { duration, total_taps: get(clickTimestamps).length, level: 0 });
		dispatch("complete", {
			clickTimestamps: get(clickTimestamps), 
			durationMeditated: duration, 
			completed: true
		});
		nextStep();
	};

	// Function to generate a short beep sound
	const playBeep = () => {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.type = "sine"; // Creates a classic beep sound
		oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // Set frequency (Hz)
		gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Volume

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		oscillator.start();
		setTimeout(() => {
			oscillator.stop();
		}, 100); // 100ms beep duration
	};

	// Play a beep sound every 10 seconds
	const bleepWatcher = derived(timeLeft, ($timeLeft) => {
		if ($timeLeft < duration && $timeLeft % 10 === 0) playBeep();
	});
	$bleepWatcher;
</script>

<div class="w-full h-full flex flex-col items-center justify-center relative pointer-events-none">
	<div class="absolute flex flex-col items-center pointer-events-auto p-6">
		<CircularTimer {duration} {timeLeft} on:complete={handleTimerComplete} />
		<p class="text-lg mt-4 text-center">Tap anywhere on the screen to record your distractions</p>
		{#if $clickCount}
			<p class="text-lg mt-4 text-center">{$clickCount} distractions</p>
		{/if}
	</div>

	<!-- Fullscreen Tap Button -->
	<button class="absolute inset-0 w-full h-full bg-transparent pointer-events-auto relative overflow-hidden" on:click={handleClick}>
		{#if $ripple}
			<div class="ripple" style="top: {$ripple.y}px; left: {$ripple.x}px;"></div>
		{/if}
	</button>
	
	<button 
		class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"
		on:click={handleExit} 
		transition:fade
	>
		Exit Meditation
	</button>
</div>

<style>
	.ripple {
		position: absolute;
		width: 100px;
		height: 100px;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		animation: ripple-animation 0.6s ease-out;
		pointer-events: none;
	}

	@keyframes ripple-animation {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(3);
			opacity: 0;
		}
	}
</style>