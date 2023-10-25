import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeQuadratic } from 'mathlify';

// part a
const a1 = 2;
const y1 = new Polynomial([a1, 5, a1 - 5]).minus(9);
const xSolns = factorizeQuadratic(y1);
const [x1, x2] = xSolns[2];

// part c
const a3 = new Polynomial(1);
const b3 = 5 - 1;
const c3 = new Polynomial([1, -5]).minus(-2);
const quadC = a3
	.times(c3)
	.times(-4)
	.plus(b3 * b3);
const cSolns = factorizeQuadratic(quadC);
const [c1, c2] = cSolns[2];
const ans = c1.isEqualTo(4) ? c2 : c1;

// typeset
const aAns = `${math(`x < ${x1}`)} or ${math(`x > ${x2}.`)}`;
const cAns = `Other value of ${math(`a=${ans}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: aAns }, { body: cAns, partNo: 3 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Quadratic Functions, Equations and Inequalities',
		}),
	);
}
