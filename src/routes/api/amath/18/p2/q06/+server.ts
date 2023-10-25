import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Expression, Term } from 'mathlify';

// part i
const y = new Term(`x \\cos x`);
const dydx = `\\cos x - x \\sin x`;

// part ii
// int x sin x dx = sin x - y
const int = new Expression(`\\sin x`, y.negative());

// part iii
const y2 = new Term(`x^2 \\sin x`);
// const dydx2 = `2x \\sin x + x^2 \\cos x`;
const int2 = new Expression(y2).minus(int.times(2));

// typeset
const body = `${math(`${dydx}.`)}`;
const partII = `${math(`${int}+c_1.`)}`;
const partIII = `${math(`${int2}+c_2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
