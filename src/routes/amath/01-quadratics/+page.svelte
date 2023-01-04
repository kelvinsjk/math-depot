<script lang="ts">
  import {qns} from '$lib/topics/amath/01-quadratics/qns';
</script>

<svelte:head>
	<title>Quadratics Contents</title>
</svelte:head>

<div class="prose mx-auto">
	<header class="p-4 pb-8 sm:text-center bg-goldenrod dark:bg-zinc-800">
		<h1 class="font-serif text-zinc-900 dark:text-goldenrod" id="top">
			Unit 1: Quadratic Functions, Equations and Inequalities
		</h1>
    <div class="font-serif text-3xl font-bold subtitle text-zinc-900 dark:text-goldenrod">
			Contents
		</div>
	</header>
	<main class="mx-4 dark:text-zinc-100">
    <ol>
      {#each qns as qn}
      <li><a class="link dark:text-zinc-400" href="/amath/{qn.url}">{qn.text}</a></li>
      {/each}
    </ol>
  </main>
</div>

<style>
	header {
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	a {
    font-family: serif;
  }
</style>