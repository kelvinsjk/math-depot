import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';
import { circlePropsFromStandard, gradient, line } from '$lib/utils/coordinate';

// part i
const [[x, y], r2] = circlePropsFromStandard(4, -6, -12);
const r = new SquareRoot(r2);

// part ii
const m = gradient(x, y, 1, 7, true);
const tangent = line(m, 1, 7);

// typeset
const body = `Radius ${math(`=${r} \\textrm{ units}.`)}
	<br>Centre ${math(`=(${x}, ${y}).`)}
`;
const partII = `${math(`y=${tangent}.`)}`;

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
