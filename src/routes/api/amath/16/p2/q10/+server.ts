import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, ExpFn } from 'mathlify';

// part i
// v = a exp(kt) + b
const a = 30,
	k = 25,
	b = 20;
const vB = 80;
const vA = a + b;

// part ii
const expTerm = (vB - b) / a;
const t = Math.log(expTerm) / k;

// part iii
// s = a/k exp(kt) + bt
const distance = (a / k) * Math.exp(k * t) + b * t - a / k;

// part iv
const expFn = new ExpFn({ fx: new Polynomial(k, { variable: 't' }), coeff: a });
const acc = expFn.differentiate();

// typeset
const body = `${math(`p = ${vA}.`)}`;
const partII = `${math(`${Math.round(t * 3600)} \\textrm{ s}.`)}`;
const partIII = `${math(`${distance.toPrecision(3)} \\textrm{ km}.`)}`;
const partIV = `${math(`a = ${acc}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }, { body: partIV }],
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
