import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// part i
// a = -16 exp(-1/2 t)
// v = 32 exp(-1/2 t) + c
// 28 = 32 + c
// c = -4
// 0 = 32 exp(-1/2 t) + c
const c = -4;
const t = Math.log(-c / 32) * -2;

// part ii
// s = -64 exp(-1/2 t) + ct + d
// 0 = -64 + d
const d = 64;
const distance = -64 * Math.exp(t / -2) + c * t + d;

// typeset
const body = `${math(`t = ${t.toPrecision(3)}.`)}`;
const partII = `${math(`${distance.toPrecision(3)} \\textrm{ m}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
