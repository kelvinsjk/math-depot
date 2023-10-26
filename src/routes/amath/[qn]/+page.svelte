<script lang="ts">
	import type { AnswerObject } from '$lib/interfaces';
	import type { PageData } from './$types';
	export let data: PageData;
	import { topicalList } from '$lib/topics/amath/topics';
	import { maxQnNo } from '$lib/years/amath/years';

	let answer: AnswerObject;
	let solution: AnswerObject;
	let qn: string;
	let topic: string;
	let topics: string[];
	let qnFound: boolean;
	({ answer, solution, qn, topic, topics, qnFound } = data);
	$: ({ answer, solution, qn, topic, topics, qnFound } = data);
	import Answer from '$lib/components/Answer.svelte';
	let year: string,
		paper: string,
		qnNo: string,
		yearlyList1: number[],
		yearlyList2: number[],
		topicalQns: string | string[],
		title: string;
	//import {yearlyLists, contents} from '$lib/nav/contents';
	const qnNos = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
	];
	//import { topic as topicNo, year as yearNo } from '$lib/stores/topicAndYear';
	//const topicList = Object.keys(contents);
	$: {
		year = qn.slice(0, 2);
		paper = qn[3];
		qnNo = qn.slice(5);
		//	//yearlyList1 = yearlyLists[qn.slice(0,3)+'1'];
		//	//yearlyList2 = yearlyLists[qn.slice(0,3)+'2'];
		//	topicalQns = topic || topic==='' ? [contents[topic] ?? ['a']] : topics?.map(topic => contents[topic]);
		title = qnFound
			? `20${year} P${paper} Q${Number(qnNo)}${
					topics ? `: ${topics[0]}, ${topics[1]}` : `: ${topic}`
			  }`
			: 'Solution Not Found';
		//	if (qnFound){
		//		yearNo.set(Number(year));
		//		topicNo.set(topicList.indexOf(topic ? topic : topics[0]));
		//	}
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="description"
		content={`Answers and solutions for O Level Additional Mathematics
		20${year} Paper ${paper} Question 
		${Number(qnNo)}${topics ? `: ${topics[0]}, ${topics[1]}` : `: ${topic}`}
	`}
	/>
	<meta name="robots" content="index, follow" />
</svelte:head>

{#if qnFound}
	<div class="prose mx-auto">
		<header class="p-4 pb-8 sm:text-center bg-goldenrod dark:bg-zinc-800">
			<h1 class="font-serif text-zinc-900 dark:text-goldenrod" id="top">
				20{year} Additional Mathematics Paper {paper} Question {Number(qnNo)}
			</h1>
			{#if topic}
				<div
					class="font-serif text-3xl font-bold subtitle text-zinc-900 dark:text-goldenrod"
				>
					{topic}
				</div>
			{:else}
				{#each topics as t}
					<div
						class="font-serif text-3xl mb-4 font-bold subtitle text-zinc-900 dark:text-goldenrod"
					>
						{t}
					</div>
				{/each}
			{/if}
		</header>
		<main class="mx-4 dark:text-zinc-100">
			<Answer {answer} />
			{#if solution}
				<Answer answer={solution} solutionMode />
			{/if}
		</main>
		<footer class="p-4 mt-2 bg-goldenrod dark:bg-zinc-800 dark:text-zinc-200">
			<div class="max-w-prose mx-auto px-4" data-sveltekit-preload-data>
				<h2 class="mt-0 dark:text-goldenrod">More solutions</h2>
				{#each topics ?? [topic] as t}
					<h3 class="dark:text-zinc-100">
						{t}:
					</h3>
					<div class="grid grid-qns">
						{#if t in topicalList}
							{#each topicalList[t] as q}
								{#if q.url === qn}
									<div class="text-red-700 dark:text-red-400 font-semibold">
										{q.text}
									</div>
								{:else}
									<a href="/amath/{q.url}" class="dark:text-zinc-400">
										{q.text}
									</a>
								{/if}
							{/each}
						{/if}
					</div>
				{/each}
				<div class="flex gap-x-2 flex-wrap mt-4">
					<div>
						{`20${year}`} Paper 1:
					</div>
					{#each qnNos.slice(0, maxQnNo[year][0]) as qNo}
						{#if qNo === qnNo && Number(paper) === 1}
							<div class="text-red-700 dark:text-red-400 font-semibold">
								Q{Number(qNo)}
							</div>
						{:else}
							<a href="/amath/{`${year}p1q${qNo}`}" class="dark:text-zinc-400">
								Q{Number(qNo)}
							</a>
						{/if}
					{/each}
				</div>
				<div class="flex gap-x-2 flex-wrap mt-4">
					<div>
						{`20${year}`} Paper 2:
					</div>
					{#each qnNos.slice(0, maxQnNo[year][1]) as qNo}
						{#if qNo === qnNo && Number(paper) === 2}
							<div class="text-red-700 dark:text-red-400 font-semibold">
								Q{Number(qNo)}
							</div>
						{:else}
							<a href="/amath/{`${year}p2q${qNo}`}" class="dark:text-zinc-400">
								Q{Number(qNo)}
							</a>
						{/if}
					{/each}
				</div>
			</div>
		</footer>
	</div>
{:else}
	<div class="prose mx-auto py-8">
		<h1 class="dark:text-goldenrod">
			Solution not found<br />🚧 20{year} P{paper} Q{Number(qnNo)} 🚧
		</h1>

		<div class="alert shadow-lg">
			<div>🚧 We are working to add more solutions to our archives: stay tuned!</div>
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
	header,
	footer {
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.grid-qns {
		grid-template-columns: repeat(auto-fit, minmax(9.5ch, 1fr));
	}
</style>
