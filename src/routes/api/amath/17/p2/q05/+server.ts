import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveLinear } from 'mathlify';

// log_5 7(x-1) / (x+1) = 1
const poly = new Polynomial([7, -7]).minus(new Polynomial(5)).minus(5);
const x = solveLinear(poly);

// part b
// 2/ lg y = lg y
const y1 = Math.pow(10, -Math.SQRT2);
const y2 = Math.pow(10, Math.SQRT2);

// typeset
const body = `${math(`x=${x}.`)}`;
const partII = `${math(`y=${y1.toPrecision(2)}`)} or ${math(`y=${y2.toPrecision(2)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
