import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear } from 'mathlify';

// part iii
const opp = -3,
	hyp = 5,
	adj = 4;
const sinMinus = new Fraction(opp, hyp);
const cosMinus = new Fraction(adj, hyp);

// part iv
const adj2 = 7,
	opp2 = 24,
	hyp2 = 25;
const sinPlus = new Fraction(opp2, hyp2);
const cosPlus = new Fraction(adj2, hyp2);
const tanPlus = new Fraction(opp2, adj2);

// part v
const tanA = sinPlus.plus(sinMinus).divide(cosPlus.plus(cosMinus));

// part vi
// (tan A + tanB) / (1- tanA tanB) = tanPlus
// tanA + tanB = tanPlus - tanPlus tanA tanB
const lhs = new Polynomial([1, tanA]);
const rhs = new Polynomial([tanPlus.times(tanA).negative(), tanPlus]);
const tanB = solveLinear(lhs.minus(rhs));

// typeset
const body = `${math(`B > A.`)}`;
const partIII = `${math(`\\cos(A-B) = ${cosMinus}.`)}`;
const partIV = `${math(`\\sin(A+B) = ${sinPlus}.`)}`;
const partVI = `${math(`\\tan B = ${tanB}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
		{ body: partIV, partNo: 4 },
		{ body: partVI, partNo: 6 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
