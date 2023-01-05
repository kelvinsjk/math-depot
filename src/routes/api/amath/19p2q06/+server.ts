import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear } from 'mathlify';
import { circleEqn, distance, gradient, line } from '$lib/utils/coordinate';

// part i
// perpendicular bisector
const xP = 5,
	yP = 5;
const m = gradient(xP, yP, 0, 0, true);
const normal = line(m, xP, yP);
const normal2 = new Polynomial([new Fraction(1, 3), new Fraction(2, 3)]);
const xC = solveLinear(normal.minus(normal2));
const yC = normal.subIn(xC);
const r = distance(xC, yC, xP, yP);
const eqn = circleEqn(xC, yC, r);

// typeset
const body = `${math(`${eqn}.`)}`;
const partII = `${math(`\\left(${xC},${yC}-${r}\\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
