<script lang="ts">
	import { fade } from "svelte/transition";
	import Instructions from "./Instructions.svelte";
	import Meditation from "./Meditation.svelte";
	import Results from "./Results.svelte";

	// export let title;
	// export let message;
	export let show = false;
	let step: number = 1;
	let meditationResults: number[] = [];

	const closeModal = () => {
		show = false;
		step = 1; // Reset steps when closing
	};

	const handleMeditationComplete = (results: CustomEvent<number[]>): void => {
		meditationResults = results.detail;
		nextStep();
	};

	const nextStep = () => {
		if (step < 3) step += 1;
	};
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" transition:fade={{ duration: 500 }}>
		<div class="fixed inset-0 bg-white flex flex-col items-center justify-center p-6" transition:fade={{ duration: 500 }}>
			<!-- <h2 class="text-lg font-semibold">{title}</h2>
			<p class="mt-2">{message}</p> -->
			{#if step === 1}
				<Instructions {nextStep} {closeModal} />
			{:else if step === 2}
				<Meditation {nextStep} on:complete={(e) => handleMeditationComplete(e)} />
			{:else}
				<Results {closeModal} {meditationResults} />
			{/if}
		</div>
	</div>
{/if}
