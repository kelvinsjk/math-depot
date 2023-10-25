import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';

const fx = new Polynomial([-1, 1, 0, 0]);
const fPrime = fx.differentiate();
const [x1, x2] = solveQuadratic(fPrime);

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
