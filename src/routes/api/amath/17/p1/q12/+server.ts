import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';
import { circlePropsFromStandard, distance } from '$lib/utils/coordinate';

// part i
const [[x, y], r2] = circlePropsFromStandard(8, -24, 96);
const k = x.times(4).plus(y.times(3));
const r = new SquareRoot(r2);

// part ii
const xS = k.divide(4);
const yS = 0;
const lengthCS = distance(x, y, xS, yS);
const lengthRS = lengthCS.coeff.minus(r.coeff);

// typeset
const body = `${math(`k=${k}.`)}`;
const partII = `${math(`RS = ${lengthRS} \\textrm{ units}.`)}`;

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
