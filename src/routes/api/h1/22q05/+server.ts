import type { AnswerObject } from '$lib/interfaces';
import {
	Fraction,
	Polynomial,
	// Expression,
	//Term,
	Laurent,
	solveQuadratic,
} from '$lib/mathlify-v3';
import { math } from 'mathlifier';

// part c
const P = new Laurent(new Polynomial([150, new Fraction(-3, 4)], { ascending: true }), [
	-300,
]);
const dPdx = P.differentiate();
const [x1, x2] = solveQuadratic(dPdx.toNumeratorPolynomial());
const x = x1.valueOf() > 0 ? x1 : x2;
const y = P.subIn(x);
// part d
const profit = 100;
const P2 = new Laurent(
	new Polynomial([150 - profit, new Fraction(-3, 4)], { ascending: true }),
	[-300],
);
const [x1d, x2d] = solveQuadratic(P2.toNumeratorPolynomial());
const xA = Math.ceil(x1d.valueOf());
const xB = Math.floor(x2d.valueOf());

// typeset
const partC = `${math(`(${x}, ${y}).`)}`;
const partD = `${math(`\\{ x \\in \\mathbb{Z}: ${xA} \\leq x \\leq ${xB} \\}.`, {
	wrap: true,
})}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body: partC, partNo: 3 },
		{ body: partD, partNo: 4 },
	],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Integration',
		}),
	);
}
