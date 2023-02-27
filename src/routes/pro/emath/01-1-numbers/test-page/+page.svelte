<script lang="ts">
  import type {
	  AnswerObject,
	//QuestionVariables
} from '$lib/interfaces';
  import { qn as qn1, } from '../20p1q05';
  import { qn as qn2, } from '../18p1q02';
  import { qn as qn3, } from '../17p1q01';
  import { qn as qn4, } from '../14p1q06';
  import { qn as qn5, } from '../13p1q17';

	import Answer from '$lib/components/Answer.svelte';

  const title = "Unit 1.1: Numbers and their Operations"

  let questions: {
		'id': string,
		qnLogic: (x:any)=> [AnswerObject, AnswerObject],
		args: any,
		text: string
	}[] = [
		{
			id: 'N20/I/5(a)', 
			qnLogic: qn1, 
			args: {}, 
			text: '2020 Paper 1 Question 5a' 
		},
		{
			id: 'N18/I/2', 
			qnLogic: qn2, 
			args: {}, 
			text: '2018 Paper 1 Question 2' 
		},
		{
			id: 'N17/I/1', 
			qnLogic: qn3, 
			args: {}, 
			text: '2017 Paper 1 Question 1' 
		},
		{
			id: 'N14/I/6', 
			qnLogic: qn4, 
			args: {n1:1, n2:3, base:4, isTimes: true}, 
			text: '2014 Paper 1 Question 6' 
		},
		{
			id: 'N13/I/17', 
			qnLogic: qn5, 
			args: {}, 
			text: '2013 Paper 1 Question 17' 
		},
  ];
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="prose mx-auto">
  <header class="p-4 pb-8 sm:text-center bg-goldenrod dark:bg-zinc-800">
		<h1 class="font-serif text-zinc-900 dark:text-goldenrod" id="top">
			Elementary Mathematics
		</h1>
		<div class="font-serif text-3xl font-bold subtitle text-zinc-900 dark:text-goldenrod">
			{title}
		</div>
	</header>
	<div class="flex flex-wrap gap-2 my-4">
		{#each questions as qn}
		<a href="{`#${qn.id}`}">{qn.id}</a>
		{/each}
	</div>
	<main class="mx-4 dark:text-zinc-100">
		{#each questions as qn}
		<h1 id="{qn.id}" class="mt-8 negative-bottom">{qn.text}</h1>
		{@const [question, answer] = qn.qnLogic(qn.args)}
		<Answer answer={question} questionMode />
		<!--Attempt-->
		<Answer {answer} />
		{/each}
	</main>
	<!--Prev and next navigation-->
</div>


<style>
	header {
		width: 100vw;
		margin-left: 50%;
		transform: translateX(-50%);
	}
  .negative-bottom {
		margin-bottom: -2rem;
	}
</style>