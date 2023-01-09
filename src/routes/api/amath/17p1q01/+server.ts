import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial } from 'mathlify';

const dTwo = new Polynomial([8, -6], { ascending: true });
const dydx1 = dTwo.integrate();
const x1 = 2,
	y1 = 8;
const m = new Fraction(3);
const c1 = m.minus(dydx1.subIn(x1));
const dydx = dydx1.plus(c1);
let y = dydx.integrate();
const c2 = new Fraction(y1).minus(y.subIn(x1));
y = y.plus(c2);

// typeset
const body = `${math(`y = ${y}.`)}`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Integration',
		}),
	);
}
