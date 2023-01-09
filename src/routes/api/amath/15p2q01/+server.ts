import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { ExpFn, Expression, Fraction, Polynomial } from 'mathlify';

const term1 = new ExpFn({ coeff: 2 }).integrate();
const term2 = new ExpFn({ fx: new Polynomial(-2) }).integrate();
const sign = term2.coeff.isGreaterThan(0) ? '+' : '';
// y = 2 exp(x) -1/2 exp(-2x) + c
// 2 = 2 - 1/2 + c
const c = new Fraction(2).minus(term1.coeff).minus(term2.coeff);
const fx = new Expression(`${term1}${sign}${term2}`, c);

// typeset
const body = `${math(`${fx}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
