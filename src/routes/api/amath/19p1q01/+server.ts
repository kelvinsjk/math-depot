import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, SquareRoot } from 'mathlify';
//import { coeffAt, } from '$lib/utils/binomial';

// cos theta = c
// sin theta = sqrt(1-c^2)
// tan theta = sqrt(1-c^2)/c

// typeset
const body = `${math(`\\tan \\theta = \\frac{\\sqrt{1-c^2}}{c}.`)}`;
const partII = `${math(`\\cosec \\theta = \\frac{1}{\\sqrt{1-c^2}}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
