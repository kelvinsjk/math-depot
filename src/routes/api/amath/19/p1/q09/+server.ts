import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { solveLinear } from 'mathlify';
import { gradient, line } from '$lib/utils/coordinate';

// part ii
const bx = 0,
	by = 2 - 4;
const cx = 4,
	cy = by;

// part iii
const px = cx / 2,
	py = (cy + 2) / 2;
const mBD = gradient(bx, by, px, py);
const lBD = line(mBD, px, py);
// (x-bx)^2 + (y-by)^2 = 7^2
const height = 28 / 4;
const dy = height + by;
const poly = lBD.minus(dy);
const dx = solveLinear(poly);

// typeset
const body = `${math(`C (${cx}, ${cy}).`)}`;
const partIII = `${math(`D(${dx},${dy}).`)}`;

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
