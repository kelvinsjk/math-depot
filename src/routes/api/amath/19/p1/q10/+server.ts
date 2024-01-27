import {
	Expression,
	SquareRoot,
	ExpressionWorking,
	RationalTerm,
	Fraction,
	SLE,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

{
	// part a
	//const [x, y] = cramersFrac(1, 1, 1, -1, 2, 3);
	const oneThird = new Fraction(1, 3);
	const values = [1, 3];
	const working = new SLE(
		[
			[1, 1],
			[-1, 2],
		],
		values,
	);
	const answers = working.solve({ returnFraction: true });
	const [x, y] = answers;
	const [eqn1, eqn2] = working.eqns;

	const soln = mathlify`
		$${'align'}
		3^{x+y} &= \\left( 3^3 \\right)^{${oneThird}} \\notag \\\\
		x + y &= 1 

		$${'align'}
		\\frac{2^{2y}}{2^x} &= \\left( 2^{-1} \\right)^{-3} \\notag \\\\
		2y - x &= 3

		Taking ${'(1) + (2)'},
		$${'align*'}
		${eqn1.plus(eqn2)} &= ${values[0] + values[1]} \\\\
		y &= ${y} ${qed}

		Substituting ${`y=${y}`}
		into ${'(1)'},
		$${'align*'}
		${eqn1.subIn({ y })} &= ${values[0]} \\\\
		x &= {${x}} ${qed}
	`;
	const ans = mathlify`
		${`x={${x}}`},
		${`y=${y}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const height = new Expression(2, new SquareRoot(7));
	const vol = new Expression(-6, new SquareRoot(7, { coeff: 3 }));
	const working = new ExpressionWorking(new RationalTerm(vol, height), {
		aligned: true,
		equalStart: true,
	});
	working.rationalize();

	const soln = mathlify`
		$${'align*'}
		\\pi r^2 \\left( ${height} \\right) &= \\left( ${vol} \\right) \\pi \\\\
		r^2 ${working} ${qed}
	`;
	const ans = mathlify`
		${working.exp}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topics: [Topics.exp, Topics.surds],
		}),
	);
}
