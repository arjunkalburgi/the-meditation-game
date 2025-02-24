<script lang="ts">
	export let closeModal;
	export let meditationResults: number[] = [];
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<h2 class="text-2xl font-bold">Step 3: End with Gratitude</h2>

	{#if meditationResults.length > 0}
		<p class="text-lg mt-4">You recorded {meditationResults.length} distractions.</p>
		<ul class="mt-4">
			{#each meditationResults as timestamp, i}
				<li class="text-sm">Distraction {i + 1}: {timestamp} seconds</li>
			{/each}
		</ul>
	{:else}
		<p class="text-lg mt-4">You completed your meditation distraction-free!</p>
	{/if}

	<div class="mt-6 flex space-x-4">
		<button class="btn variant-outlined px-4 py-2" on:click={closeModal}>
			Exit
		</button>
	</div>
</div>
