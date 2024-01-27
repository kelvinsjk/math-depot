import {
	Expression,
	SquareRoot,
	ExpressionWorking,
	RationalTerm,
	Fraction,
	ExpressionProduct,
	UnsimplifiedExpression,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const root3 = new SquareRoot(3);
const num = root3.times(11);
const den = new Expression(root3.times(2), 1);
let diagonal: Expression;

// part a
{
	const working = new ExpressionWorking(new RationalTerm(num, den), {
		aligned: true,
	});
	working.rationalize();
	diagonal = working.expression;

	const soln = mathlify`
		$${'align*'}
		${working} ${qed}
	`;
	const ans = mathlify`
		${diagonal}.
	`;
	answer.addPart(ans, soln);
}

// part b
const AB = new Expression(new SquareRoot(3), 1);
let bc2: Expression;
{
	const ab2Workings = new ExpressionWorking(AB).square();
	const [ab2Working, ab2] = ab2Workings.expArray.slice(1) as [
		UnsimplifiedExpression,
		Expression,
	];
	const diagWorkings = new ExpressionWorking(diagonal).square();
	const [diagWorking, ac2] = diagWorkings.expArray.slice(1) as [
		UnsimplifiedExpression,
		Expression,
	];
	bc2 = ac2.minus(ab2);

	const soln = mathlify`
		$${'align*'}
		& BC^2 \\\\
		& = AC^2 - AB^2 \\\\
		& = \\left( ${diagonal} \\right)^2 - \\left( ${AB} \\right)^2 \\\\
		& = ${diagWorking} \\\\
			& \\qquad \\qquad - \\left( ${ab2Working} \\right) \\\\
		& = ${ac2} - \\left( ${ab2} \\right) \\\\
		& = ${bc2} ${qed}
	`;
	const ans = mathlify`
		${bc2}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const working = new ExpressionWorking(bc2).multiplySurdExpression(AB);
	working.expArray = working.expArray.slice(1);
	working.setAligned(true);
	working.equalStart = true;
	const half = new Fraction(1, 2);
	const cAns = new ExpressionProduct(half.times(7), working.expression.divide(7));
	const soln = mathlify`
		Let ${'x'}
		denote the side of the square base.

		By Pythagoras Theorem,
		$${'align*'}
		x^2 + x^2 &= BC^2 \\\\
		2x^2 &= BC^2 \\\\
		x^2 &= \\frac{1}{2} BC^2

		$${'align*'}
		& \\text{Volume} \\\\
		&= x^2 \\times AB \\\\
		& = ${half} \\left( ${bc2} \\right) \\left( ${AB} \\right) \\\\
		&= ${half} \\left( ${working.expArray[0]} \\right) \\\\
		&= ${half} \\left( ${working.expArray[1]} \\right) \\\\
		&= ${cAns} ${qed}
	`;
	const ans = mathlify`
		${cAns}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.surds,
		}),
	);
}
