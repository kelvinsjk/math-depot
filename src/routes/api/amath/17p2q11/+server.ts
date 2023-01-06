import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';

// P to OX: 4 cos theta
// P to OY = 4 sin theta

// part iii
const a = 20,
	b = 12;
const R2 = Math.pow(a, 2) + Math.pow(b, 2);
const R = new SquareRoot(R2);
const alpha = (Math.atan(b / a) / Math.PI) * 180;

// part iv
const basic = (Math.acos(15 / R.valueOf()) / Math.PI) * 180;
const theta = basic + alpha;

// typeset
const body = `Shortest distance from ${math(`P`)} to ${math(`OX = 4 \\cos \\theta`)}
	${linebreak}
	Shortest distance from ${math(`P`)} to ${math(`OY = 4 \\sin \\theta`)}
`;
const partIII = `${math(`\\sqrt{${R2}}\\cos(\\theta-${alpha.toFixed(1)}^\\circ).`)}`;
const partIV = `${math(`\\theta = ${theta.toFixed(1)}^\\circ.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partIII, partNo: 3 }, { body: partIV, partNo: 4 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
