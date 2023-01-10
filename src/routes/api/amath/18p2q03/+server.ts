import { alignStar, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `Let ${math(`\\angle BPA = \\alpha`)} and ${math(`\\angle QPB = \\beta.`)}
	${alignStar(`\\angle QCP &= \\alpha \\textrm{ (alternate segment theorem)} \\\\
		\\angle AQP &= \\angle APQ \\textrm{ (isos. } \\triangle AQP) \\\\
			&= \\alpha + \\beta \\\\
		\\angle PQC &= 180^\\circ - \\angle AQP \\textrm{ (adj. angles on a str. line)} \\\\
			&= 180^\\circ - \\alpha - \\beta \\\\
		\\angle QPC &= 180^\\circ - \\angle PQC - \\angle QCP \\textrm{ (sum of angles in a triangle)} \\\\
			&= 180^\\circ - (180^\\circ - \\alpha - \\beta) - \\alpha \\\\
			&= \\beta
	`)}
	Hence ${math(`\\angle QPB = \\angle QPC = \\beta`)} so ${math(`PQ`)}
	bisects ${math(`\\angle BPC.`)}
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
