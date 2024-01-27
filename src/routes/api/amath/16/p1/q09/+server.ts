import { PolynomialLike, EquationWorking, SquareRoot, dydx, d2ydx2 } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const y = new PolynomialLike([
	[2, 0],
	[-1, 2],
	[-16, -2],
]);
const dy = y.differentiate();
const working = new EquationWorking(dy);
working.setAligned();
working.moveTerm(0);
working.crossMultiply({ hide: true });
working.swap();
working.divide(2);

const x1 = new SquareRoot(
	new SquareRoot(working.rhs.cast.toFraction()).cast.toFraction(),
).cast.toFraction();
const x2 = x1.negative();
const y1 = y.subIn(x1);

const coord1 = `\\left( {${x1}}, {${y1}}  \\right)`;
const coord2 = `\\left( {${x2}}, {${y1}}  \\right)`;

const dTwo = dy.differentiate();

// part a
{
	const soln = mathlify`
		$${'align*'}
		y &= ${y} \\\\
		${dydx()} &= ${dy} 

		At stationary points,
		$${'align*'}
		${working} \\\\
		x &= {\\pm \\sqrt[4]{${working.rhs}}} \\\\
		&= {\\pm ${x1}} \\\\
		y &= 2 - \\left( {\\pm ${x1}} \\right)^2 - \\frac{16}{\\left( {\\pm ${x1}} \\right)^2} \\\\
		&= {${y1}}

		Coordinates of the stationary points are
		$${coord1} ${qed} \\quad \\text{and} \\quad ${coord2} ${qed}
	`;
	const ans = mathlify`
		${coord1},
		${coord2}.
	`;
	answer.addPart(ans, soln);
}

{
	const soln = mathlify`		
		$${'align*'}
		${dydx()} &= ${dy} \\\\
		${d2ydx2()} &= ${dTwo}
		\\\\ &< 0 \\text{ for all } x \\in \\mathbb{R}

		Hence both ${coord1}
		and ${coord2}
		are #${'b{maximum}'} points ${qed}
	`;
	const ans = mathlify`
		Maximum point ${coord1}.
		--newline--
		Maximum point ${coord2}.
	`;
	answer.addPart(ans, soln);
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
