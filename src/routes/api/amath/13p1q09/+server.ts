import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear, solveQuadratic } from 'mathlify';

// part i
const y = new Polynomial([2, 3, -5]);
const [x1, x2] = solveQuadratic(y.plus(3));

// part ii
const dydx = y.differentiate();
const dydt = new Fraction(20, 100);
const dxdt = new Fraction(4, 100);
// dydt = dydx * dxdt
const dydxFrac = dydt.divide(dxdt);
const x3 = solveLinear(dydx.minus(dydxFrac));
const y3 = y.subIn(x3);

// typeset
const body = `${math(`x < ${x1}`)} or ${math(`x > ${x2}.`)}`;
const partII = `${math(`P\\left(${x3},${y3}\\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
