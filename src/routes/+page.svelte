<script>
	import Modal from "$components/CoreLoop.svelte";

	let showModal = false;
	let modalTitle = "Start Meditation";
	let modalMessage = "Are you ready to begin your meditation session?";
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to The Meditation Game!</h2>
		<p>Learn how to meditate through gameplay</p>
		<div class="flex justify-center space-x-2">
			<button class="btn variant-filled" on:click={() => (showModal = true)}>
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

<Modal bind:show={showModal} />
<!-- <Modal title={modalTitle} message={modalMessage} bind:show={showModal} /> -->

<style lang="postcss">
	.container {
		@apply flex justify-center items-center;
	}
</style>
