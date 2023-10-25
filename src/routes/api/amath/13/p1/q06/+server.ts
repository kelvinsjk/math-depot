import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

const num = new Polynomial([7, 2]);
const den1 = new Polynomial([1, -2]);
const den2 = new Polynomial([1, 0, 4]);

// cover up rule
const A = num.subIn(2).divide(den2.subIn(2));
// by manual calculation
const second = new Polynomial([-2, 3]);

// typeset
const body = `
	${math(
		`
		\\frac{${A}}{${den1}} + \\frac{${second}}{${den2}}.
	`,
		{ wrap: true },
	)}
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
