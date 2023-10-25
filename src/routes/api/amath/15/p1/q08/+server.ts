import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// const fx = new Polynomial([2, -5, 2]);
const alpha = 30;
const x1 = alpha / 2;
const x2 = (180 - alpha) / 2;
const x3 = (360 + alpha) / 2;
const x4 = (360 + 180 - alpha) / 2;

// typeset
const body = `${math(`x=${x1}^\\circ, ${x2}^\\circ, ${x3}^\\circ`)}
	or ${math(`${x4}^\\circ.`)}
`;

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
