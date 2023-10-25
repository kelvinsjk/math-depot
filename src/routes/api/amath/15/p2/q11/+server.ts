import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part i
const data = new Regression(
	[5, 10, 15, 20],
	[175 / 5, 650 / 10, 1725 / 15, 3700 / 20],
).linearize({
	xFn: 'square',
});
const [q, p] = data.yOnX();

// part ii
// px^2 + q = x^2
const x2 = q / (1 - p);
const x = Math.sqrt(x2);

// typeset
const body = `${math(`p \\approx ${p.toPrecision(3)},`)} ${math(
	`q \\approx ${q.toPrecision(3)}.`,
)}`;
const partII = `${math(`x = ${x.toPrecision(3)}.`)}`;
const partIII = `By drawing a straight line with gradient 1 and passing through the origin.`;

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
