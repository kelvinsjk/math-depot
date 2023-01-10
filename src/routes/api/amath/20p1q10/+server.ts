import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { acos, Polynomial, SquareRoot, Angle, CosFn, Term } from 'mathlify';

// part i
const yLine = new SquareRoot(3).negative().divide(2);
const alpha = acos(yLine.abs());
const xA = new Angle(180, { domain: 'all' }).minus(alpha).divide(2);
const xB = new Angle(180, { domain: 'all' }).plus(alpha).divide(2);

// part ii
const y = new CosFn({ fx: new Polynomial(2) });
const int = y.integrate();
const area1 = int.subIn(xA).minus(int.subIn(xB));
const length = xB.minus(xA);
const area2 = new Term(length.coeff, ...length.basicUnits, yLine);

// typeset
const body = `${math(`x_A = ${xA},`)}
	${linebreak}${math(`x_B = ${xB}.`)}
`;
const partII = `${math(`\\left(${area1} ${area2}\\right) \\textrm{ units}^2.`)}`;

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
