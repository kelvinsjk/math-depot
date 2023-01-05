import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';

// part a
// 5/4 log_2 x = -5/2
const pow = new Fraction(-5, 2).times(4).divide(5);
const x = Math.pow(2, pow.valueOf());

// part b
// lg z/y = lg z + y
// z = zy + y^2
// z - zy = y^2
const z = `z=\\frac{y^2}{1-y}`;

// -\\frac{5}{3} \\ln (20-T)/38
// typeset
const body = `${math(`x=${x}.`)}`;
const partI = `${math(`${z}.`)}`;
const partII = `${math(`z > 0.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { parts: [{ body: partI }, { body: partII }] }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
