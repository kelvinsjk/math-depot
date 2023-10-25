import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeQuadratic } from 'mathlify';

// part a
const k = 5;
const y = new Polynomial([2, k + 2, k]);
const y2 = y.minus(new Polynomial([19, -13]));
const xSolns = factorizeQuadratic(y2);
const [x] = xSolns[2];
const ySoln = y.subIn(x);

// part b
const a = new Polynomial([2]);
const b = new Polynomial([1, 2]);
const c = new Polynomial([1, 0]);
const quadC = b.square().minus(a.times(c).times(4));
const cSolns = factorizeQuadratic(quadC);
const [k1] = cSolns[2];

// typeset
const aAns = `${math(`\\left( ${x}, ${ySoln} \\right).`)}`;
const bAns = `${math(`k=${k1}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: aAns }, { body: bAns }],
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
