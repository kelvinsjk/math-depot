import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Expression, SquareRoot, Polynomial, solveQuadratic } from 'mathlify';

// part ii
const a = 12,
	b = 12,
	c = 22;
const R2 = Math.pow(a, 2) + Math.pow(b, 2);
const R = new SquareRoot(R2);
//const alpha = Math.atan(b/a);
const max = new Expression(c, R);

// part iv
// A = a2 sin theta + b2 sin 2 theta
// dAdt = a2 cos theta + 2 b2 cos 2 theta
// dAdt = a2 cos theta + 2 b2 ( 2 cos^2 theta - 1 )
const a2 = 60,
	b2 = 36;
const poly = new Polynomial([b2 * 4, a2, b2 * 2 * -1]);
const [cos1, cos2] = solveQuadratic(poly);
const cos = cos1.valueOf() < 0 || cos1.valueOf() > 1 ? cos2 : cos1;
const theta = Math.acos(cos.valueOf());

// typeset
const body = `${math(`R=${R},`)}
	${linebreak}Maximum perimeter ${math(`=(${max}) \\textrm{ cm}.`)}
`;
const partIV = `${math(`\\theta = ${theta.toPrecision(3)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIV, partNo: 4 },
	],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic:
				'Differentiation of Trigonometric, Exponential and Logarithmic Functions and their Applications',
		}),
	);
}
