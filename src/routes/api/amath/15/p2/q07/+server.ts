import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveQuadratic } from 'mathlify';
import { circleEqn, gradient, line } from '$lib/utils/coordinate';

// part ii
// (k, k), radius k
// (k-9)^2 + (k-8)^2 = k^2
const xP = 9,
	yP = 8;
const poly = new Polynomial([1, -xP])
	.square()
	.plus(new Polynomial([1, -yP]).square())
	.minus(new Polynomial([1, 0, 0]));
const [k1, k2] = solveQuadratic(poly) as [Fraction, Fraction];
const k = k1.isLessThan(xP) ? k1 : k2;
const eqn = circleEqn(k, k, k);

// part iii
const m = gradient(k, k, xP, yP, true);
const T = line(m, xP, yP);

// typeset
const body = `The ${math(`x\\textrm{-coordinate}`)} is the same as the ${math(
	`y\\textrm{-coordinate}.`,
)}`;
const partII = `${math(`${eqn}.`)}`;
const partIII = `${math(`y=${T}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Coordinate Geometry',
		}),
	);
}
