import { PolynomialLike, EquationWorking, SquareRoot, dydx, d2ydx2 } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const y = new PolynomialLike([
	[1, 2],
	[4, -2],
]);
const dy = y.differentiate();
const working = new EquationWorking(dy);
working.setAligned();
working.moveTerm(1);
working.crossMultiply();
working.divide(2);

const xFour = working.rhs.cast.toFraction();
const xSquare = new SquareRoot(xFour).cast.toFraction();
const x1 = new SquareRoot(xSquare);
const x2 = x1.negative();
const y1 = xSquare.plus(xSquare.reciprocal().times(4));

const coord1 = `\\left( {${x1}}, ${y1}  \\right)`;
const coord2 = `\\left( {${x2}}, ${y1}  \\right)`;

const dTwo = dy.differentiate();

{
	const soln = mathlify`
		$${'align*'}
		y &= ${y} \\\\
		${dydx()} &= ${dy} 

		At stationary points,
		$${'align*'}
		${working} \\\\
		x &= {\\pm \\sqrt[4]{${xFour}}} \\\\
		&= {\\pm ${x1}} \\\\
		y &= ({\\pm ${x1}})^2 + \\frac{4}{({\\pm ${x1}})^2} \\\\
		&= ${y1}

		Coordinates of the stationary points are
		$${coord1} ${qed} \\quad \\text{and} \\quad ${coord2} ${qed}

		$${'align*'}
		${d2ydx2()} &= ${dTwo}
		\\\\ &> 0 \\text{ for all } x \\in \\mathbb{R}

		Hence both ${coord1}
		and ${coord2}
		are #${'b{minimum}'} points ${qed}
	`;
	const ans = mathlify`
		Minimum point ${coord1}.
		--newline--
		Minimum point ${coord2}.
	`;
	answer.addBody(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.diffApp,
		}),
	);
}
