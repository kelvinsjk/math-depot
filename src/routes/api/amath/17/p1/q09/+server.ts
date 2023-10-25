import { math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Polynomial } from 'mathlify';

// part i
const a = new Polynomial([10]);
const v = a.integrate();
const tX = 4;
const vX = v.subIn(tX);

// part ii
const s = v.integrate();
const OX = s.subIn(tX);

// typeset
const body = `${math(`${vX} \\textrm{ m/s}.`)}`;
const partII = `${math(`${OX} \\textrm{ m}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
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
