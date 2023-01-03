<script lang="ts">
	import type { AnswerObject } from '../interfaces';
	export let answer: AnswerObject;
	export let solutionMode = false;
	import { qnLabels } from './qnLabels';
	const answersName = solutionMode ? 'solutions' : 'answers';
</script>

<section class="flex flex-col gap-4" aria-labelledby="answers" class:leading-6={solutionMode}>
	<h2 id={answersName} class:mt-4={!solutionMode} class="dark:text-zinc-300">
		{solutionMode ? 'Full solutions' : 'Answers'}
	</h2>
	<div class="parts grid gap-y-4 answer-container">
		{#if answer['body'] !== undefined}
			<div class="pl-2 col-span-2">
				{@html answer.body}
			</div>
		{/if}
		<!--parts-->
		{#if answer['parts'] !== undefined}
			{#each answer.parts as part, i}
				{#if part['body'] !== undefined}
					{#if solutionMode}
					<div class="font-semibold text-right dark:text-zinc-300">
						({qnLabels[answer['partLabelType'] ?? 'alpha'][part['partNo'] ?? i + 1]})
					</div>
					{:else}
					<a class="font-semibold text-right dark:text-zinc-300" href={`#solutions-part-${part['partNo'] ?? i + 1}`}>
						({qnLabels[answer['partLabelType'] ?? 'alpha'][part['partNo'] ?? i + 1]})
					</a>
					{/if}
					<div class="pl-2" id={`${answersName}-part-${part['partNo'] ?? i + 1}`}>
						{@html part.body}
					</div>
				{/if}
				<!--subparts-->
				{#if part['parts'] !== undefined}
					{#each part.parts as subpart, j}
						{#if solutionMode}
						<div class="font-semibold text-right dark:text-zinc-300">
							({qnLabels[answer['partLabelType'] ?? 'alpha'][part['partNo'] ?? i + 1]}{qnLabels[part['partLabelType'] ?? 'roman'][subpart['partNo'] ?? j + 1]})
						</div>
						{:else}
						<a class="font-semibold text-right dark:text-zinc-300" href={`#solutions-subpart-${subpart['partNo'] ?? j + 1}`}>
							({qnLabels[answer['partLabelType'] ?? 'alpha'][part['partNo'] ?? i + 1]}{qnLabels[part['partLabelType'] ?? 'roman'][subpart['partNo'] ?? j + 1]})
						</a>
						{/if}
						<div class="pl-2" id={`${answersName}-subpart-${subpart['partNo'] ?? j + 1}`}>
							{@html subpart.body}
						</div>
					{/each}
				{/if}
			{/each}
		{/if}
	</div>
	<slot />
	{#if solutionMode}
	<div>
		<a href="#top" class="dark:text-zinc-100">Back to top &#9650;</a>
	</div>
	{/if}
</section>

<style>
	.parts {
		grid-template-columns: 4ch calc(100% - 4ch);
	}
	section {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
	}
</style>
