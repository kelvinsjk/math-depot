import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveLinear } from 'mathlify';

const den1 = new Polynomial([2, -1]);
const den2 = new Polynomial([1, 0, 4]);
const root1 = solveLinear(den1);
const num = new Polynomial([7, -12, 17]);

// cover up rule
const A = num.subIn(root1).divide(den2.subIn(root1));

// from manual calculation
const r = new Polynomial([2, -5]);

// typeset
const body = `
	${math(`\\frac{${A}}{${den1}} + \\frac{${r}}{${den2}}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Polynomials, Cubic Equations and Partial Fractions',
		}),
	);
}
