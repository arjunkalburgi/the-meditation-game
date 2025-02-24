<script>
	import { fade } from "svelte/transition";

	export let show = false;

	const closeModal = () => {
		show = false;
	};
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" transition:fade={{ duration: 500 }}>
		<div class="fixed inset-0 bg-white flex flex-col items-center justify-center p-6"
			transition:fade={{ duration: 500 }}
		>
			<div class="absolute top-4 left-1/2 transform -translate-x-1/2">
				<button class="btn variant-filled px-4 py-2" on:click={closeModal}>
					Exit meditation
				</button>
			</div>
		</div>
	</div>
{/if}
