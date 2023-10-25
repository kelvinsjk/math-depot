import {
	//math,
	//display
	alignStar,
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { Polynomial, solveQuadratic } from 'mathlify';

// cot theta = 3 tan theta
//const alpha = (Math.atan(1 / 3) / Math.PI) * 180;
//const alpha = 30;
//const theta1 = alpha;
//const theta2 = 180 - alpha;

// typeset
const body = `${alignStar(`
	& \\textrm{LHS} \\\\
	& = (\\sec \\theta - \\tan \\theta)^2 \\\\
	& = \\left( \\frac{1}{\\cos \\theta} - \\frac{\\sin \\theta}{\\cos \\theta} \\right)^2 \\\\
	& = \\frac{(1-\\sin\\theta)^2}{\\cos^2 \\theta} \\\\
	& = \\frac{(1-\\sin\\theta)^2}{1 - \\sin^2 \\theta} \\\\
	& = \\frac{(1-\\sin\\theta)^2}{(1 + \\sin \\theta)(1 - \\sin \\theta)} \\\\
	& = \\frac{1-\\sin\\theta}{1 + \\sin \\theta} \\\\
	& = \\textrm{RHS}.
`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }],
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
