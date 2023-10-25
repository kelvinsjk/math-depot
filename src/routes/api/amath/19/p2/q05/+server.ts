import { alignStar, linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { CosFn, Fraction, Polynomial, SinFn, Term, Expression, Angle } from 'mathlify';

const dTwo1 = new CosFn({ fx: new Polynomial(3), coeff: 3 });
const dTwo2 = new SinFn({ fx: new Polynomial(2), coeff: -4 });
const sign = dTwo2.coeff.isGreaterThan(0) ? '+' : '';
const dydx1 = dTwo1.integrate();
const dydx2 = dTwo2.integrate();
const sign1 = dydx2.coeff.isGreaterThan(0) ? '+' : '';
// dydx = dydx1 (sin 3x) + dydx2 (cos 2x)
const y1 = dydx1.integrate();
const y2 = dydx2.integrate();
const sign2 = y2.coeff.isGreaterThan(0) ? '+' : '';
// y = y1 (cos 3x) + y2 (sin 2x) + cx + d
// f(0) = 0
const d = y1.coeff.negative();
// f(pi/2) = 5/6
const f2 = new Fraction(5, 6);
const cPiOver2 = f2.minus(y1.coeff.negative());
const cPi = cPiOver2.times(2);
const c = `\\frac{${cPi.num}}{${new Term(cPi.den, '\\pi')}}`;
const sign3 = d.isGreaterThan(0) ? '+' : '-';
// sub in pi/3
const piOver3 = new Angle(60);
const term1 = y1.subIn(piOver3);
const term2 = y2.subIn(piOver3);
const term3 = cPi.divide(3);
const term4 = d;
const ans = new Expression(term1, term2, term3, term4);

// typeset
const body = `${alignStar(`f''(x) &= ${dTwo1} ${sign} ${dTwo2} \\\\
	f'(x) &= ${dydx1} ${sign1} ${dydx2} + c \\\\
	f(x) &= ${y1} ${sign2} ${y2} + cx + d
`)}
Since ${math(`f(0)=0,`)} ${math(`d = ${d}.`)}
${linebreak} Since ${math(`f\\left(\\frac{\\pi}{2}\\right)=${f2},`)} ${math(`c = ${c}.`)}
${alignStar(`
	f(x) &= ${y1} ${sign2} ${y2} + ${c}x ${sign3} ${d} \\\\
	f\\left(\\frac{\\pi}{3}\\right) &= -\\frac{1}{3} \\cos \\pi + \\sin \\frac{2\\pi}{3} + \\frac{\\pi}{3\\pi} + ${d} \\\\
	&= ${ans}.`)}
`;

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
