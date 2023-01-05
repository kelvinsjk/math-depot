import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { solveLinear } from 'mathlify';
import { area, gradient, line } from '$lib/utils/coordinate';

// part i
const gradientAB = `\\frac{p-1}{2}`;
const gradientCB = `3-p`;

// part ii
const p = 5;
const ax = -2,
	ay = 1;
const bx = 0,
	by = p;
const cx = 1,
	cy = 3;
const mCD = gradient(ax, ay, bx, by); // parallel to AB
const mAD = mCD.reciprocal().negative(); // perpendicular to AB
const lAD = line(mAD, ax, ay);
const lCD = line(mCD, cx, cy);
const eqn = lAD.minus(lCD);
const dx = solveLinear(eqn);
const dy = lAD.subIn(dx);

// part iii
const A = area([
	[ax, ay],
	[bx, by],
	[cx, cy],
	[dx, dy],
]);

// typeset
const body = `Gradient of ${math(`AB = ${gradientAB}.`)}
	<br>Gradient of ${math(`CB = ${gradientCB}.`)}
`;
const partII = `${math(`D\\left(${dx}, ${dy}\\right).`)}`;
const partIII = `${math(`${A} \\textrm{ units}^2.`)}`;

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
