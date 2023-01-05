import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part a
const poly = new Polynomial([new Fraction(1, 2), -4, 6], { variable: 'u' });
const [u1, u2] = solveQuadratic(poly);
const x1 = Math.log(u1.valueOf()) / Math.log(2);
const x2 = Math.log(u2.valueOf()) / Math.log(2);

// typeset
const body = `${math(`${poly}=0.`)}`;
const partB = `${math(`x=${x1}`)}
	or ${math(`x=${x2.toFixed(1)}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
