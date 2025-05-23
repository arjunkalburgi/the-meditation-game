<script lang="ts">
	import { derived, writable } from "svelte/store";
	import { onMount, onDestroy } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { secondsToDisplayTime } from "$lib/utils";

	export let duration: number;
	export let startTimestamp: number;
	const dispatch = createEventDispatcher<{ complete: void }>();
	
	let timeLeft = writable<number>(duration);
	let wakeLock: WakeLockSentinel | null = null;
	let timer: NodeJS.Timeout;
	
	const soundFile = "/sounds/gong.mp3";
	let audioBuffer: AudioBuffer | null = null;
	
	const formattedTime = derived(timeLeft, ($t) => secondsToDisplayTime($t));
	const percentageTimeLeft = derived(timeLeft, ($t) => $t / duration);

	const playSound = async () => {
		if (!window.audioContext || !audioBuffer) return;
		
		try {
			const source = window.audioContext.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(window.audioContext.destination);
			source.start(0);
		} catch (err) {
			console.error('Error playing sound:', err);
		}
	};

	const loadSound = async () => {
		if (!window.audioContext) return;
		
		try {
			const response = await fetch(soundFile);
			const arrayBuffer = await response.arrayBuffer();
			audioBuffer = await window.audioContext.decodeAudioData(arrayBuffer);
		} catch (err) {
			console.error('Error loading sound:', err);
		}
	};

	const onTimerComplete = () => {
		clearInterval(timer);
		playSound();
		dispatch("complete");
	}

	const handleWakeLock = async (activate: boolean) => {
		try {
			if (!("wakeLock" in navigator)) return;
			if (activate) {
				wakeLock = await navigator.wakeLock.request("screen");
			} else if (wakeLock) {
				await wakeLock.release();
				wakeLock = null;
			}
		} catch (err) {
			console.error(`Wake Lock ${activate ? "request" : "release"} failed:`, err);
		}
	}

	onMount(() => {
		startTimestamp = Date.now();
		timer = setInterval(() => {
			timeLeft.update((t) => (t > 0 ? t - 1 : (onTimerComplete(), 0)));
		}, 1000);

		// Load the sound file
		loadSound();

		// Request wake lock to prevent device from sleeping during countdown
		handleWakeLock(true);
	})

	onDestroy(() => {
		clearInterval(timer);
		handleWakeLock(false);
	});
</script>

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
