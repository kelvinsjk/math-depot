import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part a
const poly = new Polynomial([1, 1, new Fraction(-3, 4)]);
const [u1, u2] = solveQuadratic(poly) as [Fraction, Fraction];
const u = u1.isGreaterThan(0) ? u1 : u2;

// part b
const y = new Fraction(1, 5);

// typeset
const body = `${math(`x=\\ln ${u}.`)}`;
const partB = `${math(`y=${y}.`)}`;
const partC = `${math(`\\mathrm{e}^{\\frac{x}{2}} = \\frac{2x+7}{3}.`, { wrap: true })}
	<br>	Equation of line: ${math(`y=2x+11.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }, { body: partC }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
