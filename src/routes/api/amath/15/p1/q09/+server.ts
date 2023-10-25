import { alignStar, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `${alignStar(`\\angle DAX &= \\angle ACD \\textrm{ (alternate segment theorem)} 
		\\\\ &= \\angle BAC \\textrm{ (alternate angles)}
		\\\\ &= \\angle BCA \\textrm{ (isos. } \\triangle BCA)		
	`)}
`;
const partII = `Let ${math(`\\angle DAX = \\angle BCA = \\theta.`)}
	${alignStar(`\\angle CBA &= 180^\\circ - 2 \\theta \\textrm{ (angle sum of isos. triangle)}
		\\\\ \\angle CDA &= 180^\\circ - \\angle CBA \\textrm{ (angles in opposite segment)}
		\\\\ &= 2 \\theta
		\\\\ \\angle ADX &= 180^\\circ - 2 \\theta \\textrm{ (adj. angles on a str. line)}
		\\\\ \\angle DXA &= 180^\\circ - \\angle DAX - \\angle ADX \\textrm{ (sum of angles in a triangle)}
		\\\\ &= 180^\\circ - (180^\\circ - 2\\theta ) - \\theta
		\\\\ &= \\theta.
	`)}
	Since ${math(`\\angle DAX = \\angle DXA = \\theta,`)}
	${math(`\\triangle ADX`)} is isosceles.
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
