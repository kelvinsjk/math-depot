import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// y = exp(-x) x^2
const coeff = -1;
const y = new Polynomial([1, 0, 0]);
const dydx = y.times(coeff).plus(y.differentiate());
const dTwo = dydx.times(coeff).plus(dydx.differentiate());
const k = dTwo.plus(dydx.times(2)).plus(y);

// typeset
const body = `${math(`k = ${k}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic:
				'Differentiation of Trigonometric, Exponential and Logarithmic Functions and their Applications',
		}),
	);
}
