import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, longDivide, solveLinear } from 'mathlify';

// part a
const num = new Polynomial([3, -1, 27, -9]);
const den = new Polynomial([3, -1]);
const { quotient } = longDivide(num, den);

// part b
const top = new Polynomial([-5, 11, 6]);
// cover up rule
const root = solveLinear(den);
const A = top.subIn(root).divide(quotient.subIn(root));
// by manual calculation
const second = new Polynomial([-2, 3]);

// typeset
const body = `
	${math(`\\frac{${num}}{${den}} = {${quotient}}.`, { wrap: true })}
`;
const partB = `${math(`
	\\frac{${A}}{${den}} + \\frac{${second}}{${quotient}}.
`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Polynomials, Cubic Equations and Partial Fractions',
		}),
	);
}
