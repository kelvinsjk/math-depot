import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part ii
const data = new Regression([2, 4, 6, 8], [6.35, 4.38, 2.67, 1.41]).linearize({
	yFn: (x: number) => Math.log(x + 3),
});
const [lnA, kInverse] = data.yOnX();
const A = Math.exp(lnA);
const k = 1 / kInverse;

// part iii
const v = A - 3;

// part v
// v = Ae^{t/k} - 3
const tOverK = Math.log(3 / A);
const t = tOverK * k;

// typeset
const body = `${math(`A \\approx ${A.toPrecision(3)},`)}
	${math(`k \\approx ${k.toPrecision(3)}.`)}
`;
const partIII = `${math(`${v.toPrecision(3)} \\textrm{ m/s}.`)}`;
const partV = `${math(`t = ${t.toPrecision(3)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
		{ body: partV, partNo: 5 },
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
