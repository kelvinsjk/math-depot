import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, factorizeQuadratic } from 'mathlify';

// part a
const k = 6;
const curve = new Polynomial([2, -k, -4]);
const line = new Polynomial([-2, 12]);
const quad = curve.minus(line);
const xSolns = factorizeQuadratic(quad);
const [x1, x2] = xSolns[2];
const y1 = curve.subIn(x1);
const y2 = curve.subIn(x2);

// typeset
const aAns = `${math(`\\left( ${x1}, ${y1} \\right)`)} and
	${math(`\\left( ${x2}, ${y2} \\right).`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: aAns }],
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
