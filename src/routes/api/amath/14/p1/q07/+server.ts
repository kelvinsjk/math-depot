import {
	math,
	//display
} from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';
//import { SquareRoot } from 'mathlify';
import {
	//circleEqn,
	//line,
	//gradient,
	//circlePropsFromStandard,
	//distance,
	area,
} from '$lib/utils/coordinate';

// part i
// A(h, 2h)
// C(h, h/2)
// Eqn of CB: y - h/2 = 2 ( x - h )
// y-coordinate of B = 2h
// 3/2 h = 2 (x-h)
// 3/4 h = x - h
// B( 7/4h, 2h)

// part ii
const h = 4;
const ax = h,
	ay = 2 * h;
const cx = h,
	cy = h / 2;
const bx = (7 * h) / 4,
	by = 2 * h;
const a = area([
	[0, 0],
	[ax, ay],
	[bx, by],
	[cx, cy],
]);

// typeset
const body = `${math(`A\\left(h, 2h\\right),`)}
	${math(`B\\left(\\frac{7}{4}h, 2h\\right),`)} ${math(`C\\left(h, \\frac{1}{2}h\\right).`)}
`;
const partII = `${math(`${a} \\textrm{ units}^2.`)}`;

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }],
	partLabelType: 'roman',
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Coordinate Geometry',
		}),
	);
}
