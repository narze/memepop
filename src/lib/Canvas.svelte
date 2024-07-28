<script lang="ts">
	import { onMount } from 'svelte';
	import { Stage, Layer, Image } from 'svelte-konva';

	import EditableText from './EditableText.svelte';

	export let bgUrl = 'https://placehold.co/600x400/000000/FFF';
	export let text = 'Text';

	let image: HTMLImageElement;
	let container: HTMLDivElement;

	let width: number;
	let height: number;

	let imgWidth: number;
	let imgHeight: number;

	let imgScaleToFit: number;
	let canvasScale: number;
	let maxWidth: number;

	const minWidth = 320;

	$: if (image) {
		imgWidth = image.width;
		imgHeight = image.height;
	}

	$: if (width && imgWidth) {
		imgScaleToFit = width / imgWidth;
	}

	$: if (width && maxWidth && imgHeight && imgWidth) {
		height = width * (imgHeight / imgWidth);

		canvasScale = width / maxWidth;
	}

	$: if (container) {
		const maxWidthPx = getComputedStyle(container).maxWidth;
		maxWidth = parseInt(maxWidthPx.replace('px', ''));
	}

	function onResized() {
		width = window.innerWidth - (container?.offsetLeft ?? 16) * 2;
		// clamp width between min and max
		width = Math.min(maxWidth, Math.max(minWidth, width));
		height = width * (imgHeight / imgWidth);
	}

	onMount(() => {
		const img = document.createElement('img');
		img.src = bgUrl;
		img.onload = () => (image = img);

		window.addEventListener('resize', () => onResized());

		return () => {
			window.removeEventListener('resize', () => onResized());
		};
	});
</script>

<div
	class="container max-w-screen-lg mx-auto"
	bind:this={container}
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<Stage
		config={{ width, height }}
		class="flex justify-center"
		style={`background-color: transparent;`}
	>
		<Layer config={{ scaleX: imgScaleToFit, scaleY: imgScaleToFit }}>
			<Image config={{ image }} />
		</Layer>
		<Layer config={{ scaleX: canvasScale, scaleY: canvasScale }}>
			<EditableText {text} />
		</Layer>
	</Stage>
</div>
