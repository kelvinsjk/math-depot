import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, Fraction } from 'mathlify';

// part ii
// 8x ()^2/3 - 5(3x-5)^2/3 = d/dx (x(3x-5)^5/3)
// 8 int dx = int 5 ()^2/3 + x()^5/3
// 8 int dx = 5 / (5/3) / 3 ()^5/3 + x () 5/3
const n = new Fraction(2, 3);
const a = 3,
	b = -5;
const poly = new Polynomial([a, b]);
const coeff = new Fraction(5).divide(n.plus(1)).divide(a);
const ansPoly = new Polynomial([1, coeff]);
const k = new Fraction(1, 8);

// part iii
const x1 = new Fraction(5, 3),
	x2 = -1;

// typeset
const body = `${math(`${k}(${ansPoly})(${poly})^{${n.plus(1)}} + c.`, { wrap: true })}`;
const partIII = `${math(`
	\\displaystyle \\int_{${x2}}^{${x1}} x (${poly})^{${n.plus(1)}} \\; \\mathrm{d}x
		= 0.
	`)}
	${linebreak}This means that in between ${math(`x=${x2}`)} and ${math(
	`x=${x1},`,
)} the area bounded by the curve above the
	${math(`x\\textrm{-axis}`)} is equal to the area below the ${math(`x\\textrm{-axis}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }, { body: partIII }],
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
