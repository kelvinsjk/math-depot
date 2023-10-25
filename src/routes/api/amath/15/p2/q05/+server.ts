import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression, Fraction } from 'mathlify';

// part a
const num = new SquareRoot(3, 11);
const den = new Expression(new SquareRoot(3, 2), 1);
const rationalized = den.times(den.conjugate()).terms[0].coeff;
const ansA = den.conjugate().times(num).times(rationalized.reciprocal());

// part b
const AB = new Expression(new SquareRoot(3), 1);
const BC2 = ansA.square().minus(AB.square());

// part c
// 2x^2 = BC2
const vol = BC2.times(new Fraction(1, 2)).times(AB);
const vol2 = vol.times(new Fraction(2, 7));

// typeset
const body = `${math(`(${ansA}).`)}
`;
const partB = `${math(`BC^2 = (${BC2}) \\textrm{ cm}^2.`)}`;
const partC = `${math(`${new Fraction(7, 2)}(${vol2}) \\textrm{ cm}^3.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }, { body: partC }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Surds',
		}),
	);
}
