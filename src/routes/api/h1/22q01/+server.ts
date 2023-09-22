import type { AnswerObject } from '$lib/interfaces';
import { cramersFrac, Fraction } from '$lib/mathlify-v3';
import { math } from 'mathlifier';

const p1 = 12,
	q1 = 16,
	r1 = 9,
	c1 = new Fraction(129060, 100);
const p2 = 3,
	q2 = -4,
	r2 = 0,
	c2 = 0;
// 15 r = 46.5 + 10p + 10q
const p3 = -10,
	q3 = -10,
	r3 = 15,
	c3 = new Fraction(4650, 100);

const pqr = cramersFrac(p1, q1, r1, c1, p2, q2, r2, c2, p3, r3, q3, c3);
const r = pqr[2];

// typeset
const body = `${math(`\\$ ${r.toFixed(2)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Equations and Inequalities',
		}),
	);
}
