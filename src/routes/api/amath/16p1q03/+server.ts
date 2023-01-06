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
const body = `${math(`-\\frac{\\pi}{2} \\leq x \\leq \\frac{\\pi}{2}.`)}`;
const partII = `${math(`0 \\leq x \\leq \\pi.`)}`;
const partB = `${math(`a=-1,`)}
	${linebreak}${math(`b=6,`)}
	${linebreak}${math(`c=2.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ parts: [{ body }, { body: partII }] }, { body: partB }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Functions and Equations',
		}),
	);
}
