import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction } from 'mathlify';
import { coeffAt, generalTermPower } from '$lib/utils/binomial';

// part a
const poly = new Polynomial([1, 1], { ascending: true });
const expansion1 = poly.pow(9).concatenate(3);
const coeff1 = expansion1.replaceXWith(
	new Polynomial([0, 1, -1], { ascending: true, variable: 'z' }),
).coeffs[3];

// part b
const power = generalTermPower(1, -3, 10);
const [coeff2] = coeffAt(2, [2, 1], [new Fraction(1, 3), -3], 10);

// typeset
const partAI = `${math(`${expansion1}+\\ldots`, { wrap: true })}`;
const partAII = `${math(`${coeff1}.`)}`;
const partBI = `${math(`\\binom{10}{r}\\frac{2^{10-r}}{3^r} x^{${power}}.`)}`;
const partBII = `${math(`${power}.`)}`;
const partBIII = `${math(`${coeff2}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{
			parts: [{ body: partAI }, { body: partAII }],
		},
		{
			parts: [{ body: partBI }, { body: partBII }, { body: partBIII }],
		},
	],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Binomial Theorem',
		}),
	);
}
