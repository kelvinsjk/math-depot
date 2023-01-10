import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction, solveLinear, PowerFn } from 'mathlify';

// part i
const fx = new Polynomial([2, 1]);
const y = new PowerFn(-2, { fx, coeff: 36 });
const dxdt = new Fraction(2, 100);
const dydt = new Fraction(-36, 100);
// dydt = dydx * dxdt
const dydx = dydt.divide(dxdt);
// coeff ( fx )^n
const { power } = y.differentiate();
const radicand = dydx.divide(power.coeff).valueOf();
const fxVal = Math.pow(radicand, -1 / 3);
const x = solveLinear(fx.minus(fxVal));

// part ii
const x1 = 1,
	x2 = 4;
// coeff / (2x)
const int = y.integrate() as PowerFn;
// int(4) - int(a) = int(a) - int(1)
const intA = int.subIn(x2).plus(int.subIn(x1)).divide(2);
// coeff / fx = intA
// fx = coeff / intA
const fxVal2 = int.coeff.divide(intA);
const a = solveLinear(fx.minus(fxVal2));

// typeset
const body = `${math(`x = ${x}.`)}`;
const partII = `${math(`a = ${a}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Integration',
		}),
	);
}
