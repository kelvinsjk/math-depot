import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part ii
const data = new Regression([0, 5, 10, 15], [2, 2.44, 3, 3.65]).linearize({
	yFn: 'ln',
});
const [lnP0, k] = data.yOnX();
const P0 = Math.exp(lnP0);

// part ii
const P = P0 * Math.exp(k * 20);

// typeset
const body = `${math(`P_0 \\approx ${P0.toPrecision(3)},`)}
	${math(`k \\approx ${k.toPrecision(3)}.`)}
`;
const partIII = `${math(`\\$${P.toPrecision(3)}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [
		{ body, partNo: 2 },
		{ body: partIII, partNo: 3 },
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
