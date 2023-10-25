import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// 2 ( cos 2x + 1 ) - ( 1 - cos 2x )
// 3 cos 2x + 1
const a = 3,
	b = 1;
const fx = new Polynomial([a, b], { variable: '\\cos 2x' });

// typeset
const body = `${math(`f(x)=${fx}.`)}`;
const partII = `Greatest value ${math(`=${b + a},`)}
	${linebreak}Least value ${math(`=${b - a}.`)}
`;
const partIII = `Period ${math(`=\\pi \\textrm{ rad},`)}
	${linebreak}Amplitude ${math(`=${a}.`)}
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
			topic: 'Trigonometric Identities and Formulae',
		}),
	);
}
