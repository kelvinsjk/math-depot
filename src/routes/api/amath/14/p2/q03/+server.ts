import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression } from 'mathlify';

// part a
const area = new Expression(13, new SquareRoot(48, -1));
const width = new Expression(3, new SquareRoot(3, -1));
const den = width.times(width.conjugate()).terms[0].coeff;
const length = area.times(width.conjugate()).times(den.reciprocal());

// part b
// const side = new Expression(new SquareRoot(3, 2), 'c');
// by inspection, (12+c^2) + 4c sqrt(3)
// area = 13 - 4 sqrt(3)
const c = -1;

// typeset
const body = `${math(`\\left(${length}\\right) \\textrm{ cm}.`)}
`;
const partB = `${math(`c=${c}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Surds',
		}),
	);
}
