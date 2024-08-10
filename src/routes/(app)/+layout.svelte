<script lang="ts">
	import { config } from '$lib/config';

	const title = config.title;
</script>

<svelte:head>
	<title>{title}</title>
	<!-- TODO: SEO -->
</svelte:head>

<div class="grid h-dvh grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="sticky top-0 z-10 p-4 backdrop-blur-sm">{config.headerText}</header>

	<!-- Main -->
	<main class="p-4">
		<slot></slot>
	</main>

	<!-- Footer -->
	<footer class="p-4">{config.footerText}</footer>
</div>
