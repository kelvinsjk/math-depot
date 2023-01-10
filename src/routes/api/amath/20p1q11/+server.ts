import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction } from 'mathlify';

// part i
const vA = 15;
const vB = vA * 2;

// part ii
const tB = 10;
const term1 = new Polynomial(new Fraction(1, 20));
const int1 = term1.definiteIntegral(0, tB);
// vB = 15 ( tB/20 + exp(k tB) )
const coeff = 15;
const expTerm = new Fraction(vB).divide(coeff).minus(new Fraction(tB, 20));
const k = Math.log(expTerm.valueOf()) / tB;
const int2 = (Math.exp(k * tB) - Math.exp(0)) / k;
const distance = (int1.valueOf() + int2) * 15;

// part iii
const tC = 2;
const a1 = term1.differentiate().subIn(tC);
const a2 = Math.exp(k * tC) * k;
const a = (a1.valueOf() + a2) * 15;

// typeset
const body = `${math(`${vB} \\textrm{ m/s}.`)}`;
const partII = `${math(`${distance.toPrecision(3)} \\textrm{ m}.`)}`;
const partIII = `${math(`${a.toPrecision(3)} \\textrm{ m/s}^2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Kinematics',
		}),
	);
}
