import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction, Expression, SinFn, CosFn, Term, Angle } from 'mathlify';

// part ii
const sinX = new SinFn();
const k = new Fraction(-1, 2);
const cos2x = new CosFn({ coeff: k, fx: new Polynomial(2) });
const fx1 = sinX.differentiate();
const fx2 = cos2x.differentiate();
const coeff = fx2.coeff;
const fx2b = fx2.removeCoeff();
const fx = new Expression(`${fx1}`, new Term(coeff, `${fx2b}`));

// part iii
const x1 = new Angle(30);
const y1 = fx1.subIn(x1).plus(fx2.subIn(x1));
const diff1 = fx1.differentiate();
const diff2 = fx2.differentiate();
const m = diff1.subIn(x1).plus(diff2.subIn(x1)).coeff.negative().reciprocal();
// y - y1 = m (x - x1)
// y = mx - mx1 + y1
const ans = new Expression(
	new Term(m, 'x'),
	new Term(m.negative(), x1.coeff, '\\pi'),
	y1,
);

// typeset
const body = `${math(`f(x) = ${fx}.`)}`;
const partIII = `${math(`y=${ans}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Integration',
		}),
	);
}
