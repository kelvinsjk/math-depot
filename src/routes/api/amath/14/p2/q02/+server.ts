import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeCubic } from 'mathlify';

// part i
const cubic = new Polynomial([2, -3, -11, 6]);
const r = cubic.subIn(2);

// part ii
// eslint-disable-next-line
const [x2, x3] = factorizeCubic(cubic, -2)[1]!;

// typeset
const body = `Remainder ${math(`= ${r}.`)}`;
const partII = `${math(`x=-2,`)} ${math(`x=${x2}`)} or ${math(`x=${x3}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
