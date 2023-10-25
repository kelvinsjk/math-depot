import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, SquareRoot, Fraction, Expression, solveLinear } from 'mathlify';
import { line } from '$lib/utils/coordinate';

// part b
const num = new Polynomial([1, -1]);
const xA = solveLinear(num);
const m = 1;
const l = line(m, xA, 0);
const yB = new Fraction(3, 2);
const xB = solveLinear(l.minus(yB));

const triangle = xB.minus(xA).times(yB).divide(2);
const poly = new Polynomial([2, -1]);
const xC = 5;
const int1 = new SquareRoot(1, xC).times(8).divide(new SquareRoot(poly.subIn(xC)));
const int2 = new SquareRoot(1, xB).times(8).divide(new SquareRoot(poly.subIn(xB)));
const ans = new Expression(triangle, int1, int2.negative());

// typeset
const body = `${math(`${ans} \\textrm{ units}^2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ parts: [{ body, partNo: 2 }], partNo: 2 }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Integration',
		}),
	);
}
