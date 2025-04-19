<script lang="ts">
	import Modal from "$components/CoreLoop.svelte";
	import DurationPicker from "$components/subcomponents/DurationPicker.svelte";
	import { MeditationDuration } from "$lib/types";

	let showModal: boolean = false;
	let selectedDuration: number = MeditationDuration.ONE_MINUTE;

	const startMeditation = () => {
		if (!window.audioContext) {
			window.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		}

		showModal = true;
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center p-6">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to The Meditation Game!</h2>
		<p>Learn how to meditate through gameplay</p>
		<DurationPicker selectedDuration={selectedDuration} onDurationChange={(d) => selectedDuration = d} />
		<div class="flex justify-center space-x-2">
			<button class="btn variant-filled" on:click={startMeditation}>
				Start meditation
			</button>
		</div>
	</div>

	<div class="absolute bottom-6 text-center text-sm text-gray-500">
		<p>
			Learn to meditate for real at 
			<a href="https://www.dhamma.org" target="_blank" class="text-blue-500 underline">dhamma.org ↗</a>
		</p>
		<p class="mt-2">
			This app was made by Arjun Kalburgi, PM with 5 years experience. 
			Hire him to build your 0-1 consumer products! 
			<a href="https://www.linkedin.com/in/arjunkalburgi" target="_blank" class="text-blue-500 underline">View LinkedIn ↗</a>
		</p>
	</div>
</div>

<Modal bind:show={showModal} duration={selectedDuration} />

<style lang="postcss">
	.container {
		@apply flex justify-center items-center;
	}
</style>
