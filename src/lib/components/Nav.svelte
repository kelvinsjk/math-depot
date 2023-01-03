<script lang="ts">
	import DarkModeToggle from "./DarkModeToggle.svelte";
</script>

<nav class="navbar bg-midnightblue dark:bg-midnightblue-dark text-white font-bold justify-center p-4">
	<div class="w-full max-w-prose text-lg flex justify-between" data-sveltekit-preload-data>
		<a class="text-lg link-hover" href="/">
			Math Depot
		</a>
		<div class="flex gap-4 items-center">
			<div class="hidden sm:block">
				<DarkModeToggle />
			</div>
			<a class="link-hover text-base hidden sm:block" href="/about">
				about
			</a>
			<a class="link-hover text-base" href="/topical">
				topic<span class="hidden sm:inline">al</span>
			</a>
			<a class="link-hover text-base" href="/yearly">
				year<span class="hidden sm:inline">ly</span>
			</a>
		</div>
	</div>
</nav>