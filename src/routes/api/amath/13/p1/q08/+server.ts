import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part i
const t0 = 20 - 38;
// part ii
const T = 20 - 38 * Math.exp(-0.6 * 2);

// -\\frac{5}{3} \\ln (20-T)/38
// typeset
const body = `${math(`${t0}^{\\circ}\\textrm{C}.`)}`;
const partII = `${math(`${T.toPrecision(3)}^{\\circ}\\textrm{C}.`)}`;
const partIII = `${math(`t = -\\frac{5}{3} \\ln \\frac{20-T}{38}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
