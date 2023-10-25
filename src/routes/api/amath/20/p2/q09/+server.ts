import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveQuadratic } from 'mathlify';
import { gradient, line } from '$lib/utils/coordinate';

// part ii
const xA = -5,
	yA = 0;
const xB = 7,
	yB = 5;
const xE = 5,
	yE = 6;
const [x1, x2] = solveQuadratic(new Polynomial([5, 6, -11])) as [Fraction, Fraction];
const xD = x1.isGreaterThan(0) ? x1 : x2;
const m = gradient(xE, yE, xB, yB);
const lBD = line(m, xB, yB);
const yD = lBD.subIn(xD);

// part iii
const xM = xD.plus(xB).divide(2);
const yM = yD.plus(yB).divide(2);
// x_A + x_C = 2 x_M
const xC = xM.times(2).minus(xA);
const yC = yM.times(2).minus(yA);

// typeset
const body = `${math(`D\\left(${xD},${yD}\\right).`)}`;
const partIII = `${math(`C\\left(${xC},${yC}\\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
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
