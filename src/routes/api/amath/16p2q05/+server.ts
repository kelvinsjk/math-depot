import { alignStar, linebreak, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body = `Let ${math(`\\angle BAP = \\theta.`)}
	${alignStar(`\\angle APB &= 180^\\circ - 2 \\theta \\textrm{ (tangents from ext. pt.)} \\\\
		\\angle ACB &= \\angle BAP \\textrm{ (alternate segment theorem)} \\\\
			&= \\theta \\\\
		\\angle CDB &= 180^\\circ - 2 \\theta \\textrm{ (isos. } \\triangle CDB) \\\\
		\\angle ADB &= 180^\\circ - \\angle CDB \\textrm{ (adj. angles on a str. line)} \\\\
			&= 180^\\circ - (180^\\circ - 2 \\theta) \\\\
			&= 2 \\theta
	`)}
	Hence ${alignStar(`& \\angle APB + \\angle ADB \\\\
		&= (180^\\circ - 2\\theta) + 2 \\theta \\\\
		&= 180^\\circ.
	`)}
`;
const partII = `Let ${math(`\\angle PDB = \\alpha.`)}
	${linebreak} Since ${math(`A, P, B`)} and ${math(`D`)} lie on a circle,
	${alignStar(`\\angle PAB &= \\angle PDB \\textrm{ (angles in same segment)}
		\\\\ &= \\alpha
	`)}
	${alignStar(`\\angle ACB &= \\angle PAB \\textrm{ (alternate segment theorem)}
		\\\\ &= \\alpha
		\\\\ \\angle DBC &= \\angle DCB \\textrm{ (isos. } \\triangle DCB)
		\\\\ &= \\alpha	
	`)}
	Hence ${math(`\\angle PDB = \\angle DBC = \\alpha.`)} By the converse of alternate
	angles, ${math(`PD`)} and ${math(`BC`)} are parallel.
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
