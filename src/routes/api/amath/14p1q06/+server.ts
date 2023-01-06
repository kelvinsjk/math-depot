import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `${math(`\\theta = \\frac{\\pi}{3}.`)}`;

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
