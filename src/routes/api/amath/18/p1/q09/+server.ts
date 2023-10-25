import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { solveLinear } from 'mathlify';
import { gradient, line } from '$lib/utils/coordinate';

const cx = 0,
	cy = 10;
const ax = 5,
	ay = 0;
const mOB = gradient(cx, cy, ax, ay, true);
const lOB = line(mOB, 0, 0);

// part ii
const mAC = mOB.reciprocal().negative();
const lAC = line(mAC, ax, ay);
const eqn = lAC.minus(lOB);
const midX = solveLinear(eqn);
const midY = lAC.subIn(midX);
const bx = midX.times(2);
const by = midY.times(2);

// typeset
const body = `${math(`y=${lOB}.`)}`;
const partII = `${math(`B(${bx},${by}).`)}`;

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
