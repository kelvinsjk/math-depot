import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, SquareRoot, Fraction, Expression } from 'mathlify';

// part iii
const k = 1,
	xP = k,
	yP = new SquareRoot(7 - 3 * k, 2);
const xT = new Fraction(11, 3);
const triangle = yP.times(xT.minus(xP)).divide(2);

// y = 2 sqrt{7-3x}
const a = 7,
	b = -3;
const poly = new Polynomial([b, a]);
const n = new Fraction(1, 2);
const intCoeff = new Fraction(2).divide(n.plus(1)).divide(b);
const x = new Fraction(a, -b);
const int1 = new SquareRoot(poly.subIn(x)).pow(3);
const int2 = new SquareRoot(poly.subIn(k)).pow(3);
const areaCurve = int1.minus(int2).times(intCoeff);
const ans = new Expression(triangle, areaCurve.negative());

// typeset
const body = `${math(`${ans} \\textrm{ units}^2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 3 }],
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
