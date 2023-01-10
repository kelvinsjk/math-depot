import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Term, Fraction, Expression, Angle, CosFn } from 'mathlify';

// part i
// 3 cos^2 x - sin^2 x
// cos^2 x = ( cos 2x + 1 ) / 2
// sin^2 x = ( 1 - cos 2x ) / 2
const c1 = 3,
	c2 = -1;
const a = new Fraction(c1).plus(c2).divide(2);
const b = new Fraction(c1).minus(c2).divide(2);

// part ii
const upper = new Angle(15);
const lower = new Angle(-15);
const int1 = upper.minus(lower).times(a);
const cosTerm = new CosFn({ fx: new Polynomial(2), coeff: b });
const int2 = cosTerm.integrate();
const int2a = int2.subIn(upper);
const int2b = int2.subIn(lower);
const ans = new Expression(int1, int2a, int2b.negative());
const indefinite = new Expression(
	new Term(a, 'x'),
	new Term(int2.coeff, `${int2.removeCoeff()}`),
);

// typeset
const body = `${math(`a = ${a},`)} ${math(`b=${b}.`)}`;
const partII = `${math(`${indefinite}+c,`)}
	${linebreak}${math(`${ans}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
