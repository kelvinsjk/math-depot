import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial } from 'mathlify';

// part ii
const V = new Polynomial([3 * 625, 0, 0, new Fraction(-3, 25)], { ascending: true });
const dVdx = V.differentiate();
// dVdt = dVdx * dxdt
// dtdx = dVdx / dVdt
const coeff = dVdx.coeffs[2];
const sign = coeff.isGreaterThan(0) ? '' : '-';

// part iii
// t = dt/dx x + c
// 0 = - 9 pi / 25 k (25) + c
// c = 9 pi / k
// 72 pi = -9(13) pi / 25 k + 9 pi / k
const x = 25 - 12;
const c = coeff.times(25).negative();
const rhs = coeff.times(x).plus(c);
// 72 = rhs / k
const k = rhs.divide(72);

// typeset
const body = `${math(`${sign} \\frac{${coeff.abs().num} \\pi}{${coeff.den}k}.`)}`;
const partII = `${math(`k = ${k}.`)}`;

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
