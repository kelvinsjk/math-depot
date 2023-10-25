import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';

// part a
// 5^-5 2^-1 3^2 3^1.5
const a = -1;
const b = new Fraction(7, 2);
const c = -5;

// part b
const final = parseFloat((1_000_000 * Math.pow(1.07, 6)).toPrecision(2));

// typeset
const body = `${math(`a=${a},`)}
	${math(`b=${b},`)} ${math(`c=${c}.`)}
`;
const partII = `${math(`\\$${final.toLocaleString()}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
