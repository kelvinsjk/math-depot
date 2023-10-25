import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part a
const k = (Math.LN2 / 3).toPrecision(3);

// typeset
const body = `${math(`k=${k}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
