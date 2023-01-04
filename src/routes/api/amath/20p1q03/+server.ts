import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, longDivide, partialFractions } from 'mathlify';

// part c
const num = new Polynomial([4, -7, 9]);
const den = new Polynomial([2, -1, -3]);
const { quotient, remainder } = longDivide(num, den);
const [f1, f2] = partialFractions(den, { numerators: remainder });
// from observation
const f1Neg = f1.negative();

// typeset
const body = `
	${math(`${quotient} - ${f1Neg} + ${f2}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Polynomials, Cubic Equations and Partial Fractions',
		}),
	);
}
