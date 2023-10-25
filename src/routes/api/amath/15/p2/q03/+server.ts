import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveLinear } from 'mathlify';
import { line } from '$lib/utils/coordinate';

// part i
const curve = new Polynomial([-1, 4, -6]);
const x = 1;
const m = curve.differentiate().subIn(x);
const l = line(m, x, curve.subIn(x));
const a = solveLinear(l);
const b = l.subIn(0);
const area = a.times(b).divide(2).abs();

// part iii
const m2 = m.reciprocal().negative();
const xQ = solveLinear(curve.differentiate().minus(m2));
const yQ = curve.subIn(xQ);

// typeset
const body = `${math(`${area} \\textrm{ units}^2.`)}`;
const partII = `${math(`Q \\left( ${xQ}, ${yQ} \\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
