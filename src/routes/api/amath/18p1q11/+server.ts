import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, longDivide, Polynomial, Term, Expression } from 'mathlify';

// part i
const den = new Polynomial([2, -3]);
const num = new Polynomial([10, -9]);
const { quotient: a, remainder: b } = longDivide(num, den);

// part ii
const increasing = 'Increasing function';

// part iii
const increasing2 = `Decreasing function`;

// part iv
// f(x) = ax + b ln(2x - 3)/2 + c
const x = 2;
const fx = 8;
const ax = a.times(new Polynomial(1));
const c = new Fraction(fx).minus(ax.subIn(x));
const exp = new Expression(...ax.terms, new Term(b.divide(2).subIn(0), '\\ln (2x-3)'), c);

// typeset
const body = `${math(`f'(x) = ${a} + \\frac{${b}}{${den}}.`)}`;
const partII = `${increasing}.`;
const partIII = `${increasing2}.`;
const partIV = `${math(`${exp}.`, { wrap: true })}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }, { body: partIV }],
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
