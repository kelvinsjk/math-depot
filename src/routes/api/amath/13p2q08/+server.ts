import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression, Polynomial, solveQuadratic } from 'mathlify';

// part a
const root6 = new SquareRoot(6);
const root5 = new SquareRoot(5);
const root15 = new SquareRoot(15);
const root2 = new SquareRoot(2);
const negRoot2 = new SquareRoot(2, -1);
const num = new Expression(root6, root5);
const den = new Expression(root15, negRoot2);
const denConjugate = new Expression(root15, root2);
const rationalized = den.times(denConjugate).terms[0].coeff;
const h = num.times(denConjugate).times(rationalized.reciprocal());

// part b
const poly = new Polynomial([1, -4, -21]);
const [u1, u2] = solveQuadratic(poly);
const u = u1.valueOf() > 0 ? u1 : u2;
const x = Math.log(u.valueOf()) / Math.log(2);

// typeset
const body = `${math(`${h}.`)}`;
const partB = `${math(`(2^x)^2 - 4(2^x) - 21 = 0.`)}
	<br>${math(`x=${x.toFixed(2)}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partB }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topics: ['Surds', 'Exponential and Logarithmic Functions'],
		}),
	);
}
