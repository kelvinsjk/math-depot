import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveLinear, SquareRoot } from 'mathlify';
import { dydx } from '$lib/utils/calculus';

// part ii
const poly = new Polynomial([1, -16, 80], { variable: 't' });
let coeff = new SquareRoot(1, 125).divide(new SquareRoot(125, 2));
const coeffDen = coeff.coeff.den;
coeff = coeff.times(coeffDen);
const num = poly.differentiate().divide(coeffDen);

// part iii
const t = solveLinear(num);
const d = new SquareRoot(poly.subIn(t).times(125));

// typeset
const body = `${math(`${dydx('x', 't')} = \\frac{${coeff}(${num})}{\\sqrt{${poly}}}.`)}`;
const partIII = `${math(`${d} \\approx ${d.toPrecision(3)} \\textrm{ m}.`)}`;

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
			topic: 'Applications of Differentiation',
		}),
	);
}
