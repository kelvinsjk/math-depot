import { alignStar } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body =
	alignStar(`\\angle PBA &= \\angle ACB \\textrm{ (alternate segment theorem)} \\\\
	&= \\angle DAC \\textrm{ (alt. angles, } BC \\parallel AD).
`);

const partII =
	alignStar(`\\angle ACE &= 90^\\circ \\textrm{ (right angle in semicircle)} \\\\
	\\angle ADC &= 180^\\circ - \\angle DAC - \\angle ACE \\textrm{ (angle sum in a triangle)} \\\\
		&= 90^\\circ - \\angle DAC \\\\
		&= 90^\\circ - \\angle PBA \\textrm{ (from part (i))} \\\\
	\\angle ABC &= 180^\\circ - \\angle ADC \\textrm{ (angles in opposite segment)} \\\\
		&= 180^\\circ - (90^\\circ - \\angle PBA) \\\\
		&= 90^\\circ + \\angle PBA \\\\
	\\angle CBT &= 180^\\circ - \\angle ABC - \\angle PAB \\textrm{ (adj. angles on a str. line)} \\\\
		&= 180^\\circ - (90^\\circ + \\angle PAB) - \\angle PAB \\\\
		&= 90^\\circ - 2 \\times (\\angle PBA)
`);

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
