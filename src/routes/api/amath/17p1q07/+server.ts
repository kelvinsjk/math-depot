import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression, Fraction } from 'mathlify';

// part a
const area = new Expression(9, new SquareRoot(3)).times(new Fraction(1, 4));
const AB = new Expression(new SquareRoot(3), 1);
const halfSin60 = new SquareRoot(3).divide(4);
const den = AB.times(halfSin60);
const rationalized = den.times(den.conjugate()).terms[0].coeff;
const AC = area.times(den.conjugate()).times(rationalized.reciprocal());

// part b
const BC2 = AB.square().plus(AC.square()).minus(AB.times(AC));

// typeset
const body = `${math(`AC=(${AC}) \\textrm{ cm.}`)}
`;
const partB = `${math(`BC^2 = (${BC2}) \\textrm{ cm}^2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
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
