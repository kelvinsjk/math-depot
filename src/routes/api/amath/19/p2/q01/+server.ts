import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// x^2 ln x
// dydx = 2x ln x + x

// part ii
// 2x ln x = dydx - x
// int 2x ln x = x^2 ln x - x^2 /2

// typeset
const body = `${math(`2x \\ln x + x.`)}`;
const partII = `${math(`\\frac{x^2 \\ln x}{2} - \\frac{x^2}{4} + c.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Integration',
		}),
	);
}
