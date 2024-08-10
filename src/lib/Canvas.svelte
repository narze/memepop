<script lang="ts">
	import { onMount } from 'svelte';
	import { Stage, Layer, Image } from 'svelte-konva';

	import EditableText from './EditableText.svelte';
	import Konva from 'konva';
	import { initialTextArray } from './config';

	export let bgUrl = 'https://placehold.co/600x400/000000/FFF';

	let textArray = initialTextArray;

	export function saveImage(type: string) {
		const mimeType = type === 'png' ? 'image/png' : 'image/jpeg';

		textArray.forEach((text) => {
			text.el?.hideTransformer();
		});

		const dataURL = stage.toDataURL({
			pixelRatio: window.devicePixelRatio,
			mimeType,
			quality: 1
		});

		textArray.forEach((text) => {
			text.el?.showTransformer();
		});

		return dataURL;
	}

	let stage: Konva.Stage;
	let image: HTMLImageElement;
	let container: HTMLDivElement;

	let width: number;
	let height: number;

	let imgWidth: number;
	let imgHeight: number;

	let imgScaleToFit: number;
	let canvasScale: number;
	let maxWidth: number;
	let ready = false;

	const minWidth = 320;

	$: if (image) {
		imgWidth = image.width;
		imgHeight = image.height;
		ready = true;
	}

	$: if (width && imgWidth) {
		imgScaleToFit = width / imgWidth;
	}

	$: if (width && maxWidth && imgHeight && imgWidth) {
		height = width * (imgHeight / imgWidth);

		// if height is more than 70%, scale down
		if (height > window.innerHeight * 0.7) {
			height = window.innerHeight * 0.7;
			width = height * (imgWidth / imgHeight);
		}

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
	class="container mx-auto max-w-screen-lg"
	bind:this={container}
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<Stage
		bind:handle={stage}
		config={{ width, height }}
		class="flex justify-center"
		style={`background-color: transparent;`}
	>
		<Layer config={{ scaleX: imgScaleToFit, scaleY: imgScaleToFit }}>
			<Image config={{ image }} />
		</Layer>
		<Layer config={{ scaleX: canvasScale, scaleY: canvasScale }}>
			{#if ready}
				{#each textArray as text}
					<EditableText
						bind:this={text.el}
						text={text.text}
						fontSize={text.fontSize}
						xPercent={text.xPercent}
						yPercent={text.yPercent}
						color={text.color}
						editable={text.editable}
					/>
				{/each}
			{/if}
		</Layer>
	</Stage>
</div>
