import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Expression, SquareRoot, Term } from 'mathlify';

// part i
const p = 160,
	q = 80,
	r = 160;
const L = new Expression(p, new Term(q, '\\sin \\theta'), new Term(r, `\\cos \\theta`));

// part ii
const R2 = Math.pow(q, 2) + Math.pow(r, 2);
const R = new SquareRoot(R2);
const alpha = Math.atan(r / q);

// part iii
const basic = Math.asin((310 - p) / R.valueOf());
const theta = Math.PI - basic - alpha;

// typeset
const body = `${math(`${L}.`, { wrap: true })}`;
const partII = `${math(`${p}+{${R}\\sin (\\theta + ${alpha.toPrecision(3)})}.`, {
	wrap: true,
})}`;
const partIII = `${math(`\\theta = ${theta.toPrecision(3)}.`)}`;

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
