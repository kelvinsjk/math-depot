import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from '$lib/mathlify-v3';
import { math } from 'mathlifier';

// part a
// y + 10 x = 40
// y + a x = b
const a = 10,
	b = 40;

// part b
// rectangle = 12 xy = c xy
// triangle = 1/2 3x 4x = 1/2 t1 t2 x^2
const c = 12,
	t1 = 3,
	t2 = 4;
const area = 432;
const y = new Polynomial([-a, b]);
const areaPoly = y
	.times('x')
	.times(c)
	.minus(new Polynomial(1, { degree: 2 }).times(t1).times(t2));
const [x1, x2] = solveQuadratic(areaPoly, area);
const y1 = y.subIn(x1),
	y2 = y.subIn(x2);

// typeset
const partB = `${math(`x = ${x1},`)} ${math(`y=${y1}`)}
	or ${math(`x=${x2},`)} ${math(`y=${y2}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: partB, partNo: 2 }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Differentiation II: Stationary Values and Rates of Change',
		}),
	);
}
