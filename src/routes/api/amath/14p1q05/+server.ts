import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part ii
const data = new Regression([0.15, 0.2, 0.3], [0.603, 0.299, 0.201]).linearize({
	yFn: 'reciprocal',
	xFn: 'reciprocal',
});
const [fInverse] = data.yOnX();
const vInverse = data.yOnXAt(1 / 0.25);
const v = 1 / vInverse;
const f = 1 / fInverse;

// typeset
const body = `${math(`v=0.263`)} is the incorrect reading.`;
const partII = `${math(`v \\approx ${v.toPrecision(3)}.`)}`;
const partIII = `${math(`f \\approx ${f.toPrecision(3)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Linear Law',
		}),
	);
}
