import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, factorizeQuadratic } from 'mathlify';

// typeset
const aAns = `${math(`a < 0`)} and ${math(`ac > 9.`)}`;
const bAns = `${math(`a = -2`)} and ${math(`c=-5.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: aAns }, { body: bAns }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Quadratic Functions, Equations and Inequalities',
		}),
	);
}
