import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial } from 'mathlify';

// part ii
const a = new Polynomial([new Fraction(1, 10), -2]);
const v = a.integrate({ c: 30 });
const distance = v.definiteIntegral(0, 20);

// typeset
const body = `${math(`${distance} \\textrm{ m.}`)}`;

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
