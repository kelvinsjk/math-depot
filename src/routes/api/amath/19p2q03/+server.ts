import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// part b
const den1 = new Polynomial([1, -1]);
const den2 = new Polynomial([1, 1]);
const den2Square = den2.square();

// cover up rule
const A = den2Square.subIn(1).reciprocal().times(4);
const CFull = den1.subIn(-1).reciprocal().times(4);
const signC = CFull.isGreaterThan(0) ? '+' : '-';
const C = CFull.abs();

// from manual calculation
const B = 1;

// typeset
const body = `
	${math(`\\frac{${A}}{${den1}} - \\frac{${B}}{${den2}} 
		${signC} \\frac{${C}}{(${den2})^2}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Polynomials, Cubic Equations and Partial Fractions',
		}),
	);
}
