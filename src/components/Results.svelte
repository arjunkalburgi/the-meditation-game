<script lang="ts">
	import posthog from '$lib/posthog';
	import type { MeditationResults } from '$lib/types';
	import { secondsToDisplayTime } from '$lib/utils';

	export let closeModal;
	export let meditationResults: MeditationResults;

	const totalDistractions = meditationResults.clickTimestamps.length;
	const distractionRate = totalDistractions > 0 
		? (totalDistractions / (meditationResults.durationMeditated / 60)).toFixed(1)
		: '0';

	const getDurationText = (duration: number) => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		if (minutes === 0) {
			return seconds + ' second' + (seconds === 1 ? '' : 's');
		}
		return minutes + ' minute' + (minutes === 1 ? '' : 's') + (seconds > 0 ? ' and ' + seconds + ' second' + (seconds === 1 ? '' : 's') : '');
	};

	const shareResults = () => {
		if (navigator.share) {
			posthog.capture("results_shared", { total_taps: totalDistractions, distractionRate, level: 0 });
			const shareText = 'The Meditation Game App\n' +
				'I just finished a ' + getDurationText(meditationResults.durationMeditated) + ' meditation with ' + totalDistractions + ' distractions.\n' +
				'That\'s about ' + distractionRate + ' distractions per minute.\n' +
				'Meditate here: https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share';
			navigator.share({
				text: shareText,
			}).catch((error) => console.error("Sharing failed", error));
		} else {
			console.log("Web Share API not supported");
		}
	};

	const handleExit = () => {
		posthog.capture("results_exit", { shared: navigator.share !== undefined });
		closeModal();
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center p-6">
	<h2 class="text-2xl font-bold">Great practice!</h2>

	{#if meditationResults.clickTimestamps.length > 0}
		<p class="text-lg mt-4">
			You meditated for {getDurationText(meditationResults.durationMeditated)} and recorded {totalDistractions} {totalDistractions === 1 ? 'distraction' : 'distractions'}.
		</p>
		<p class="text-lg mt-2">
			That's about {distractionRate} {Number(distractionRate) === 1 ? 'distraction' : 'distractions'} per minute.
		</p>
	{:else}
		<p class="text-lg mt-4">You completed your meditation distraction-free!</p>
	{/if}

	<div class="mt-6 flex space-x-4">
		<button class="btn variant-filled px-4 py-2" on:click={shareResults}>
			Share
		</button>
	</div>

	<div class="mt-6 flex space-x-4">
		<button class="btn variant-outlined px-4 py-2" on:click={handleExit}>
			Exit
		</button>
	</div>
	
	<div class="absolute bottom-6 text-center text-sm text-gray-500">
		<p>
			Learn to meditate for real at 
			<a href="https://www.dhamma.org" target="_blank" class="text-blue-500 underline">dhamma.org ↗</a>
		</p>
		<p class="mt-2">
			This app was made by Arjun, PM with 5 years experience. 
			Hire him to build your 0-1 consumer products! 
			<a href="https://www.linkedin.com/in/arjunkalburgi" target="_blank" class="text-blue-500 underline">View LinkedIn ↗</a>
		</p>
	</div>
</div>
