import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';
//import { dydx as dydxString, dTwo as dTwoString } from '$lib/utils/calculus';

// part i
// 3x + 2 pi r = 20
const fencing = 20;
const num = new Polynomial([fencing, -3], { ascending: true });

// part ii
// A = sqrt(3)/4 x^2 + (20-3x)^2/4pi
const dydx1 = num.square().differentiate();
const xCoeff = Math.sqrt(3) * 2 * Math.PI + dydx1.coeffs[1].valueOf();
const constant = dydx1.coeffs[0].valueOf();
const x = -constant / xCoeff;

// part iii
const dTwo = dydx1.differentiate().subInNumber(x) + Math.sqrt(3) * 2 * Math.PI;
const max = dTwo.valueOf() > 0 ? 'Minimum value' : 'Maximum value';

// typeset
const body = `${math(`r = \\frac{${num}}{2\\pi}.`)}`;
const partIII = `${math(`x = ${x.toPrecision(3)}.`)}`;
const partIV = `${max}.
	${linebreak}The gardener might be disappointed as he might be hoping to maximize the
	total area of the two flower beds to plant more flowers. However the stationary value
	is a minimum.
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partIII, partNo: 3 }, { body: partIV, partNo: 4 }],
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
