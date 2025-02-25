<script lang="ts">
	import { fade } from "svelte/transition";
	import { writable } from "svelte/store"; 
	import CircularTimer from "./subcomponents/CircularTimer.svelte";

	export let nextStep: () => void;
	export let closeModal: () => void;

	const duration: number = 10;
	const timeLeft = writable<number>(duration);

	const handleTimerComplete = () => {
		nextStep();
	};
</script>

<div class="w-full h-full flex flex-col items-center justify-center relative pointer-events-none">
	<div class="absolute flex flex-col items-center pointer-events-auto">
		<CircularTimer duration={duration} timeLeft={timeLeft} on:complete={handleTimerComplete} />
	</div>

	<button 
		class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"
		on:click={closeModal} 
		transition:fade
	>
		Exit Meditation
	</button>
</div>
