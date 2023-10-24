<script lang="ts">
	import MultiAnswer from '$lib/components/MultiAnswer.svelte';
	import QnNavContents from '$lib/components/QnNavContents.svelte';

	import { answers } from './qns';
	const title = '2023 Elementary Mathematics Paper 1';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="prose mx-auto">
	<header class="p-4 sm:text-center bg-goldenrod dark:bg-zinc-800">
		<h1 class="font-serif text-zinc-900 dark:text-goldenrod" id="top">
			{title}
		</h1>
		<div class="flex gap-x-4 justify-center flex-wrap">
			<QnNavContents length={answers.length} />
		</div>
	</header>
	<main class="mx-4 py-4 dark:text-zinc-100">
		<MultiAnswer {answers} />
	</main>
</div>

<style>
	header {
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	main :global(p:first-child) {
		margin-top: 0;
	}
</style>
