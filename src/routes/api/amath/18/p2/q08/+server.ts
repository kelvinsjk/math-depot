import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// part a
const poly = new Polynomial([2, 5, 0, -18]);
const remainder = poly.subIn(-2);

// part d
const x = Math.log(3 / 2) / Math.log(2);

// typeset
const body = `Remainder ${math(`=${remainder}.`)}`;
const partD = `${math(`x=${x.toPrecision(3)}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partD, partNo: 4 }],
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
