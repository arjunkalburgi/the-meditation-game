<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import posthog from '$lib/posthog';
	import { getOrCreateUserId } from '$lib/session';
	
	afterNavigate((nav) => {
		if (nav.to?.url) {
			posthog.capture('$pageview', { path: nav.to.url.pathname });
		}
	});
	
	onMount(() => {
		const userId = getOrCreateUserId();
		posthog.identify(userId);
		posthog.capture('$pageview', { 
			path: window.location.pathname, 
			utm_source: new URLSearchParams(window.location.search).get('utm_source')
		});
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar> -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
