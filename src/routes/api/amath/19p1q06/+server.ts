import { alignStar, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `Let ${math(`\\angle STP = \\theta.`)}
	${alignStar(`\\angle QTP &= 90^\\circ \\textrm{ (right angle in semicircle)} \\\\
		\\angle TQP &= \\angle STP \\textrm{ (alternate segment theorem)} \\\\
			&= \\theta \\\\
		\\angle TRS &= \\angle TQP \\textrm{ (isos. } \\triangle PQR) \\\\
			&= \\theta \\\\
		\\angle RTS &= 180^\\circ - \\angle QTP - \\angle STP \\textrm{ (adj. angles on a str. line)} \\\\
			&= 90^\\circ - \\theta \\\\
		\\angle TSR &= 180^\\circ - \\angle RTS - \\angle TRS \\textrm{ (sum of angles in a triangle)} \\\\
			&= 180^\\circ - (90^\\circ - \\theta) - \\theta \\\\
			&= 90^\\circ
	`)}
`;
const partII = `Since ${math(`\\angle TSR = 90^\\circ,`)} by the converse of the
	right angle in semicircle property, ${math(`TR`)} is the diameter of the circle.
	Hence the midpoint of ${math(`TR`)} is the centre of the circle.
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
			topic: 'Proofs in Plane Geometry',
		}),
	);
}
