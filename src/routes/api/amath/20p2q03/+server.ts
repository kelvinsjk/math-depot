import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, longDivide, solveLinear } from 'mathlify';
import { coeffAt } from '$lib/utils/binomial';

// part b
let [coeff] = coeffAt(-1, [3, -2], [1, 1], 8);
coeff = coeff.times(-2);

// typeset
const body = `
	${math(`${coeff}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Binomial Theorem',
		}),
	);
}
