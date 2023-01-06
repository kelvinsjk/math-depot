import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// 2 (tan x + 1) = 5 (tan x - 1)
// 3 tan x = 7
const alpha = Math.atan(7 / 3);
const x = alpha + Math.PI;

// typeset
const body = `${math(`x = ${alpha.toPrecision(3)}`)} or
	${math(`x = ${x.toPrecision(3)}.`)}
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
