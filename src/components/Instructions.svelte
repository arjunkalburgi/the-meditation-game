<script>
	import posthog from '$lib/posthog';
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	export let nextStep;
	export let closeModal;

	// The instructions to animate
	const instructions = [
		"1. To practice focus, a short sound will play every 10s",
		"2. When you hear the sound, **tap anywhere on the screen** if you’ve lost focus",
		"3. Press **exit meditation** at any time to end early",
		"4. Have fun"
	];

	let currentStep = 0;

	onMount(() => {
		posthog.capture("instructions_viewed");
		const interval = setInterval(() => {
			// +1 for start button
			if (currentStep < instructions.length + 1) {
				currentStep += 1;
			} else {
				clearInterval(interval);
			}
		}, 1000);
	});

	const handleExit = () => {
		posthog.capture("instructions_exit", { instructions_viewed: currentStep, level: 0 });
		closeModal();
	};

</script>

<div class="w-full h-full flex flex-col justify-center items-center px-6 space-y-6 text-center relative">
	<!-- Exit Meditation Button at Top Center -->
	{#if currentStep >= 3}
		<button 
			class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-filled px-4 py-2"
			on:click={handleExit} 
			transition:fade
		>
			Exit Meditation
		</button>
	{/if}

	<!-- Animated Instructions -->
	{#each instructions.slice(0, currentStep) as instruction}
		<p class="text-lg max-w-sm" transition:fade>{ instruction }</p>
	{/each}

	{#if currentStep >= 5}
		<button class="btn variant-filled px-4 py-2 mt-4" on:click={nextStep} transition:fade>
			Start meditation countdown
		</button>
	{/if}
</div>
