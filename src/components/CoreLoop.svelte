<script lang="ts">
	import { fade } from "svelte/transition";
	import Instructions from "./Instructions.svelte";
	import Countdown from "./Countdown.svelte";
	import Meditation from "./Meditation.svelte";
	import Results from "./Results.svelte";
	import { getOrCreateUserId } from '$lib/session';

	// export let title;
	// export let message;
	export let show = false;
	let step: number = 1;
	let duration: number = 120;
	let meditationResults: number[] = [];

	const closeModal = () => {
		show = false;
		step = 1; // Reset steps when closing
	};

	const handleMeditationComplete = (event: CustomEvent<{
		clickTimestamps: number[], 
		durationMeditated: number, 
		completed: boolean 
	}>): void => {
		const { clickTimestamps, durationMeditated, completed } = event.detail;
		const userId = getOrCreateUserId();

		const session = {
			user_id: userId,
			created_at: new Date(new Date().getTime() - durationMeditated * 1000).toISOString(),
			level: 1,
			duration_meditated: durationMeditated,
			duration_planned: duration,
			total_clicks: clickTimestamps.length,
			click_timestamps: clickTimestamps,
			completed
		};

		const existingSessions = JSON.parse(localStorage.getItem("meditation_sessions") || "[]");
		existingSessions.push(session);
		localStorage.setItem("meditation_sessions", JSON.stringify(existingSessions));

		nextStep();
	};

	const nextStep = () => step++;
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" transition:fade={{ duration: 500 }}>
		<div class="fixed inset-0 bg-white flex flex-col items-center justify-center p-6" transition:fade={{ duration: 500 }}>
			<!-- <h2 class="text-lg font-semibold">{title}</h2>
			<p class="mt-2">{message}</p> -->
			{#if step === 1}
				<Instructions {nextStep} {closeModal} />
			{:else if step === 2}
				<Countdown {nextStep} {closeModal} />
			{:else if step === 3}
				<Meditation {duration} {nextStep} on:complete={(e) => handleMeditationComplete(e)} />
			{:else}
				<Results {duration} {closeModal} {meditationResults} />
			{/if}
		</div>
	</div>
{/if}
