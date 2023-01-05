import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// log_2 x^2 / (x-4) = 3
const poly = new Polynomial([1, -8, -8 * -4]);

// typeset
const body = `${math(`${poly}=0.`)}`;
const partB = `${math(`y=x^{-2}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
