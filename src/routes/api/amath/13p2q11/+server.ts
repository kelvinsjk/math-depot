import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, SquareRoot, Fraction, solveLinear, PowerFn } from 'mathlify';

// part i
// p - q / (x+3)^2
const poly = new Polynomial([1, 3]);
const p = 3,
	q = 12;
const polySquare = new Fraction(q, p);
const squareRoot = new SquareRoot(polySquare).coeff;
const xB = solveLinear(poly.minus(squareRoot));
const xC = solveLinear(poly.plus(squareRoot));
const yA = new Fraction(p).minus(new Fraction(q).divide(poly.subIn(0).square()));
// y_a = p - q / (x+3)^2
const xD = xC.minus(xB.abs());

// part ii
const term1 = new Polynomial([p]);
const term2 = new PowerFn(-2, { fx: poly, coeff: -q });
const int1 = term1.definiteIntegral(xB, 0);
const int2 = term2.definiteIntegral(xB, 0);
const curve = int1.plus(int2);

// part iii
const rectangle = yA.times(xD.abs());
const area = rectangle.minus(curve.times(2));

// typeset
const body = `${math(`A\\left( 0, ${yA} \\right),`)}
	${math(`B\\left( ${xB}, 0 \\right),`)}
	${math(`C\\left( ${xC}, 0 \\right),`)}
	${math(`D\\left( ${xD}, ${yA} \\right).`)}
`;
const partII = `${math(`${curve} \\textrm{ units}^2.`)}`;
const partIII = `${math(`${area} \\textrm{ units}^2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
