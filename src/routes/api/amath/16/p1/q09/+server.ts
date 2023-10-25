import { linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
import { SquareRoot } from 'mathlify';
import { Laurent } from '$lib/utils/calculus';

// x^2 + 4/x^2
const y = new Laurent([-1, 0, 2], [0, -16]);
const dydx = y.differentiate();
const eqn = dydx.multiplyDenom();
// eqn of the form ax^4 + b = 0;
const coeffs = eqn.coeffs;
const a = coeffs[4];
const b = coeffs[0];
const xSquare = new SquareRoot(b.negative().divide(a)).coeff;
const x1 = new SquareRoot(xSquare);
const x2 = x1.negative();
const y1 = y.subInSurd(x1);
const y2 = y.subInSurd(x2);
const dTwo = dydx.differentiate();
const dTwo1 = dTwo.subInSurd(x1);
const dTwo2 = dTwo.subInSurd(x2);
const max1 = dTwo1.valueOf() > 0 ? 'Minimum point' : 'Maximum point';
const max2 = dTwo2.valueOf() > 0 ? 'Minimum point' : 'Maximum point';

// typeset
const body = `${math(` \\left(${x1}, ${y1}\\right),`)}
	${math(` \\left(${x2}, ${y2}\\right).`)}
`;
const partII = `${max1} ${math(` \\left(${x1}, ${y1}\\right),`)}
	${linebreak}${max2} ${math(` \\left(${x2}, ${y2}\\right).`)}
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
			topic: 'Applications of Differentiation',
		}),
	);
}
