import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, SquareRoot } from 'mathlify';
//import { coeffAt, } from '$lib/utils/binomial';

const [c2, c3] = new Polynomial([2, 1], { ascending: true }).pow(6).coeffs.slice(2);
const a2Coeff = new Polynomial([1, -1], { ascending: true }).pow(5).coeffs[3];
const a2 = c3.negative().plus(70).divide(a2Coeff);
const aSqrt = new SquareRoot(a2);
const a = aSqrt.coeff;

// part ii
const coeff = new Polynomial([a, -1], { ascending: true }).pow(5).coeffs[2].plus(c2);

// typeset
const body = `${math(`a=${a}.`)}`;
const partII = `${math(`${coeff}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
