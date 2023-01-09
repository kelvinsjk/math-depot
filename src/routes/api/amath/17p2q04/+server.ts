import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, NthRoot, solveLinear } from 'mathlify';
import { line } from '$lib/utils/coordinate';

// part ii
// y = 6/sqrt(x) + x
// dydx = -1/2 * 6/x^{3/2} + 1
const coeff1 = 6;
const coeff2 = 1;
const x1 = 1,
	x2 = 4,
	y1 = 7,
	y2 = 7;
const root1 = Math.sqrt(1),
	root2 = Math.sqrt(x2);
const negHalf = new Fraction(-1, 2);
const m1 = negHalf.times(coeff1).divide(Math.pow(root1, 3)).plus(coeff2);
const m2 = negHalf.times(coeff1).divide(Math.pow(root2, 3)).plus(coeff2);
const l1 = line(m1, x1, y1);
const l2 = line(m2, x2, y2);
const xP = solveLinear(l1.minus(l2));
const xM = new NthRoot(3, 9);
const sign = xP.valueOf() > xM.valueOf() ? '>' : '<';

// typeset
const body = `${math(`
	x_P = ${xP} ${sign} ${xM} = x_M.
`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
