<script lang="ts">
	import DarkModeToggle from "./DarkModeToggle.svelte";
</script>

<div class="navbar bg-midnightblue dark:bg-midnightblue-dark text-white font-bold justify-center p-4">
	<div class="w-full max-w-prose text-lg flex justify-around" data-sveltekit-prefetch>
		<DarkModeToggle />
		<a class="link-hover text-base" href="/about">
			about
		</a>
		<a class="link-hover text-base" href="/topical">
			topical
		</a>
		<a class="link-hover text-base" href="/yearly">
			yearly
		</a>
	</div>
</div>