import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction, factorizeCubic } from 'mathlify';

// part a
const poly = new Polynomial([2, -3, 0, -5]);
const negHalf = new Fraction(-1, 2);
const remainder = poly.subIn(negHalf);

// part b
const root1 = 1;
const poly2 = new Polynomial([2, -3, 0, 1]);
const [factors, otherRoots] = factorizeCubic(poly2, root1);
const factor2 = factors[1];

// part c
// eslint-disable-next-line
const root2 = otherRoots![0];
const num = new Polynomial([-8, -5, 4]);
const factor1 = new Polynomial([1, -root1]);
const A = num.subIn(root2).divide(factor1.subIn(root2).square());
const CFull = num.subIn(root1).divide(factor2.subIn(root1));
const CSign = CFull.isGreaterThan(0) ? '+' : '-';
const C = CFull.abs();
// manual calculation
const B = 5;

// typeset
const body = `Remainder ${math(`=${remainder}.`)}`;
const partB = `${math(`(${factor2})(${factor1})^2.`)}`;
const partC = `${math(
	`
	\\frac{${A}}{${factor2}} - \\frac{${B}}{${factor1}}
	${CSign} \\frac{${C}}{(${factor1})^2}.
`,
	{ wrap: true },
)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }, { body: partC }],
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
