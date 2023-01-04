import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, solveLinear } from 'mathlify';
import { coeffAt } from '$lib/utils/binomial';

// part i
const [c11] = coeffAt(11, [1, 3], [1, -1], 9);
const [c7] = coeffAt(7, [1, 3], [1, -1], 9);
// by inspection, r1 = 4, r2 = 5
// so c11 p^5 = 2 c7 p^4
// p = 2*c7/c11
const p = c7.times(2).divide(c11);

// typeset
const body = `
	${math(`p=${p}.`)}
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
