import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { Fraction } from 'mathlify';

// part ii
const kNum = 300 * 2;
const kDen = 2 * 3;
const k = new Fraction(kNum, kDen);

// 600 = 4r + 2l + 4 pi r
// 300 = l + 2 ( 1 + pi  ) r
// l = 300 - 2 ( 1 + pi ) k / ( 1 + pi )
const l = new Fraction(300).minus(k.times(2));

// typeset
const body = `${math(`r = \\frac{${k}}{1 + \\pi},`)}
	${linebreak}${math(`l=${l}.`)}
`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body, partNo: 2 }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Applications of Differentiation',
		}),
	);
}
