<script lang="ts">
	import posthog from '$lib/posthog';
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
	<button 
		class="absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 fade-in"
		style="animation-delay: {instructions.length}s"
		on:click={handleExit}
	>
		Exit Meditation
	</button>

	{#each instructions as instruction, i}
		<p class="text-lg max-w-sm fade-in" style="animation-delay: {i}s">{@html instruction}</p>
	{/each}

	<div class="flex flex-col items-center space-y-4">
		<button class="btn variant-filled px-4 py-2 mt-8 fade-in" style="animation-delay: {instructions.length}s" on:click={nextStep}>
			Start meditation countdown
		</button>
		<i class="text-sm text-gray-500 fade-in" style="animation-delay: {instructions.length}s">Meditating for {DURATION_LABELS[duration]}</i>
	</div>
</div>

<style>
	.fade-in {
		opacity: 0;
		animation: fadeIn 0.6s forwards;
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>