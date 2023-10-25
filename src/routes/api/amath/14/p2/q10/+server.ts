import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear, SquareRoot } from 'mathlify';
import { circlePropsFromStandard, distance, line } from '$lib/utils/coordinate';

// part i
const [[x, y], r2] = circlePropsFromStandard(4, -6, -36);
const r = new SquareRoot(r2);

// part ii
const xA = -5,
	yA = 5;
const m = new Fraction(4, 3).negative().reciprocal();
const lAB = line(m, xA, yA);
const tangent = new Polynomial([new Fraction(4, 3), -5]);
const xB = solveLinear(lAB.minus(tangent));
const yB = lAB.subIn(xB);

// part iii
const xM = xB.plus(xA).divide(2);
const yM = yB.plus(yA).divide(2);
const radius = distance(xM, yM, xA, yA);

// typeset
const body = `Radius ${math(`=${r} \\textrm{ units}.`)}
	<br>Centre ${math(`=\\left(${x},${y}\\right).`)}
`;
const partII = `${math(`y=${lAB}.`)}
	<br>${math(`B\\left(${xB},${yB}\\right).`)}
`;
const partIII = `Radius ${math(`=${radius} \\textrm{ units}.`)}
	<br>Centre ${math(`=\\left(${xM},${yM}\\right).`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
