<script lang="ts">
	import { onMount } from 'svelte';
	import { Stage, Layer, Image } from 'svelte-konva';

	import { resize } from '@svelte-put/resize';
	import type { ResizeDetail } from '@svelte-put/resize';

	import EditableText from './EditableText.svelte';

	export let bgUrl = 'https://placehold.co/600x400/000000/FFF';
	export let text = 'Text';

	let image: HTMLImageElement;
	let container: HTMLDivElement;

	let width = 100.0;
	let height = 100.0;

	let imgWidth = 1;
	let imgHeight = 1;

	const maxWidth = 640;

	function onResized(e?: CustomEvent<ResizeDetail>) {
		if (e) {
			const { entry } = e.detail;
			width = entry.contentRect.width;
			height = width * (imgHeight / imgWidth);
		} else {
			width = Math.min(maxWidth, window.innerWidth - 16);
			height = width * (imgHeight / imgWidth);
		}
	}

	onMount(() => {
		const img = document.createElement('img');
		img.src = bgUrl;
		img.onload = () => {
			image = img;
			imgWidth = img.width;
			imgHeight = img.height;
		};

		window.addEventListener('resize', () => onResized());

		return () => {
			window.removeEventListener('resize', () => onResized());
		};
	});
</script>

<div
	class={`container min-w-80`}
	style={`max-width: ${maxWidth}px;`}
	bind:this={container}
	use:resize
	on:resized={onResized}
>
	<Stage config={{ width, height }}>
		<Layer>
			<Image config={{ image, width, height }} />
			<EditableText {text} />
		</Layer>
	</Stage>
</div>
