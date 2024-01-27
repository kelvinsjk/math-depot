import type { AnswerObject } from '$lib/interfaces';
import {
	// Expression,
	Term,
} from '$lib/mathlify-v3';
import { math } from 'mathlifier';
import { Polynomial } from 'mathlify';

// part a
// const yC = new Expression(['x', 2], ['k', 2]);
// const yL = new Expression(new Term('k', 'x'), new Term(3, ['k', 2]));
// const eqn = yC.minus(yL);
// x^2 - kx - 2k^2
// (x-2k)(x+k)
const x1 = new Term(-1, 'k');
const x2 = new Term(2, 'k');
const y1 = x1.pow(2).plus(new Term(['k', 2]));
const y2 = x2.pow(2).plus(new Term(['k', 2]));

const line = new Polynomial([1, 3]);
const poly = new Polynomial([1, 0, 1]);
const diff = line.minus(poly);
const area = diff.definiteIntegral(-1, 2);

// typeset
const partA = `${math(`A ( ${x1}, ${y1}),`)}
	${math(`B ( ${x2}, ${y2} ).`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: partA }, { body: `${math(`${area}k^3`)}` }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Integration and Areas',
		}),
	);
}
