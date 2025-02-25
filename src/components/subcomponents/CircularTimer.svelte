<script lang="ts">
	import { derived, type Writable } from "svelte/store";
	import { onMount, onDestroy } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { secondsToDisplayTime } from "$lib/utils";

	export let duration: number;
	export let timeLeft: Writable<number>
	const dispatch = createEventDispatcher<{ complete: void }>();

	let wakeLock: WakeLockSentinel | null = null;
	let timer: NodeJS.Timeout;
	
	const formattedTime = derived(timeLeft, ($t) => secondsToDisplayTime($t));
	const percentageTimeLeft = derived(timeLeft, ($t) => $t / duration);

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
		timer = setInterval(() => {
			timeLeft.update((t) => (t > 0 ? t - 1 : (clearInterval(timer), dispatch("complete"), 0)));
		}, 1000);

		// Request wake lock to prevent device from sleeping during countdown
		handleWakeLock(true);
	})

	onDestroy(() => {
		clearInterval(timer)
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
