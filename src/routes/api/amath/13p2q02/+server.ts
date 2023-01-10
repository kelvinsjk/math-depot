import { alignStar, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `Let ${math(`\\angle ABE = \\angle EBD = \\alpha`)} and
		${math(`\\angle DBC = \\beta.`)}
	${alignStar(`\\angle EBC &= \\angle EBD + \\angle DBC
		\\\\ &= \\alpha + \\beta
		\\\\ \\angle EAB &= \\angle DBC \\textrm{ (alternate segment theorem)}
		\\\\ &= \\beta
		\\\\ \\angle AEB &= 180^\\circ - \\angle EAB - \\angle EBD \\textrm{ (sum of angles in a triangle)}
		\\\\ &= 180^\\circ - \\alpha - \\beta
		\\\\ \\angle CEB &= 180^\\circ - \\angle AEB \\textrm{ (adj. angles on a str. line)}
		\\\\ &= 180^\\circ - (180^\\circ - \\alpha - \\beta)
		\\\\ &= \\alpha + \\beta.
	`)}
	Hence ${math(`\\angle EBC = \\angle CEB = \\alpha + \\beta`)}
	so ${math(`\\triangle BCE`)} is isosceles.
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
