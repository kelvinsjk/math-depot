import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction, Polynomial, solveLinear } from 'mathlify';

//const bx = 0
const by = 48 / 4;
const cx = 40 / 4;
// cy = 0;
const l1 = new Polynomial([new Fraction(-1, 4), 48 / 4]);
const l2 = new Polynomial([new Fraction(4, 3), new Fraction(-40, 3)]);
const ax = solveLinear(l1.minus(l2));
const ay = l1.subIn(ax);
const areaOAB = ax.times(by).divide(2);
const areaOAC = ay.times(cx).divide(2);
const ratio = areaOAB.divide(areaOAC);

// typeset
const body = `${math(`${ratio.num} : ${ratio.den}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
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
