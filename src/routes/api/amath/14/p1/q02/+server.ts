import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';

// (tan A + 3) / (1 - 3 tan A) = 8
// tan A + 3 = 8 - 24 tan A
const opp = 1,
	adj = 5;
const hyp = new SquareRoot(Math.pow(opp, 2) + Math.pow(adj, 2));
const sin = new SquareRoot(1, opp).divide(hyp);

// typeset
const body = `${math(`\\sin A = ${sin}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
