import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeQuadratic } from 'mathlify';

// part c
const a = 1;
const b = new Polynomial([2, 0]);
const c = 1;
const quadK = b.square().minus(4 * a * c);
const kSolns = factorizeQuadratic(quadK);
const [k1, k2] = kSolns[2];

// typeset
const body = `${math(`${k1} < k < ${k2}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Quadratic Functions, Equations and Inequalities',
		}),
	);
}
