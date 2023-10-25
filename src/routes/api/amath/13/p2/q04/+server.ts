import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Term, Expression, SquareRoot } from 'mathlify';

// part i
// 5 sin theta - cos theta
const a = 5,
	b = -1;
const h = new Expression(new Term(a, '\\sin \\theta'), new Term(b, '\\cos \\theta'));

// part ii
const R2 = Math.pow(a, 2) + Math.pow(b, 2);
const R = new SquareRoot(R2);
const alpha = (Math.atan(Math.abs(b / a)) / Math.PI) * 180;

// part iii
const basic = (Math.asin(3 / R.valueOf()) / Math.PI) * 180;
const theta = alpha + basic;

// typeset
const body = `${math(`h = ${h}.`)}`;
const partII = `${math(`h=${R}\\sin(\\theta - ${alpha.toFixed(1)}^\\circ).`)}`;
const partIII = `${math(`\\theta = ${theta.toFixed(1)}^\\circ.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
