<script lang="ts">
	import { onMount } from 'svelte';
	import FileSaver from 'file-saver';

	import { browser } from '$app/environment';
	import type CanvasComponent from '$lib/Canvas.svelte';
	import { copyImageToClipboard } from '$lib/copy-image-clipboard';
	import { config, type OverlayColor } from '$lib/config';

	let Canvas: typeof CanvasComponent;
	let canvas: CanvasComponent;
	let imageModal: HTMLDialogElement;
	let imgDataURL: string;
	let isInApp: boolean;
	let appName: string | undefined;
	let image: string;
	let overlay: string | undefined;
	let overlayColor: OverlayColor;

	const images = loadImages();
	const overlays = loadOverlayImages();

	onMount(async () => {
		overlay = overlays.at(0);
		Canvas = (await import('$lib/Canvas.svelte')).default;

		if (browser) {
			const InAppSpy = (await import('inapp-spy')).default;
			({ isInApp, appName } = InAppSpy());
		}
	});

	// Import all images (jpg, jpeg, png) from $lib/images folder
	// file name starts with _ are ignored
	function loadImages() {
		return Object.values(
			import.meta.glob<{ default: string }>('$lib/images/*.{jpg,jpeg,png}', { eager: true })
		)
			.map((m) => m.default)
			.filter((p) => !p.split('/').at(-1)?.startsWith('_'));
	}

	function loadOverlayImages() {
		return Object.values(
			import.meta.glob<{ default: string }>('$lib/images/overlays/*.{jpg,jpeg,png}', {
				eager: true
			})
		)
			.map((m) => m.default)
			.filter((p) => !p.split('/').at(-1)?.startsWith('_'));
	}

	function saveImage() {
		const imageType = image.split('.').at(-1)!;
		imgDataURL = canvas.saveImage(imageType);

		imageModal.showModal();
	}

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

	function humanizeString(str: string) {
		return str
			.replace(/^[\s_]+|[\s_]+$/g, '')
			.replace(/[_\s]+/g, ' ')
			.replace(/^[a-z]/, function (m) {
				return m.toUpperCase();
			});
	}
</script>

<section class="flex h-full flex-col items-center justify-center gap-4">
	<h1 class="text-3xl font-bold">{config.title}</h1>

	{#if images.length === 0}
		<p>No images found</p>
	{:else}
		{#key image + overlay}
			<svelte:component
				this={Canvas}
				bind:this={canvas}
				bgUrl={image}
				overlayUrl={overlay}
				{overlayColor}
			/>
		{/key}
	{/if}

	{#if images.length > 1}
		<select class="select select-bordered w-full max-w-xs" bind:value={image}>
			{#each images as path}
				<option value={path}>{humanizeString(path.split('/').at(-1)!.split('.').at(0)!)}</option>
			{/each}
		</select>
	{/if}

	{#if overlays.length > 1}
		<select class="select select-bordered w-full max-w-xs" bind:value={overlay}>
			{#each overlays as path}
				<option value={path}>{humanizeString(path.split('/').at(-1)!.split('.').at(0)!)}</option>
			{/each}
		</select>
	{/if}

	{#if config.overlay && config.overlay.colors?.length > 0}
		<select class="select select-bordered w-full max-w-xs" bind:value={overlayColor}>
			{#if config.overlay.blankLabel}
				<option>{config.overlay.blankLabel}</option>
			{/if}
			{#each config.overlay.colors as color}
				<option value={color}>{color.name}</option>
			{/each}
		</select>
	{/if}

	<button on:click={saveImage} class="btn">Save</button>

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
