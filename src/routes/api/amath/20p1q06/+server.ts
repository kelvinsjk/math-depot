import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';
import { Laurent, quotientRule } from '$lib/utils/calculus';

// x^2 + 4/x^2
const y = new Laurent([1, 0, 0], [0, 4]);
const dydx = y.differentiate();
const eqn = dydx.multiplyDenom();
// eqn of the form ax^4 + b = 0;
const coeffs = eqn.coeffs;
const a = coeffs[4];
const b = coeffs[0];
const xSquare = new SquareRoot(b.negative().divide(a)).coeff;
const x1 = new SquareRoot(xSquare);
const x2 = x1.negative();
const y1 = y.subInSurd(x1);
const y2 = y.subInSurd(x2);
const dTwo = dydx.differentiate();
const dTwo1 = dTwo.subInSurd(x1);
const dTwo2 = dTwo.subInSurd(x2);

// typeset
const body = `${math(`${dTwo1}, ${dTwo2}.`)}`;

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