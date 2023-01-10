import { alignStar, linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `Let ${math(`\\angle EAT = \\theta.`)}
	${linebreak}By the alternate segment theorem, ${math(
	`\\angle ABC = \\angle EAT = \\theta.`,
)}
	${linebreak}Since ${math(`BCED`)} is a cyclic quadrilateral,
		${math(`\\angle DEC = 180^\\circ - \\theta.`)}
	${linebreak}${alignStar(`\\angle DEA &= 180^\\circ - \\angle DEC \\textrm{ (adj. angles on a str. line)} \\\\
		&= 180^\\circ - (180^\\circ - \\theta) \\\\
		&= \\theta.
	`)}
	${linebreak}Hence ${math(`\\angle DEA = \\angle EAT = \\theta.`)}
	${linebreak}By the converse of alternate angles, ${math(`DE`)} is parallel to ${math(
	`ST.`,
)}
`;

// answer and solution
const answer: AnswerObject = {
	body,
};

export async function GET() {
	return new Response(
		JSON.stringify({
			answer,
			topic: 'Proofs in Plane Geometry',
		}),
	);
}
