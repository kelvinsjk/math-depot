import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression } from 'mathlify';

// part c
const root6 = new SquareRoot(6);
const root2 = new SquareRoot(2);
const base = new Expression(root6, root2);
const area = base.square();
const rationalized = area.times(area.conjugate()).terms[0].coeff;
const vol = new Expression(16, new SquareRoot(3, 4));
const h = vol.times(area.conjugate()).times(rationalized.reciprocal());

// typeset
const body = `${math(`${h}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Surds',
		}),
	);
}
