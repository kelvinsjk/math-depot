import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear, solveQuadratic, SquareRoot } from 'mathlify';
import { circlePropsFromStandard, gradient, line } from '$lib/utils/coordinate';

// part i
const [[x, y], r2] = circlePropsFromStandard(6, -4, -12);
const r = new SquareRoot(r2);

// part ii
const xP = -7,
	yP = -1;
const xQ = xP;
const poly = new Polynomial([1, -4, xQ * xQ + 6 * xQ - 12]);
const [y1, y2] = solveQuadratic(poly) as [Fraction, Fraction];
const yQ = y1.isEqualTo(yP) ? y2 : y1;
const m = gradient(xQ, yQ, x, y, true);
const tangent = line(m, xQ, yQ);

// part iii
const m2 = gradient(xP, yP, x, y, true);
const tangent2 = line(m2, xP, yP);
const xR = solveLinear(tangent.minus(tangent2));
const yR = tangent.subIn(xR);

// typeset
const body = `Centre ${math(`=\\left(${x}, ${y}\\right).`)}
	<br>Radius ${math(`=${r} \\textrm{ units}.`)}
`;
const partIII = `${math(`y=${tangent}.`)}`;
const partIV = `${math(`R\\left(${xR},${yR}\\right).`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partIII, partNo: 3 }, { body: partIV, partNo: 4 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Coordinate Geometry',
		}),
	);
}
