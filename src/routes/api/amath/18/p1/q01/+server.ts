import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear } from 'mathlify';

// 5^ 3x/2 = 5^ (1-x-2)
const poly = new Polynomial(new Fraction(3, 2)).minus(-1).plus('x');
const x = solveLinear(poly);
const ans = Math.pow(125, x.divide(2).valueOf());
const body = `${math(`${ans.toPrecision(3)}.`)}`;

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
