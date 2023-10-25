import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// part ii
// a = - exp( -t/10 )
// v = 10 exp( -t/10 ) + c
// 8 = 10 + c
const c = 8 - 10;
// s = -100 exp( -t/10 ) + ct + d
// 0 = -100 + d
const d = 100;
const t = 10 * Math.log(5);
const distance = -100 * Math.exp(-t / 10) + c * t + d;

// typeset
const body = `${math(`${distance.toPrecision(3)} \\textrm{ m}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Kinematics',
		}),
	);
}
