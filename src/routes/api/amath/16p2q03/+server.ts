import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';

// 2 cos x (1 - 4sin^2 x) = 15 sin x cos x
// cos x ( 8 sin^2 x + 15 sin x -2  )
const sinX = solveQuadratic(new Polynomial([8, 15, -2]))[1].valueOf();
const alpha = (Math.asin(Math.abs(sinX)) / Math.PI) * 180;
let x1: number, x2: number;
if (sinX > 0) {
	x1 = alpha;
	x2 = 180 - alpha;
} else {
	x1 = 180 + alpha;
	x2 = 360 - alpha;
}

// typeset
const body = `${math(`x=${x1.toFixed(1)}^\\circ, 90^\\circ, ${x2.toFixed(1)}^\\circ`)}
	or ${math(`270^\\circ.`)}
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
