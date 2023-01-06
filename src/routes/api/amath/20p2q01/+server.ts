import {
	linebreak,
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { SquareRoot } from 'mathlify';

const R2 = Math.pow(7, 2) + Math.pow(4, 2);
const R = Math.sqrt(R2);
const alpha = Math.atan(4 / 7);
const basic = Math.acos(6 / R);
const theta = alpha + basic;

// part ii
// highest at 0 (alpha)
// lowest at pi/2 (alpha+pi/2)
const thetaLargest = alpha + Math.PI / 2;
const smallest = 80 - R2;

// typeset
const body = `${math(`\\theta = ${theta.toPrecision(3)}.`)}`;
const partII = `Largest value ${math(`=80`)} when ${math(
	`\\theta = ${thetaLargest.toPrecision(3)}.`,
)}
	${linebreak}Smallest value ${math(`=${smallest}`)} when ${math(
	`\\theta = ${alpha.toPrecision(3)}.`,
)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
