import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeQuadratic } from 'mathlify';

// part a
const y1 = new Polynomial([2, 1]).times(15);
const y2 = new Polynomial([-2, 19, 0]);
const quad = y1.minus(y2);
const aSolns = factorizeQuadratic(quad);
const [x1, x2] = aSolns[2];

// typeset
const aAns = `${math(`x \\leq ${x1}`)} or ${math(`x \\geq ${x2}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: aAns }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Quadratic Functions, Equations and Inequalities',
		}),
	);
}
