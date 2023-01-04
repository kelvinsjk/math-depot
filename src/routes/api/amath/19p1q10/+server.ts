import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression } from 'mathlify';

// part c
const base = new Expression(2, new SquareRoot(7));
const rationalized = base.times(base.conjugate()).terms[0].coeff;
const vol = new Expression(-6, new SquareRoot(7, 3));
const h = vol.times(base.conjugate()).times(rationalized.reciprocal());

// typeset
const body = `${math(`${h}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Surds',
		}),
	);
}
