import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear } from 'mathlify';
import { dydx as dydxString } from '$lib/utils/calculus';

// part i
const poly1 = new Polynomial([1, -2]);
const poly2 = new Polynomial([2, -5]);
const poly3 = poly1
	.differentiate()
	.times(poly2)
	.plus(poly1.times(poly2.differentiate()).times(3));

// part iii
const x1 = solveLinear(poly3);

// part iii
const x = 3;
const dydt = new Fraction(35, 100);
const dydx = poly3.times(poly2.square());
const dxdt = dydt.divide(dydx.subIn(x));

// typeset
const body = `${math(`${dydxString()} = (${poly3})(${poly2})^2.`)}`;
const partII = `${math(`x < ${x1}.`)}`;
const partIII = `${math(`${dxdt} \\textrm{ units/s}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
