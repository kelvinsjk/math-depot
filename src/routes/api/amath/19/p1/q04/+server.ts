import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial } from 'mathlify';

// A = 6x^2
const x = 10;
const A = new Polynomial([6, 0, 0]);
const dAdx = A.differentiate().subIn(x);
const dAdt = -48;
// dAdt = dAdx * dxdt
const dxdt = new Fraction(dAdt).divide(dAdx);

// typeset
const body = `${math(`${dxdt} \\textrm{ cm/s.}`)}`;

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
