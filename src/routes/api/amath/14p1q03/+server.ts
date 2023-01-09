import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, NthRoot } from 'mathlify';
import { Laurent } from '$lib/utils/calculus';

const y = new Laurent([2], [0, -1]);
const dydx = y.differentiate();
const dydt = new Fraction(3, 100);
const dxdt = new Fraction(12, 100);
// dydt = dydx * dxdt
const dydxFrac = dydt.divide(dxdt);
// dydx of the form a/x^3 = dydxFrac
const a = dydx.negCoeffs[2];
const x3 = a.divide(dydxFrac);
const x1 = new NthRoot(3, x3);
const y1 = y.subIn(x1.coeff);

// typeset
const body = `${math(`y = ${y1}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
