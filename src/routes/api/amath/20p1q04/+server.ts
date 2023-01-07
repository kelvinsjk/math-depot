import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';
import { quotientRule } from '$lib/utils/calculus';

const num = new Polynomial([2, -3]);
const den = new Polynomial([1, 0, 4]);
const [dydxNum] = quotientRule(num, den);
const [x1, x2] = solveQuadratic(dydxNum);

// typeset
const body = `${math(`${x1} \\leq x \\leq ${x2}.`)}`;

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
