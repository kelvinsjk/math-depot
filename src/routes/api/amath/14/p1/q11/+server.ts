import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';

// part i
// y = x ln x
// dydx = 1 + ln x
// 1 + ln x = 2
// x = e
// y = e
const x = '\\mathrm{e}';

// part ii
// m = -1/2
// y - e = -1/2 (x - e)
// y = 2x - 3
// -1/2 x + 1/2 e + e = 2x - 3
const xCoeff = new Fraction(-1, 2).minus(2);
// k x = -3/2 e - 3
// k x = -3/2 ( e + 2 )
const k = new Fraction(-3, 2).divide(xCoeff);

// typeset
const body = `${math(`(${x}, ${x}).`)}`;
const partII = `${math(`k=${k}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic:
				'Differentiation of Trigonometric, Exponential and Logarithmic Functions and their Applications',
		}),
	);
}
