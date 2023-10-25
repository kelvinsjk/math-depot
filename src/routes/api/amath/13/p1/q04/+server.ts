import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// tan^3 A - 1 = 2
const A = Math.atan(Math.pow(3, 1 / 3));

// typeset
const body = `${math(
	`A = ${A.toPrecision(3)} \\textrm{ rad } (${((A / Math.PI) * 180).toFixed(1)}^\\circ).`,
)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
