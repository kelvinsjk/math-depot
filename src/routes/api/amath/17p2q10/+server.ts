import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';

// part ii
// 2 sin x + 1 = - (1 - 2sin^2 x)
// 2 sin^2 x - 2 sin x -2 = 0
const sinX = solveQuadratic(new Polynomial([2, -2, -2]))[0].valueOf();
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
const body = `For ${math(`y_1, \\textrm{amplitude}=2`)} and
	${math(`\\textrm{period} = 360^\\circ.`)}
	${linebreak}For ${math(`y_2, \\textrm{amplitude}=1`)} and
	${math(`\\textrm{period} = 180^\\circ.`)}
`;
const partII = `${math(`x=${x1.toFixed(1)}^\\circ`)} or ${math(
	`x=${x2.toFixed(1)}^\\circ.`,
)}`;
const partIV = `${math(`0^\\circ \\leq x < ${x1.toFixed(1)}^\\circ`)} or ${math(
	`${x2.toFixed(1)}^\\circ < x \\leq 360^\\circ`,
)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIV, partNo: 4 }],
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
