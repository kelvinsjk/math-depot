import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot, Expression } from 'mathlify';

// part c
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

// typeset
const body = `${math(`${h}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Surds',
		}),
	);
}
