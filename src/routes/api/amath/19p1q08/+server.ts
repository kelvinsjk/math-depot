import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Rational, solveQuadratic } from 'mathlify';
import {
	dydx as dydxString,
	dTwo as dTwoString,
	quotientRule,
} from '$lib/utils/calculus';

// part i
const x = new Polynomial(1); // x
const num = new Polynomial([2, 5]);
const den = new Polynomial([1, -2]);
const dydx1 = x.differentiate();
const dydx2 = quotientRule(num, den);
const dydxSign = dydx2[0].subIn(0).isGreaterThan(0) ? '+' : '-';
const dydxAbs = dydxSign === '+' ? dydx2[0] : dydx2[0].times(-1);
const dydx = new Rational(dydx2[0], dydx2[1]).plus(dydx1);
const dTwo = dydx.differentiate();

// part ii
const [x1, x2] = solveQuadratic(dydx.num);

// part iii
const dTwo1 = dTwo.subIn(x1);
const dTwo2 = dTwo.subIn(x2);
const max1 = dTwo1.valueOf() > 0 ? 'Minimum point' : 'Maximum point';
const max2 = dTwo2.valueOf() > 0 ? 'Minimum point' : 'Maximum point';

// typeset
const body = `${math(
	`${dydxString()} = ${dydx1} ${dydxSign} \\frac{${dydxAbs}}{(${den})^2},`,
)}
	${linebreak}${math(`${dTwoString()} = \\frac{${dTwo.num}}{(${den})^3}.`)}
`;
const partII = `${math(`x=${x1},`)} ${math(`x=${x2}.`)}`;
const partIII = `${max1} at ${math(`x=${x1},`)}
	${linebreak}${max2} at ${math(`x=${x2}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
