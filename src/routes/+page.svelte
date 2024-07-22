<script lang="ts">
	import { onMount } from 'svelte';
	import type CanvasComponent from '$lib/Canvas.svelte';

	let Canvas: typeof CanvasComponent;

	onMount(async () => {
		Canvas = (await import('$lib/Canvas.svelte')).default;
	});
</script>

<section class="flex flex-col items-center justify-center h-full">
	<svelte:component
		this={Canvas}
		bgUrl={'https://konvajs.org/assets/yoda.jpg'}
		text={'Meme, I embrace.'}
	/>
</section>
