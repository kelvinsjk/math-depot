import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

const num = new Polynomial([1, 2]).square();
const x = new Polynomial(1);
const x2 = x.square();
const den = new Polynomial([1, -2]);

// cover up rule
const A = num.subIn(2).divide(x2.subIn(2));
const CFull = num.subIn(0).divide(den.subIn(0));
const CSign = CFull.isGreaterThan(0) ? '+' : '-';
const C = CFull.abs();
// by manual calculation
const B = 3;

// typeset
const body = `
	${math(
		`
		\\frac{${A}}{${den}} - \\frac{${B}}{${x}} ${CSign} \\frac{${C}}{${x2}}.
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
