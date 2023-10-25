import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial, solveQuadratic } from 'mathlify';

// part i
const s = new Polynomial([1, -6, 9, 0], { variable: 't' });
const v = s.differentiate();
const [t1, t2] = solveQuadratic(v);

// part ii
const a = v.differentiate();
const aVal = a.subIn(t1);

// part iv
const distance = v
	.definiteIntegral(0, t1)
	.minus(v.definiteIntegral(t1, t2))
	.plus(v.definiteIntegral(t2, 4));

// typeset
const body = `${math(`t=${t1}`)} or ${math(`t=${t2}.`)}`;
const partII = `${math(`${aVal} \\textrm{ cm/s}^2.`)}`;
const partIII = `The value of ${math(`s`)} gives us the displacement from ${math(
	`O.`,
)} This is
	not the same as the total distance as the dot moves both forwards and backwards from ${math(
		`t=0`,
	)}
	to ${math(`t=4.`)}
`;
const partIV = `${math(`${distance} \\textrm{ cm}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }, { body: partIV }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Kinematics',
		}),
	);
}
