import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic, nCr, Fraction } from 'mathlify';
//import { coeffAt } from '$lib/utils/binomial';

// part i
// (1 - 4x + 4x^2)(1 - 6px + 6c2 p^2 x^2)
// x2 coeff is 16
const poly = new Polynomial([nCr(6, 2), 24, 4 - 16]);
const [p1, p2] = solveQuadratic(poly) as [Fraction, Fraction];

// part ii
const c1 = new Polynomial([1, p1.negative()], { ascending: true }).pow(6).coeffs[3];
const c2 = new Polynomial([1, p2.negative()], { ascending: true }).pow(6).coeffs[3];

// typeset
const body = `
	${math(`p=${p1}`)} or ${math(`p=${p2}.`)}
`;
const partII = `
	When ${math(`p=${p1},`)} coefficient of ${math(`x^3 = ${c1}.`)}
	<br>When ${math(`p=${p2},`)} coefficient of ${math(`x^3 = ${c2}.`)}
`;

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
