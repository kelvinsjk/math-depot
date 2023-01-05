import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Fraction, Polynomial, solveQuadratic } from 'mathlify';

// part a
const a = 2;
const b = 0;
const c = Math.pow(a, -2);

// typeset
const body = `${math(`a=${a},`)} ${math(`b=${b},`)} ${math(`c=${c}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }],
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
