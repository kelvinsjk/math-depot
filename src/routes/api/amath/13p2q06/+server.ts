import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, SquareRoot } from 'mathlify';

// const p = 2, q = 4;
// p + q sin 3x = 0
// 3x = 180+30
// x = 70

// typeset
const body = `${math(`120^{\\circ}.`)}`;
const partII = `${math(`4.`)}`;
const partIII = `${math(`p=2,`)} ${math(`q=4.`)}`;
const partIV = `${math(`x=70^{\\circ}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }, { body: partIV }],
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
