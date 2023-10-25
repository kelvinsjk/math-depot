import {
	math,
	//display
	linebreak,
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, SquareRoot } from 'mathlify';
//import { coeffAt, } from '$lib/utils/binomial';

// cos theta = c
// sin theta = sqrt(1-c^2)
// tan theta = sqrt(1-c^2)/c

// typeset
const body = `Least value ${math(`= -2,`)}
	${linebreak}Greatest value ${math(`=2.`)}
`;
const partII = `Least value ${math(`= -4,`)}
	${linebreak}Greatest value ${math(`=2.`)}
`;
const partIII = `${math(`180^{\\circ}.`)}`;
const partIV = `${math(`720^{\\circ}.`)}`;
const partVI = `3 solutions.`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body },
		{ body: partII },
		{ body: partIII },
		{ body: partIV },
		{ body: partVI, partNo: 6 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Functions and Equations',
		}),
	);
}
