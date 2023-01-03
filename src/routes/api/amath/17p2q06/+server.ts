import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeQuadratic } from 'mathlify';

// part a
const a = new Polynomial([9]);
const b = new Polynomial([2, 1]).minus(new Polynomial(1));
const c1 = new Polynomial([1]);
const discriminant = b.square().minus(a.times(c1).times(4));
const cSolns = factorizeQuadratic(discriminant);
const [m1, m2] = cSolns[2];
const m = m1.isGreaterThan(0) ? m1 : m2;

// part b
const yMinusC = new Polynomial([9, m.times(2).plus(1), 1]);
const c = yMinusC.subIn(-2).negative().plus(19);
const quad = yMinusC.minus(new Polynomial(m));
const xSolns = factorizeQuadratic(quad);
const [x] = xSolns[2];
const y = yMinusC.subIn(x).plus(c);

// typeset
const aAns = `${math(`m=${m}.`)}`;
const bAns = `${math(`\\left( ${x}, ${y} \\right).`)}`;
const cAns = `${math(`L`)} is parallel to the ${math(`y`)}-axis.`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: aAns }, { body: bAns }, { body: cAns }],
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
