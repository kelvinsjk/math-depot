import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';
import { gradient, line } from '$lib/utils/coordinate';

// part ii
const x1 = 5,
	y1 = 4;
const m = gradient(x1, y1, 1, 2);
const l = line(m, x1, y1);
const yInverse = l.subIn(new Fraction(1, 3));
const y = yInverse.reciprocal();

// typeset
const body = `${math(`y=${y}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Linear Law',
		}),
	);
}
