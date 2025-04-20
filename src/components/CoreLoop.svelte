<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import Instructions from "./Instructions.svelte";
	import Countdown from "./Countdown.svelte";
	import Meditation from "./Meditation.svelte";
	import Results from "./Results.svelte";
	import { MeditationDuration, type MeditationResults } from '$lib/types';
	import { db } from '$lib/db';

	export let show = false;
	export let duration = MeditationDuration.ONE_MINUTE;
	export let levelId: string | null = null;
	let step: number = 1;
	let meditationResults: MeditationResults;

	const closeModal = () => {
		show = false;
		step = 1; // Reset steps when closing
	};

	const handleMeditationComplete = async (event: CustomEvent<MeditationResults>): Promise<void> => {
		const { clickTimestamps, durationMeditated, completed } = event.detail;

		await db.sessions.add({
			levelId: levelId || "L1",
			duration: durationMeditated,
			tapCount: clickTimestamps.length,
			tapTimestamps: clickTimestamps,
			timestamp: Date.now(),
			completed
		});

		meditationResults = event.detail;
		nextStep();
	};

	const nextStep = () => setTimeout(() => step++, 300);
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" transition:fade={{ duration: 500 }}>
		<div class="fixed inset-0 bg-white flex flex-col items-center justify-center" transition:fade={{ duration: 500 }}>
			<!-- <h2 class="text-lg font-semibold">{title}</h2>
			<p class="mt-2">{message}</p> -->
			{#if step === 1}
				<div class="absolute inset-0 flex flex-col" transition:fade="{{ duration: 300 }}">
					<Instructions {nextStep} {duration} {closeModal} />
				</div>
			{:else if step === 2}
				<div class="absolute inset-0 flex flex-col" transition:fade="{{ duration: 300 }}">
					<Countdown {nextStep} {closeModal} />
				</div>
			{:else if step === 3}
				<div class="absolute inset-0 flex flex-col" transition:fade="{{ duration: 300 }}">
					<Meditation {duration} {nextStep} on:complete={(e) => handleMeditationComplete(e)} />
				</div>
			{:else}
				<div class="absolute inset-0 flex flex-col" transition:fade="{{ duration: 300 }}">
					<Results {closeModal} {meditationResults} />
				</div>
			{/if}
		</div>
	</div>
{/if}
