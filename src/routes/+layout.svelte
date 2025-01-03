<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte'
	import '../app.css';
	let { children } = $props();
</script>
<div class="flex flex-col min-h-screen">
	<AppBar>
		<h1 class="h2">microConv</h1>
	</AppBar>
	<div class="flex-1 place-content-center">
		{@render children()}
	</div>
	<footer class="bg-surface-900  p-4">
		<p class="text-center text-lg">microConv - v{import.meta.env.PACKAGE_VERSION}</p>
		<p class="text-center">
			&copy; 2025 ulong32
		</p>
	</footer>
</div>
