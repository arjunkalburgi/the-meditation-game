<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import Instructions from "./Instructions.svelte";
	import Countdown from "./Countdown.svelte";
	import Meditation from "./Meditation.svelte";
	import Results from "./Results.svelte";
	import { MeditationDuration, type MeditationResults } from '$lib/types';
	import { db } from '$lib/db';
	import { calculateStars, selectBestSession } from '$lib/utils/gamification';
	import { checkTaskCompletion } from '$lib/utils/levelQueries';
	import { focusLevels } from '$lib/utils/levels';

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
		const currentLevelId = levelId || "L1";
		const level = focusLevels.find(l => l.id === currentLevelId);
		if (!level) return;

		// Get all sessions for this level
		const levelSessions = await db.sessions.where('levelId').equals(currentLevelId).toArray();
		
		// Get task completion status before adding new session
		const previousTaskCompletion = await checkTaskCompletion(currentLevelId);
		const previousCompletedTaskIds = new Set(
			Object.entries(previousTaskCompletion)
				.filter(([_, completed]) => completed)
				.map(([taskId]) => taskId)
		);
		
		// Calculate previous star rating
		const previousPerSessionCompleted: Set<string>[] = levelSessions.map(session => {
			const sessionCompletedTasks = new Set<string>();
			if (session.tapCount > 0) sessionCompletedTasks.add('tap_once');
			if (session.completed) sessionCompletedTasks.add('no_early_exit');
			if (session.duration >= level.maxDuration) sessionCompletedTasks.add('max_duration');
			return sessionCompletedTasks;
		});
		
		const previousStarRating = calculateStars(
			level.starRules,
			previousCompletedTaskIds,
			previousPerSessionCompleted
		);
		
		// Add new session to the array for new star calculation
		const newSession = {
			levelId: currentLevelId,
			duration: durationMeditated,
			tapCount: clickTimestamps.length,
			tapTimestamps: clickTimestamps,
			timestamp: Date.now(),
			completed
		};
		await db.sessions.add(newSession);
		
		// Get updated task completion status
		const completionTaskResults = await checkTaskCompletion(currentLevelId);
		const newCompletedTaskIds = new Set(
			Object.entries(completionTaskResults)
				.filter(([_, completed]) => completed)
				.map(([taskId]) => taskId)
		);
		
		// Calculate newly completed tasks
		const newlyCompletedTasks = Object.entries(completionTaskResults)
			.filter(([taskId, completed]) => completed && !previousTaskCompletion[taskId])
			.map(([taskId]) => taskId);
		
		// Calculate new star rating with the new session
		const updatedSessions = [...levelSessions, newSession];
		const newPerSessionCompleted: Set<string>[] = updatedSessions.map(session => {
			const sessionCompletedTasks = new Set<string>();
			if (session.tapCount > 0) sessionCompletedTasks.add('tap_once');
			if (session.completed) sessionCompletedTasks.add('no_early_exit');
			if (session.duration >= level.maxDuration) sessionCompletedTasks.add('max_duration');
			return sessionCompletedTasks;
		});
		
		const newStarRating = calculateStars(
			level.starRules,
			newCompletedTaskIds,
			newPerSessionCompleted
		);
		
		// Check if this is a new personal best
		const bestSession = selectBestSession(updatedSessions);
		const isNewPersonalBest = bestSession && 
			(bestSession.tapCount === clickTimestamps.length && bestSession.duration === durationMeditated);

		meditationResults = {
			...event.detail,
			levelId: currentLevelId,
			previousStarRating,
			newStarRating,
			newlyCompletedTasks,
			completionTaskResults,
			isNewPersonalBest: isNewPersonalBest || false,
			personalBest: bestSession
		};

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
					<Instructions {nextStep} {duration} {closeModal} {levelId} />
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
