import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, solveLinear } from 'mathlify';

// part a
const k = Math.LN2 / 5730;
const percentage = 100 * Math.exp(-k * 8000);
const kAns = parseFloat(k.toPrecision(3));

// part b
const I1 = Math.pow(10, 2.4);
const I2 = I1 * 50;
const S = Math.log10(I2);

// typeset
const body = `${math(`k=${kAns}.`)}`;
const partAII = `${math(`${percentage.toPrecision(3)}\\%.`)}`;
const partB = `${math(`${S.toFixed(1)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ parts: [{ body }, { body: partAII }] }, { body: partB }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Exponential and Logarithmic Functions',
		}),
	);
}
