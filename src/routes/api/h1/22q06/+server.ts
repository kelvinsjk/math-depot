import type { AnswerObject } from '$lib/interfaces';
import {
	Fraction,
	Polynomial,
	// Expression,
	Term,
	Laurent,
	solveQuadratic,
} from '$lib/mathlify-v3';
import { math } from 'mathlifier';

// part a
const costPerMachine = new Laurent(new Polynomial([new Fraction(3, 4), 350]), [300]);
const revenuePerMachine = new Laurent([500], [0]);
const P = revenuePerMachine.minus(costPerMachine);
const partA = math(`${P}.`);

// answer and solution
const answer: AnswerObject = {
	parts: [{ body: partA }, { body: partA }, { body: partA }, { body: partA }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Differentiation II: Stationary Values and Rates of Change',
		}),
	);
}
