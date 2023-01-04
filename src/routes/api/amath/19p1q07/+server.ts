import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction, solveLinear } from 'mathlify';
//import { coeffAt } from '$lib/utils/binomial';

// part i
const poly = new Polynomial([2, new Fraction(-1, 8)], { ascending: true });
const expansion = poly.pow(6).concatenate(2);

// part ii
const [a, b] = expansion.coeffs;
const expansion2 = expansion.times(new Polynomial([1, 0, 4])).concatenate(2);
const [B, C] = expansion2.coeffs.slice(1);
const poly2 = new Polynomial([a.plus(b), B.plus(C)]);
const k = solveLinear(poly2);

// typeset
const body = `
	${math(`${expansion}+\\ldots`)}
`;
const partII = `${math(`k=${k}.`)}`;

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
