import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction, Expression, longDivide, Term } from 'mathlify';

// part ii
const num = new Polynomial([2, 1]);
const den = new Polynomial([1, -1]);
const { quotient: aPoly, remainder: bPoly } = longDivide(num, den);
const bFrac = bPoly.coeffs[0];
const bSign = bFrac.isGreaterThan(0) ? '+' : '-';
// y = a + b/(x-1)
// y = ax + b ln (x-1)
const xP = 2,
	yP = 5,
	xQ = 4,
	yQ = 3;
const trapezium = new Fraction(xQ - xP).times(yP + yQ).divide(2);
const axInt = aPoly.definiteIntegral(xP, xQ);
const logTerm = den.subIn(xQ).divide(den.subIn(xP));
const ans = new Expression(
	trapezium,
	axInt.negative(),
	new Term(bFrac.negative(), `\\ln ${logTerm}`),
);
const ansVal =
	trapezium.minus(axInt).valueOf() - bFrac.valueOf() * Math.log(logTerm.valueOf());

// typeset
const body = `${math(`${aPoly} ${bSign} \\frac{${bFrac.abs()}}{${den}},`)}
	${linebreak}Area ${math(
	`{= ${ans}} \\approx ${ansVal.toPrecision(3)} \\textrm{ units}^2.`,
	{
		wrap: true,
	},
)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
