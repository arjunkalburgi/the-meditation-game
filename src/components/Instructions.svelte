<script>
	export let nextStep;
	export let closeModal;
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<h2 class="text-2xl font-bold">Step 1: Begin Meditation</h2>
	<div class="mt-6 flex space-x-4">
		<button class="btn variant-filled px-4 py-2" on:click={nextStep}>
			Start Meditation
		</button>
		<button class="btn variant-outlined px-4 py-2" on:click={closeModal}>
			Exit Meditation
		</button>
	</div>
</div>
