import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';
import {
	circleEqn,
	line,
	gradient,
	circlePropsFromStandard,
	distance,
} from '$lib/utils/coordinate';

// part i
const [[ax, ay], r2] = circlePropsFromStandard(-4, -2, -95);
const r = new SquareRoot(r2);

// part iii
const px = 10,
	py = 7;
const m1 = gradient(ax, ay, px, py, true);
const l1 = line(m1, px, py);

// part iv
const mx = ax.plus(px).divide(2);
const my = ay.plus(py).divide(2);
const radius = distance(mx, my, px, py);
const c2 = circleEqn(mx, my, radius);

// typeset
const body = `${math(`A\\left(${ax},${ay}\\right).`)}
	<br>Radius ${math(`=${r} \\textrm{ units}.`)}
`;
const partIII = `${math(`y=${l1}.`)}`;
const partIV = `${math(`${c2}.`)}`;
const partV = `${math(`y=${l1}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body },
		{ body: partIII, partNo: 3 },
		{ body: partIV, partNo: 4 },
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
