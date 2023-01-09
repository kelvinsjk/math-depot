import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// part ii
const xCoeff = -(4 - Math.sqrt(3)) * 2;
const x = -130 / xCoeff;

// typeset
const body = `${math(`x = ${x.toPrecision(3)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
