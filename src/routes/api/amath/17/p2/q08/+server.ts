import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, LnFn, Polynomial, solveQuadratic } from 'mathlify';

// part a
const yA = new LnFn({ fx: new Polynomial([3, -1]) });
const dydxA = yA.differentiate();
const dydt = new Fraction(6, 100);
const x = 7;
const dxdt = dydt.divide(dydxA.subIn(x));

// part b
const y = new Polynomial([2, 1]).pow(3).negative().plus(8);
const dydx = y.differentiate();
const [x1] = solveQuadratic(dydx);
const y1 = y.subIn(x1);

// typeset
const partA = `${math(`${dxdt} \\textrm{ units/s}.`)}`;
const body = `${math(`\\left( ${x1}, ${y1} \\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body: partA },
		{
			// part b
			parts: [
				{ body, partNo: 2 }, // b(ii)
			],
		},
	],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topics: [
				'Differentiation of Trigonometric, Exponential and Logarithmic Functions and their Applications',
				'Applications of Differentiation',
			],
		}),
	);
}
