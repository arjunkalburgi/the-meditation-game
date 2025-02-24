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
</div>

<Modal title={modalTitle} message={modalMessage} bind:show={showModal} />

<style lang="postcss">
	.container {
		@apply flex justify-center items-center;
	}
</style>
