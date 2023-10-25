import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// part i
// tan theta = BC / 800
// BC = 800 tan theta
// cos theta = 200 / CD
// CD = 1200 - 800 tan theta

// part ii
// CD = DE / cos theta
// DE = 1200 cos theta - 800 sin theta
const a = 1200,
	b = 800;

// part iii
const R = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
const alpha = Math.atan(b / a);
const thetaPlusAlpha = Math.acos(200 / R);
const theta = ((thetaPlusAlpha - alpha) / Math.PI) * 180;

// typeset
const body = `${math(`BC = ${b} \\tan \\theta,`)}
	${linebreak}${math(`CD = ${a} - ${b} \\tan \\theta.`)}
`;
const partII = `Period ${math(`DE=${a}\\cos \\theta - ${b}\\sin \\theta.`)}`;
const partIII = `${math(`\\theta = ${theta.toFixed(1)}^\\circ.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
