import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression, cramersFrac } from 'mathlify';

// part a
// x+y = 1
// 2y-x = 3
const [x, y] = cramersFrac(1, 1, 1, -1, 2, 3);

// part b
const base = new Expression(2, new SquareRoot(7));
const rationalized = base.times(base.conjugate()).terms[0].coeff;
const vol = new Expression(-6, new SquareRoot(7, 3));
const h = vol.times(base.conjugate()).times(rationalized.reciprocal());

// typeset
const partA = `${math(`x=${x},`)} ${math(`y=${y}.`)}`;
const body = `${math(`${h}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: partA }, { body }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topics: ['Exponential and Logarithmic Functions', 'Surds'],
		}),
	);
}
