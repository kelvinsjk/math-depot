import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { solveLinear, Fraction, Polynomial } from 'mathlify';
import { line } from '$lib/utils/coordinate';

// part i
const mBC = new Fraction(-3, 2);
const lBC = new Polynomial([mBC, new Fraction(45, 2)]);
const mAB = mBC.reciprocal().negative();
const ax = -2,
	ay = 6;
const lAB = line(mAB, ax, ay);
const bx = solveLinear(lBC.minus(lAB));
const by = lAB.subIn(bx);

// part ii
const cy = 0;
const cx = 45 / 3;
const mx = new Fraction(ax + cx, 2);
const my = new Fraction(ay + cy, 2);
// M is mid point of BD
// (bx + dx) / 2 = mx
const dx = mx.times(2).minus(bx);
const dy = my.times(2).minus(by);

// typeset
const body = `${math(`B\\left(${bx},${by}\\right).`)}`;
const partII = `${math(`M\\left(${mx},${my}\\right),`)}
	${math(`D\\left(${dx},${dy}\\right),`)}
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
			topic: 'Coordinate Geometry',
		}),
	);
}
