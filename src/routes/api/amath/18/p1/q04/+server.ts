import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression } from 'mathlify';

// part a
//const root1 = new Expression(3, new SquareRoot(5, 2));
//const eqn = root1.square().plus(root1.times('a')).plus('b');
// by inspection: (12+2a) sqrt{5} + (29+3a+b);
const a = -12 / 2;
const b = -29 - 3 * a;

// part b
const area = new Expression(24, new SquareRoot(48));
const l = new Expression(6, new SquareRoot(12));
const den = l.times(l.conjugate()).terms[0].coeff;
const breadth = area.times(l.conjugate()).times(den.reciprocal());

// typeset
const body = `${math(`a=${a},`)}
	${math(`b=${b}.`)}
`;
const partB = `${math(`(${breadth}) \\textrm{ cm.}`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Surds',
		}),
	);
}
