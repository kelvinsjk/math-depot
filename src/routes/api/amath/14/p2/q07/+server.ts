import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction } from 'mathlify';
import { dTwo } from '$lib/utils/calculus';

// part i
const p = new Fraction(3);
const y = new Polynomial([-1, 3]).pow(4).negative().plus(2);
const q = y.subIn(p);

// part ii
const epsilon = 1;
const increasing1 = y.differentiate().subIn(p.minus(epsilon)).isGreaterThan(0)
	? 'Increasing'
	: 'Decreasing';
const increasing2 = y.differentiate().subIn(p.plus(epsilon)).isGreaterThan(0)
	? 'Increasing'
	: 'Decreasing';

// part iii
let nature = 'stationary point of inflexion';
if (increasing1 === 'Increasing' && increasing2 === 'Decreasing') {
	nature = 'maximum point';
} else if (increasing1 === 'Decreasing' && increasing2 === 'Increasing') {
	nature = 'minimum point';
}

// part iv
const dTwoVal = y.differentiate().differentiate().subIn(p);

// typeset
const body = `${math(`p=${p},`)} ${math(`q=${q}.`)}`;
const partIIA = `${increasing1}.`;
const partIIB = `${increasing2}.`;
const partIII = `It is a ${nature}.`;
const partIV = `${math(`${dTwo()} = ${dTwoVal}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body },
		{ parts: [{ body: partIIA }, { body: partIIB }], partLabelType: 'alpha' },
		{ body: partIII },
		{ body: partIV },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
