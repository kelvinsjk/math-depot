import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part b
const k = Math.log(45 / 60) * -1;

// part c
const T = 20 + 60 * Math.exp(-k * 4);
const safe = T < 40 ? `Safe.` : `Not safe.`;

// typeset
const body = `${math(`k=${k.toPrecision(3)}.`)}`;
const partIII = safe;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
