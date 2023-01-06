import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part ii
const data = new Regression([10, 20, 30, 40], [8000, 9200, 10600, 12200]).linearize({
	yFn: 'ln',
});
const [lnA, k] = data.yOnX();
const a = Math.exp(lnA);
const aString = parseFloat(a.toPrecision(3)).toLocaleString();

// part iii
const V = parseFloat((a * Math.exp(k * 44)).toPrecision(3)).toLocaleString();

// typeset
const body = `${math(`a \\approx ${aString},`)} ${math(
	`k \\approx ${k.toPrecision(3)}.`,
)}`;
const partIII = `${math(`\\$${V}.`)}`;

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
