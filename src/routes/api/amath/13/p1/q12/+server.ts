import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { longDivide, Polynomial } from 'mathlify';

// part i
const den = new Polynomial([2, 3]);
const num = new Polynomial([2, 0]);
const { quotient: a, remainder: b } = longDivide(num, den);
const signI = b.coeffs[0].isGreaterThan(0) ? '+' : '-';
const bAbs = signI === '+' ? b : b.negative();

// part ii
const dydx = `\\ln (2x+3) + \\frac{2x}{2x+3}`;

// part iii
// int ln(2x+3) = x ln(2x+3) - int (a + b/(2x+3)) dx
const ax = new Polynomial(a.coeffs[0].negative()); // TODO: fix mathlify a.integrate().negative();
const bFrac = b.coeffs[0];
const poly = new Polynomial([1, bFrac.divide(-2)]);
const sign = ax.coeffs[1].isGreaterThan(0) ? '+' : '';

// typeset
const body = `${math(`${a} ${signI} \\frac{${bAbs}}{${den}}.`)}`;
const partII = `${math(`${dydx}.`)}`;
const partIII = `${math(`\\left(${poly}\\right)\\ln (2x+3) ${sign} ${ax} + c.`, {
	wrap: true,
})}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
