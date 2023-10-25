import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Fraction, Polynomial, solveLinear } from 'mathlify';

// 3 lg x = 8 lg 3
const x = Math.pow(3, 8 / 3);
const body = `${math(`x=${x.toPrecision(3)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
