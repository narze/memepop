<script type="ts">
	import '../app.css';
</script>

<div class="grid h-dvh grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="sticky top-0 z-10 backdrop-blur-sm p-4">(header)</header>

	<!-- Main -->
	<main class="p-4">
		<slot></slot>
	</main>

	<!-- Footer -->
	<footer class="p-4">(footer)</footer>
</div>
