import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Angle, tan } from 'mathlify';

// part ii
// tan^2 + 1 = sec^2
// int sec^2 + 5 tan^2
// int 6 sec^2 - 5
// = 6 tan x - 5x
// = a sqrt{3} + b pi
const lower = new Angle(30);
const upper = new Angle(60);
const k1 = 1,
	k2 = 5;
const b = upper.minus(lower).coeff.times(-k2);

const a = tan(upper)
	.minus(tan(lower))
	.coeff.times(k1 + k2);

// typeset
const body = `${math(`a=${a},`)} ${math(`b=${b}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
