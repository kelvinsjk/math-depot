import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveLinear, factorizeCubic, solveQuadraticSurd } from 'mathlify';

// part a
const lhs = new Polynomial([2, Math.pow(2, 3)]);
const rhs = new Polynomial([-1, Math.pow(-1, 3)]);
const a = solveLinear(lhs.minus(rhs));

// part b
const root1 = 3; // by manual calculation
const poly = new Polynomial([1, -2, -4, 3]);
const quadratic = factorizeCubic(poly, root1)[0][1];
const [surd1, surd2] = solveQuadraticSurd(quadratic);

// typeset
const body = `${math(`a=${a}.`)}`;
const partB = `${math(`x=${root1},`)}
	${math(`x=${surd1}`)} or ${math(`x=${surd2}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Polynomials, Cubic Equations and Partial Fractions',
		}),
	);
}
