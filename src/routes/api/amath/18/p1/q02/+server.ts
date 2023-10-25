import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Expression, SquareRoot } from 'mathlify';

// - (tanA + tanB)/(1-tanAtanB)
const tanA = 1;
const tanB = new SquareRoot(3);
const num = new Expression(-tanA, tanB.negative());
const den = new Expression(1, tanB.negative());
const rationalized = den.times(den.conjugate()).terms[0].coeff;
const ans = num.times(den.conjugate()).times(rationalized.reciprocal());

// typeset
const body = `${math(`${ans}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
