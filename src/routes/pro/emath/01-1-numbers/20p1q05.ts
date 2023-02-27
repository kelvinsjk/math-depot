import type {
	AnswerObject,
	//QuestionVariables
} from '$lib/interfaces';
import { getRandomInt, sample } from 'mathlify';
import { math } from 'mathlifier';

// Write ( base^n1 )^n2 as a power of base
export function qn(variables?: { base?: number; n1?: number; n2?: number }): [
	AnswerObject,
	AnswerObject,
	// QuestionVariables
] {
	const { base, n1, n2 } = {
		...variablesGen(),
		...variables,
	};
	const x = Math.pow(base, n1);

	// question
	const body = `Write ${math(`${x}^${n2}`)} as a power of ${math(`${base}.`)}`;

	// answer
	const finalPower = n1 * n2;
	const ans = `${math(`${base}^{${finalPower}}.`)}`;

	const question: AnswerObject = {
		body,
	};
	const answer: AnswerObject = {
		body: ans,
	};

	return [
		question,
		answer,
		//qnVariables
	];
}

export function variablesGen(): { base: number; n1: number; n2: number } {
	const bases = [2, 3, 5];
	return {
		base: sample(bases),
		n1: getRandomInt(2, 3),
		n2: getRandomInt(3, 7),
	};
}
