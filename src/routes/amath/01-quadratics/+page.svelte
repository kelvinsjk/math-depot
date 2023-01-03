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
      <li><a class="link" href="/amath/{qn.url}">{qn.text}</a></li>
      {/each}
    </ol>
  </main>

  <!--
	<footer class="p-4 mt-2 bg-goldenrod dark:bg-zinc-800 dark:text-zinc-200">
		<div class="max-w-prose mx-auto text-lg" data-sveltekit-prefetch>
			<h2 class="mt-0 dark:text-goldenrod">
				More solutions
			</h2>
			<h3 class="dark:text-zinc-100">
				From the same year:
			</h3>
		-->
			<!--year-->
	<!--
			<div class="flex gap-2 flex-wrap">
				20{year} Paper 1:
				{#each yearlyList1 as i}
					{#if paper==="1" && i===Number(qnNo)}
					<div class="text-red-700 dark:text-red-400 font-semibold">
						Q{Number(i)}
					</div>
					{:else}
					<a href={`/${qn.slice(0,3)}1q${qnNos[i-1]}`} class="dark:text-zinc-400">
						Q{Number(i)}
					</a>
					{/if}
				{/each}
			</div>
			<div class="flex gap-2 flex-wrap">
				20{year} Paper 2:
				{#each yearlyList2 as i}
					{#if paper==="2" && i===Number(qnNo)}
					<div class="text-red-700 dark:text-red-400 font-semibold">
						Q{Number(i)}
					</div>
					{:else}
					<a href={`/${qn.slice(0,3)}2q${qnNos[i-1]}`} class="dark:text-zinc-400">
						Q{Number(i)}
					</a>
					{/if}
				{/each}
			</div>
		-->
			<!--topics-->
		<!--
			{#if topic !== ''}
			{#each topicalQns as qnArray,i}
			<h3 class="dark:text-zinc-100">
				{topic ? topic : topics[i]}:
			</h3>
			<div class="grid grid-qns">
				{#each qnArray as q}
					{#if q===qn}
					<div class="text-red-700 dark:text-red-400 font-semibold">
						20{q.slice(0,2)} P{q[3]} Q{Number(q.slice(5))}
					</div>
					{:else}
					<a href={`/${q}`} class="dark:text-zinc-400">
						20{q.slice(0,2)} P{q[3]} Q{Number(q.slice(5))}
					</a>
					{/if}
					{/each}
				</div>
			{/each}
			{/if}
		</div>
	</footer>
	-->
</div>

<style>
	header, footer {
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	a {
    font-family: serif;
  }
</style>