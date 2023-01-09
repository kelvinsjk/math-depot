import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';
//import {
//	dydx as dydxString,
//	dTwo as dTwoString,
//} from '$lib/utils/calculus';

// part b
const y = new Polynomial([2, 1]).pow(3).negative().plus(8);
const dydx = y.differentiate();
const [x1] = solveQuadratic(dydx);
const y1 = y.subIn(x1);

// typeset
const body = `${math(`\\left( ${x1}, ${y1} \\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{
			partNo: 2, // b
			parts: [
				{ body, partNo: 2 }, // b(ii)
			],
		},
	],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
