import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Rational, solveQuadratic } from 'mathlify';
import { dydx as dydxString, dTwo as dTwoString } from '$lib/utils/calculus';

// part i
const num = new Polynomial([2, 0, 0]);
const den = new Polynomial([1, -1]);
const y = new Rational(num, den);
const dydx = y.differentiate();
const [x1, x2] = solveQuadratic(dydx.num);
const y1 = y.subIn(x1);
const y2 = y.subIn(x2);

// part ii
const dTwo = dydx.differentiate();
const dTwo1 = dTwo.subIn(x1);
const dTwo2 = dTwo.subIn(x2);
const max1 = dTwo1.valueOf() > 0 ? 'Minimum point' : 'Maximum point';
const max2 = dTwo2.valueOf() > 0 ? 'Minimum point' : 'Maximum point';

// typeset
const body = `${math(`${dydxString()} = \\frac{${dydx.num}}{(${den})^2},`)}
	${linebreak}${math(`\\left( ${x1}, ${y1} \\right),`)}
	${math(`\\left( ${x2}, ${y2} \\right).`)}
`;
const partII = `${math(`${dTwoString()} = \\frac{${dTwo.num}}{(${den})^3},`)}
	${linebreak}${max1} at ${math(`\\left( ${x1}, ${y1} \\right),`)}
	${linebreak}${max2} at ${math(`\\left( ${x2}, ${y2} \\right).`)}
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
			topic: 'Applications of Differentiation',
		}),
	);
}
