import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { factorizeCubic, Polynomial, solveLinear } from 'mathlify';

// part i
const fx = new Polynomial([1, -3, 4, -12]);
const [polys] = factorizeCubic(fx, 3);

// part iii
const dydx = fx.differentiate();
const dTwo = dydx.differentiate();
const x = solveLinear(dTwo);
const k = solveLinear(new Polynomial([x, dydx.subIn(x)]));

// typeset
const body = `${math(`(${polys[0]})(${polys[1]}).`)}`;
const partII = `${math(`x = 3.`)}`;
const partIII = `${math(`k= ${k}.`)}`;

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
