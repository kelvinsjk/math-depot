import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';

// y = A exp(2x) + B exp(-x)
const ks = [2, -1];
const y = [1, 1];
const dydx = y.map((a, i) => a * ks[i]);
const lhsCoeff = 4;
const lhs = dydx.map((a, i) => a + y[i] * lhsCoeff);
const A = new Fraction(1, lhs[0]);
const B = new Fraction(-1, lhs[1]);

// typeset
const body = `${math(`A = ${A},`)} ${math(`B = ${B}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
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
