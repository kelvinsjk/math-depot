import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial } from 'mathlify';
//import { dydx as dydxString, dTwo as dTwoString } from '$lib/utils/calculus';

// part i
const t = 9;
const V = new Polynomial([new Fraction(-1, 3), 12, 0, 0]);
const V9 = V.subIn(t);
const dVdt = 18;
const time = V9.divide(dVdt);

// part ii
const dVdx = V.differentiate();
// dvdt = dVdx * dxdt
const dxdt = new Fraction(dVdt).divide(dVdx.subIn(t));

// typeset
const body = `Time ${math(`= ${time} \\textrm{ s}.`)}`;
const partII = `${math(`${dxdt} \\textrm{ cm/s}.`)}`;

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
