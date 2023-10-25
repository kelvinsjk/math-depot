import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// part ii
const diff = `\\tan x + x \\sec^2 x`;

// part iii
// int x sec^2 x = x tan x -int tan x dx
const int = `x \\tan x + \\ln(\\cos x) + c`;

// typeset
const body = `${math(`${diff}.`)}`;
const partIII = `${math(`${int}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Integration',
		}),
	);
}
