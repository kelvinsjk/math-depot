import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// 8 sin2 + 2cos2
// 4(1-cos) + (cos+1)
// 4 - 4cos + cos + 1
// 5 - 3 cos 2x
const a = 5,
	b = -3;
const ans = new Polynomial([a, b], { variable: '\\cos 2x', ascending: true });

// typeset
const body = `${math(`${ans}.`)}`;
const partII = `Period ${math(`=\\pi,`)}
	${linebreak}Amplitude = ${math(`${Math.abs(b)}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
