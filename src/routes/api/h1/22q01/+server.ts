import type { AnswerObject } from '$lib/interfaces';
import { math } from 'mathlifier';
import { SLE, Fraction } from 'mathlify';

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

//const pqr = cramersFrac(p1, q1, r1, c1, p2, q2, r2, c2, p3, r3, q3, c3);
//const r = pqr[2];

const sle = new SLE(
	[
		[p1, q1, r1],
		[p2, q2, r2],
		[p3, q3, r3],
	],
	[c1, c2, c3],
);
sle.solve({ returnFraction: true });

// typeset
const body = `${math(`${sle.solve({ returnFraction: true })[2].valueOf()}.`)}`;

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
