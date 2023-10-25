import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, solveQuadratic } from 'mathlify';

// cot theta = 3 tan theta
//const alpha = (Math.atan(1 / 3) / Math.PI) * 180;
const alpha = 30;
const theta1 = alpha;
const theta2 = 180 - alpha;

// typeset
const body = `${math(`\\theta = ${theta1}^\\circ`)}
	or ${math(`\\theta = ${theta2}^\\circ.`)}
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
