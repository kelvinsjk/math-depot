import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';
import { circleEqn, distance, gradient, line } from '$lib/utils/coordinate';

// partIII
const ax = 1,
	ay = 4;
//const bx = 9, by = 8;
const cx = 7,
	cy = 12;
const centerX = new Fraction(ax + cx, 2);
const centerY = new Fraction(ay + cy, 2);
const radius = distance(ax, ay, cx, cy).divide(2);
const eqnC = circleEqn(centerX, centerY, radius);

// part v
const m = gradient(centerX, centerY, cx, cy, true);
const tangent = line(m, cx, cy);

// typeset
const body = `${math(`${eqnC}.`, { wrap: true })}`;
const partV = `${math(`y = ${tangent}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 3 },
		{ body: partV, partNo: 5 },
	],
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
