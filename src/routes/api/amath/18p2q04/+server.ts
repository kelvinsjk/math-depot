import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part ii
const data = new Regression([20, 40, 60, 80], [36.4, 22.1, 13.4, 8.1]).linearize({
	yFn: 'ln',
});
const [lnM0, kNeg] = data.yOnX();
const m0 = Math.exp(lnM0);
const k = -kNeg;

// part ii
const t = Math.log(1 / 2) / -k;

// typeset
const body = `${math(`${m0.toPrecision(3)}\\textrm{ g}.`)}`;
const partIII = `${math(`k \\approx ${k.toPrecision(3)}.`)}`;
const partIV = `${math(`${t.toPrecision(3)} \\textrm{ hr}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
		{ body: partIV, partNo: 4 },
	],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Linear Law',
		}),
	);
}
