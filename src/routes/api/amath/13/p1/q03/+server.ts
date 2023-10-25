import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// dydx = 3x^2 + 2px + q
const [x1, x2] = [3, 7];
const poly = new Polynomial([1, -x1]).times(new Polynomial([1, -x2])).times(3);
const [q, twoP] = poly.coeffs;
const p = twoP.divide(2);

// typeset
const body = `${math(`p = ${p},`)} ${math(`q = ${q}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Gradients, Derivatives and Differentiation Techniques',
		}),
	);
}
