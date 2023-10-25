import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { cramersFrac } from 'mathlify';

// part a
const [a, b] = cramersFrac(-3, 1, -Math.pow(-3, 3), 4, 1, 56 - Math.pow(4, 3));

// typeset
const body = `${math(`a=${a},`)} ${math(`b=${b}.`)}`;
const partB = `1 real root.`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Polynomials, Cubic Equations and Partial Fractions',
		}),
	);
}
