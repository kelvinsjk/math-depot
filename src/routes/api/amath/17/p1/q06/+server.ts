import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear } from 'mathlify';
//import { dydx as dydxString, dTwo as dTwoString } from '$lib/utils/calculus';

// part i
const total = 288;
// 4y + 6x = 288

// part ii
const A = new Polynomial([new Fraction(-9, 2), 216, 0]);
const x = solveLinear(A.differentiate());
const y = new Fraction(total).minus(x.times(6)).divide(4);

// typeset
const body = `${math(`${y} \\textrm{ m}`)} by ${math(`${x} \\textrm{ m}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
