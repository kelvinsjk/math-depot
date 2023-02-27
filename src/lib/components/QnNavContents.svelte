<script lang="ts">
  export let length: number;
	export let linkToTop = false;
</script>

<div class="flex gap-x-4 justify-center flex-wrap">
	{#each [...Array(length).keys()] as i}
		<a class="dark:text-zinc-100" href={`#qn-${i+1}`}>Q{i+1}</a>
	{/each}
	{#if linkToTop}
		<a href="#top" class="dark:text-zinc-100 link">&#9650;</a>
	{/if}
</div>