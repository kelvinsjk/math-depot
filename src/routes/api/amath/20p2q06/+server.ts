import {
	math,
	linebreak,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Regression } from 'mathlify';

// part ii
const data = new Regression([0, 1, 2, 3, 4], [3.32, 3.75, 4.24, 4.8, 5.43]).linearize({
	yFn: 'ln',
});
const [lnA, k] = data.yOnX();
const A = Math.exp(lnA);

// part iii
// P = A e^kx
const kx = Math.log(8 / A);
const x = Math.floor(kx / k);
const year = 1995 + x * 5;

// typeset
const body = `Gradient ${math(`=${k.toPrecision(3)}.`)}
	${linebreak}${math(`P=${A.toPrecision(3)}\\mathrm{e}^{${k.toPrecision(3)}t}.`)}
`;
const partIII = `Year ${math(`${year}.`)}`;

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
