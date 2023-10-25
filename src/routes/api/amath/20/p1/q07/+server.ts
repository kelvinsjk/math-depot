import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';
//import { coeffAt, } from '$lib/utils/binomial';

// 3 cos A = sec A - 5 tan A
// 3 cos^2 A = 1 - 5 sin A
// 3 - 3 sin^2 A = 1 - 5 sin A
const eqn = new Polynomial([3, -5, 1 - 3]);
const [s1] = solveQuadratic(eqn);
const alpha = (Math.asin(Math.abs(s1.valueOf())) / Math.PI) * 180;
let theta1: number, theta2: number;
if (s1.valueOf() > 0) {
	theta1 = alpha;
	theta2 = 180 - alpha;
} else {
	theta1 = 180 + alpha;
	theta2 = 360 - alpha;
}

// typeset
const body = `${math(`\\theta = ${theta1.toFixed(1)}^\\circ`)}
	or ${math(`\\theta = ${theta2.toFixed(1)}^\\circ.`)}
`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
