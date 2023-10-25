import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part b
const percentage = ((1 - Math.pow(0.79, 20)) * 100).toPrecision(2);

// typeset
const partB = `${math(`${percentage}\\%.`)}`;
const partC = `${math(`k=\\ln 0.79.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body: partB, partNo: 2 },
		{ body: partC, partNo: 3 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
