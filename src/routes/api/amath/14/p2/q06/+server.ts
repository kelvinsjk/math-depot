import { alignStar, math } from 'mathlifier';
import type { AnswerObject } from '$lib/interfaces';

// typeset
const body =
	alignStar(`\\angle DEF &= 180^\\circ \\angle CEF \\textrm{ (adj. angles on a str. line)}
	\\\\ &= 180^\\circ - ( 180^\\circ - 2 \\angle ECA ) \\textrm{ (tangents from ext. pt.)}
	\\\\ &= 2 \\times \\angle EAC
	\\\\ & = 2 \\times \\angle ABC \\textrm{ (alternate segment theorem).}
`);
const partII = math(`\\angle DFE = 2 \\times \\angle BCA`);
const partIII = alignStar(`& \\textrm{RHS}
	\\\\ &= 180^\\circ + \\angle EDF
	\\\\ &= 180^\\circ + (180^\\circ - \\angle DEF - \\angle DFE) \\textrm{ (sum of angles in a triangle)}
	\\\\ &= 360^\\circ - \\angle DEF - \\angle DFE
	\\\\ &= 360^\\circ - 2 \\times \\angle ABC - 2 \\times \\angle BCA \\textrm{ (from parts (i) and (ii))}
	\\\\ &= 360^\\circ - 2( \\angle ABC + \\angle BCA )
	\\\\ &= 360^\\circ - 2 (180^\\circ - \\angle BAC) \\textrm{ (sum of angles in a triangle)}
	\\\\ &= 2 \\times \\angle BAC
	\\\\ &= \\textrm{LHS}.
`);

// answer and solution
const answer: AnswerObject = {
	parts: [{ body }, { body: partII }, { body: partIII }],
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
