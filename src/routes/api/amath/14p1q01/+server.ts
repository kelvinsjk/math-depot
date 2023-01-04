import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, NthRoot } from 'mathlify';
//import { coeffAt, } from '$lib/utils/binomial';

const c3 = new Polynomial([3, 1], { ascending: true }).pow(6).coeffs[3];
const k3Coeff = new Polynomial([2, -1], { ascending: true }).pow(5).coeffs[3];
const k3 = c3.negative().plus(860).divide(k3Coeff);
const k = new NthRoot(3, k3.abs(), k3.sign());

// typeset
const body = `${math(`k=${k}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Binomial Theorem',
		}),
	);
}
