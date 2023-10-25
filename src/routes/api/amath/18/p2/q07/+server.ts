import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// part i
// d = 840( 1 - exp( -t/80 ) ) - 2t
// v = 840/80 exp( -t/80 ) - 2
// a = -840/80/80 exp( -t/80 )
const v = (840 / 80) * Math.exp(-10 / 80) - 2;
const a = (-840 / 80 / 80) * Math.exp(-10 / 80);

// part iii
// 1.5 = 840/80 exp( -t/80 ) - 2
const t = Math.log(((1.5 + 2) * 80) / 840) * -80;
const d = 840 * (1 - Math.exp(-t / 80)) - 2 * t;
const distance = 500 - d;

// typeset
const body = `${math(`v=${v.toPrecision(3)} \\textrm{ m/s},`)}
	${linebreak}${math(`a=${a.toPrecision(3)} \\textrm{ m/s}^2.`)}
`;
const partII = `The negative sign indicates that she is decelerating (i.e. her speed is decreasing).`;
const partIII = `${math(`${distance.toPrecision(3)} \\textrm{ m}.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
