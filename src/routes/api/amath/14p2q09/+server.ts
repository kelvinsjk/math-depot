import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';

// part i
// 3(1 - 2 sin^2) + sin - 2
// -6 sin^2 + sin + 1
const sinX = solveQuadratic(new Polynomial([-6, 1, 1]))[0].valueOf();
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
const body = `${math(`A=30^\\circ, 150^\\circ, ${x1.toFixed(1)}^\\circ`)} or ${math(
	`${x2.toFixed(1)}^\\circ.`,
)}`;
const partIII = `${math(`A=3x`)} so we can find the ${math(`x\\textrm{-coordinates}`)}
	by taking the answers obtained in part (i) and dividing by 3.
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partIII, partNo: 3 }],
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
