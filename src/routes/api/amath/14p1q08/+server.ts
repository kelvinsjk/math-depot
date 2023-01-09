import { alignStar, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { CosFn, Polynomial, SinFn, Term, Expression } from 'mathlify';

const dy1 = new SinFn({ fx: new Polynomial(4) });
const dy2 = new CosFn({ fx: new Polynomial(2), coeff: -1 });
const sign = dy2.coeff.isGreaterThan(0) ? '+' : '';
const dTwo1 = dy1.differentiate();
const dTwo2 = dy2.differentiate();
const sign1 = dTwo2.coeff.isGreaterThan(0) ? '+' : '';
const y1 = dy1.integrate();
const y2 = dy2.integrate();
const sign2 = y2.coeff.isGreaterThan(0) ? '+' : '';
const c = y1.coeff.negative();
const sign3 = c.isGreaterThan(0) ? '+' : '';

const k = 4;
const coeff1 = dTwo1.coeff.plus(y1.coeff.times(k));
const coeff2 = dTwo2.coeff.plus(y2.coeff.times(k));
const c2 = c.times(k);
const rhs = new Expression(
	new Term(coeff1, `\\cos ${dy1.fx}`),
	new Term(coeff2, `\\sin ${dy2.fx}`),
	c2,
);

// typeset
const body = `${alignStar(`f'(x) &= ${dy1} ${sign} ${dy2} \\\\
	f''(x) &= ${dTwo1} ${sign1} ${dTwo2} \\\\
	f(x) &= ${y1} ${sign2} ${y2} + c
`)}
Since ${math(`f\\left(\\frac{\\pi}{2}\\right)=0,`)} ${math(`c = ${c}.`)}
${alignStar(`
	& f''(x) + 4 f(x) \\\\
	& = ${dTwo1} ${sign1} ${dTwo2} + 4 \\left( ${y1} ${sign2} ${y2} ${sign3} ${c}  \\right) \\\\
	& = ${rhs}.
`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Integration',
		}),
	);
}
