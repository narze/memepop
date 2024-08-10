<script lang="ts">
	import { onMount } from 'svelte';
	import FileSaver from 'file-saver';

	import { browser } from '$app/environment';
	import type CanvasComponent from '$lib/Canvas.svelte';
	import image from '$lib/image.jpg';
	import { copyImageToClipboard } from '$lib/copy-image-clipboard';

	let Canvas: typeof CanvasComponent;
	let canvas: CanvasComponent;
	let imageModal: HTMLDialogElement;
	let imgDataURL: string;
	let isInApp: boolean;
	let appName: string | undefined;

	onMount(async () => {
		Canvas = (await import('$lib/Canvas.svelte')).default;

		if (browser) {
			const InAppSpy = (await import('inapp-spy')).default;
			({ isInApp, appName } = InAppSpy());
		}
	});

	const generateImage = () => {
		const imageType = image.split('.').at(-1)!;
		imgDataURL = canvas.saveImage(imageType);

		imageModal.showModal();
	};

	function download() {
		FileSaver.saveAs(imgDataURL);
	}

	function copy() {
		copyImageToClipboard(imgDataURL)
			.then(() => {
				if (window.location.hostname === 'localhost') {
					console.log('Image Copied');
				}
			})
			.catch((e) => {
				alert('Error: ' + e.message);
			});
	}
</script>

<section class="flex h-full flex-col items-center justify-center gap-4">
	<svelte:component this={Canvas} bind:this={canvas} bgUrl={image} />

	<button on:click={generateImage} class="btn">Save</button>

	<dialog class="modal" bind:this={imageModal}>
		<div class="modal-box space-y-4">
			<p class="text-center">Generated image</p>
			<h3 class="text-lg font-bold">
				<img src={imgDataURL} alt="" />
			</h3>
			<p class="space-x-4 text-center">
				<button class="btn btn-primary" on:click={download}>Download</button>
				<button class="btn btn-primary" on:click={copy}>Copy</button>
			</p>
			{#if isInApp}
				<p class="text-center">
					If you cannot copy or save the image{appName ? ` from ${appName}` : ''}, open this website
					in mobile browser.
				</p>
			{/if}
			<form method="dialog" class="modal-form">
				<div class="flex justify-center">
					<button class="btn">Close</button>
				</div>
			</form>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</section>
