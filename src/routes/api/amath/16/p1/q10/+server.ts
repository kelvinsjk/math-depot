import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, PowerFn } from 'mathlify';

const term1 = new PowerFn(-3);
const int1 = term1.integrate() as PowerFn;
const int = `-\\frac{\\ln x}{2x^2} - \\frac{1}{4x^2}`;

// part iii
const x1 = 1,
	y1 = new Fraction(3, 4);
const c = y1.minus(int1.subIn(x1).divide(2));
const cSign = c.isGreaterThan(0) ? '+' : '-';

// typeset
const body = `${math(`${int}+c.`)}`;
const partIII = `${math(`${int}${cSign}${c.abs()}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
	],
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
