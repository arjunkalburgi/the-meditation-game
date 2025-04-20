<script lang="ts">
	import posthog from '$lib/posthog';
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { DURATION_LABELS } from '$lib/types';
	import type { MeditationDuration } from '$lib/types';
	import { focusLevels } from '$lib/utils/levels';

	export let nextStep;
	export let closeModal;
	export let duration: MeditationDuration;
	export let levelId: string | null = "L1";

	// Get the level-specific instructions
	const level = focusLevels.find(l => l.id === levelId);
	const defaultInstructions = [
		"1. Feel the air move through your nose as you breathe",
		"2. <b>Tap anywhere on the screen</b> when you lose focus",
		"3. <b>Exit meditation</b> to end early",
		"4. Relax and have fun"
	];
	const instructions = level?.instructions || defaultInstructions;

	let currentStep = 0;

	onMount(() => {
		posthog.capture("instructions_viewed", { level: levelId });
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
		posthog.capture("instructions_exit", { instructions_viewed: currentStep, level: levelId });
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
		<p class="text-lg max-w-sm" transition:fade>{@html instruction}</p>
	{/each}

	{#if currentStep >= instructions.length}
		<button class="btn variant-filled px-4 py-2 mt-4" on:click={nextStep} transition:fade>
			Start meditation countdown
		</button>
		<i class="text-sm text-gray-500">Meditating for {DURATION_LABELS[duration]}</i>
	{/if}
</div>
