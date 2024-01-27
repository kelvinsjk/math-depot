import type { AnswerObject } from '$lib/interfaces';
import { ExpFn, Expression, LnFn, Polynomial, Term, Fraction } from '$lib/mathlify-v3';
import { math } from 'mathlifier';

// part a
const fx = new Polynomial([4, 0, -5], { ascending: true });
const lnFn = new LnFn({ coeff: 3, fx });
// part bi
const expFn = new ExpFn({ coeff: 4, fx: new Polynomial([2, -3], { ascending: true }) });
const fPrime = expFn.differentiate();
const x1 = 1;
const y1 = expFn.subIn(x1);
const m = fPrime.subIn(x1);
// y - y1 = m(x - x1) = mx - mx1
const tangent = new Expression(new Term('x').times(m), m.times(x1).negative(), y1);
// part bii
// k exp(fx) = m2
const m2 = new Fraction(-2);
const lnArg = m2.divide(fPrime.coeff);
// a + bx = ln lnArg
const [a, b] = expFn.fx.coeffs;
// ln lnArg - a
const x2 = new Expression(`\\ln ${lnArg}`, a.negative()).divide(b);

// typeset
const partA = `${math(`${lnFn.differentiate()}.`)}`;
const partBI = `${math(`y = ${tangent}.`, { wrap: true })}`;
const partBII = `${math(`x = ${x2}.`, { wrap: true })}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: partA }, { parts: [{ body: partBI }, { body: partBII }] }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Differentiation I: Tangents and Normals',
		}),
	);
}
