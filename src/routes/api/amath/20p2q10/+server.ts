import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, Term, Expression, ExpFn } from 'mathlify';

// part i
const dTwo1 = new Polynomial([48, 0, 0]);
const dTwo2 = new ExpFn({ coeff: 2, fx: new Polynomial([2, -1]) });
// dydx
const dy1 = dTwo1.integrate();
const dy2 = dTwo2.integrate();
const x = new Fraction(1, 2),
	yVal = new Fraction(1, 4);
const c1 = dy1.subIn(x).negative().minus(dy2.coeff);
const fPrime = new Expression(
	...dy1.terms,
	new Term(dy2.coeff, `${dy2.removeCoeff()}`),
	c1,
);

// part ii
const y1 = dy1.integrate();
const y2 = dy2.integrate();
const y3 = new Polynomial(c1);
const c2 = yVal.minus(y1.subIn(x)).minus(y2.coeff).minus(y3.subIn(x));
const fx = new Expression(
	...y1.terms,
	new Term(y2.coeff, `${y2.removeCoeff()}`),
	...y3.terms,
	c2,
);

// typeset
const body = `${math(`${fPrime}.`)}`;
const partII = `${math(`${fx}.`, { wrap: true })}`;

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
