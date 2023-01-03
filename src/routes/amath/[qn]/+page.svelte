<script lang="ts">
	import type { AnswerObject } from '$lib/interfaces';
	import type { PageData } from './$types';
	export let data: PageData;
	import {topicalList} from '$lib/topics/amath/topics'
	
	let answer: AnswerObject;
	let solution: AnswerObject;
	let qn: string;
	let topic: string;
	let topics: string[];
	let qnFound: boolean;
	({answer, solution, qn, topic, topics, qnFound} = data);
	$: ({answer, solution, qn, topic, topics, qnFound} = data);
	import Answer from '$lib/components/Answer.svelte';
	let year: string, paper: string, qnNo: string, yearlyList1: number[], yearlyList2: number[], topicalQns: string | string[], title: string;
	//import {yearlyLists, contents} from '$lib/nav/contents';
	const qnNos = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
	//import { topic as topicNo, year as yearNo } from '$lib/stores/topicAndYear';
	//const topicList = Object.keys(contents);
	$: {
		year =  qn.slice(0, 2);
		paper = qn[3];
		qnNo =  qn.slice(5);
	//	//yearlyList1 = yearlyLists[qn.slice(0,3)+'1'];
	//	//yearlyList2 = yearlyLists[qn.slice(0,3)+'2'];
	//	topicalQns = topic || topic==='' ? [contents[topic] ?? ['a']] : topics?.map(topic => contents[topic]);
		title = qnFound ? `20${year} P${paper} Q${Number(qnNo)}${topics ? `: ${topics[0]}, ${topics[1]}` : `: ${topic}`}` : 'Solution Not Found';
	//	if (qnFound){
	//		yearNo.set(Number(year));
	//		topicNo.set(topicList.indexOf(topic ? topic : topics[0]));
	//	}
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content=
	{`Answers and solutions for A Level H2 Mathematics
		20${year} Paper ${paper} Question 
		${Number(qnNo)}${topics ? `: ${topics[0]}, ${topics[1]}` : `: ${topic}`}
	`} 
	/>
</svelte:head>

{#if qnFound}
<div class="prose mx-auto">
	<header class="p-4 pb-8 sm:text-center bg-goldenrod dark:bg-zinc-800">
		<h1 class="font-serif text-zinc-900 dark:text-goldenrod" id="top">
			20{year} Additional Mathematics Paper {paper} Question {Number(qnNo)}
		</h1>
		{#if topic}
		<div class="font-serif text-3xl font-bold subtitle text-zinc-900 dark:text-goldenrod">
			{topic}
		</div>
		{:else}
		{#each topics as t}
		<div class="font-serif text-3xl mb-4 font-bold subtitle text-zinc-900 dark:text-goldenrod">
				{t}
		</div>
		{/each}
		{/if}
	</header>
	<main class="mx-4 dark:text-zinc-100">
		<Answer {answer} />
		<!--<Answer answer={solution} solutionMode />-->
	</main>
	<footer class="p-4 mt-2 bg-goldenrod dark:bg-zinc-800 dark:text-zinc-200">
		<div class="max-w-prose mx-auto text-lg" data-sveltekit-preload-data>
			<h2 class="mt-0 dark:text-goldenrod">
				More solutions
			</h2>
			<h3 class="dark:text-zinc-100">
				{topic ? topic : topics[0]}:
			</h3>
			<div class="grid grid-qns">
				{#each topicalList[topic] as q}
				{#if q.url===qn}
				<div class="text-red-700 dark:text-red-400 font-semibold">
					{q.text}
				</div>
				{:else}
				<a href="/amath/{q.url}" class="dark:text-zinc-400">
					{q.text}
				</a>
				{/if}
				{/each}
			</div>
		</div>
	</footer>
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
{:else}
<div class="prose mx-auto py-8">
	<h1 class="dark:text-goldenrod">
		Solution not found<br>🚧 20{year} P{paper} Q{Number(qnNo)} 🚧
	</h1>
	
<div class="alert shadow-lg">
  <div>
    🚧 We are working to add more solutions to our archives: stay tuned!
  </div>
</div>
<div class="flex gap-4">
	<a href="/topical">Topical selection</a>
	<a href="/yearly">Yearly selection</a>
</div>
<div>
	<a href="/">Go back to homepage</a>
</div>
</div>
{/if}

<style>
	header, footer {
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.grid-qns {
		grid-template-columns: repeat(auto-fit, minmax(9.5ch, 1fr));
	}
</style>