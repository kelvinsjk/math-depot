import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveLinear } from 'mathlify';
//import { coeffAt } from '$lib/utils/binomial';

// part i
const poly = new Polynomial([6 * Math.pow(2, 5), 64 * -4 + 160]);
const a = solveLinear(poly);
const poly3 = new Polynomial([1, -4], { ascending: true });
const poly2 = new Polynomial([2, a], { ascending: true })
	.pow(6)
	.times(poly3)
	.concatenate(2);
const b = poly2.coeffs[2];

// typeset
const body = `
	${math(`a=${a},`)} ${math(`b=${b}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Binomial Theorem',
		}),
	);
}
