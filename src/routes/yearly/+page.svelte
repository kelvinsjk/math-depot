<script lang="ts">
	import {maxQnNo} from '$lib/years/amath/years';
  const years = ["13", "14", "15", "16", "17", "18", "19", "20"];
	const qnNos = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
</script>

<svelte:head>
  <title>Yearly Listings</title>
  <meta
			name="description"
			content="Mobile friendly answers and solutions to O Level Elementary and Additional Mathematics"
		/>
</svelte:head>
<main class="prose px-2 pt-4 mx-auto dark:text-zinc-100">
  <h1 class="dark:text-goldenrod">Yearly Listings</h1>
  <h2 class="dark:text-goldenrod">Additional Mathematics</h2>
    <div class="max-w-prose mx-auto text-lg" data-sveltekit-preload-data>
			{#each years.reverse() as year}
			<div class="flex gap-x-2 flex-wrap">
				{`20${year}`} Paper 1:
			{#each qnNos.slice(0,maxQnNo[year][0]) as qNo}
				<a href="/amath/{`${year}p1q${qNo}`}" class="dark:text-zinc-400">
					Q{Number(qNo)}
				</a>
			{/each}
			</div>
			<div class="flex gap-x-2 flex-wrap">
				{`20${year}`} Paper 2:
			{#each qnNos.slice(0,maxQnNo[year][1]) as qNo}
				<a href="/amath/{`${year}p2q${qNo}`}" class="dark:text-zinc-400">
					Q{Number(qNo)}
				</a>
				{/each}
			</div>
      <hr>
      {/each}
		</div>
</main>

<style>
  main {
    padding-bottom: 1rem;
  }
  hr {
    margin-block: 0.5rem;
  }
</style>