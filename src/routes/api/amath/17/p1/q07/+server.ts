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

const AB = new Expression(new SquareRoot(3), 1);
let AC: Expression;
const angle = 60;
// part a
{
	const root3 = new SquareRoot(3);
	const area = new ExpressionProduct(new Expression(9, root3), new Fraction(1, 4));
	const lhs = AB.times(root3);
	const working = new ExpressionWorking(new RationalTerm(area.times(4).expand(), lhs), {
		aligned: true,
		equalStart: true,
	});
	working.rationalize();
	AC = working.expression;

	//const rationalized = den.times(den.conjugate()).terms[0].coeff;
	//const AC = area.times(den.conjugate()).times(rationalized.reciprocal());
	const soln = mathlify`
		~${'align*'}
		\\frac{1}{2} AC \\left( ${AB} \\right) \\sin ${angle} \\degree &= ${area} \\\\
		\\frac{1}{2} AC \\left( ${AB} \\right) \\frac{${root3}}{2} &= ${area} \\\\
		${root3} \\left( ${AB} \\right) AC &= ${area.times(4)} \\\\
		\\left( ${lhs} \\right) AC &= ${area.times(4)} \\\\
		AC ${working} ${qed}
	`;
	const ans = mathlify`
		${AC}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const ab2Workings = new ExpressionWorking(AB).square();
	const [ab2Working, ab2] = ab2Workings.expArray.slice(1) as [
		UnsimplifiedExpression,
		Expression,
	];
	const ac2Workings = new ExpressionWorking(AC).square();
	const [ac2Working, ac2] = ac2Workings.expArray.slice(1) as [
		UnsimplifiedExpression,
		Expression,
	];
	const productWorkings = new ExpressionWorking(AB).multiplySurdExpression(AC);
	const [productWorking, product] = productWorkings.expArray.slice(1) as [
		UnsimplifiedExpression,
		Expression,
	];
	const bc2 = ab2.plus(ac2).minus(product);

	const soln = mathlify`
		~${'align*'}
		& BC^2 \\\\
		&= AB^2 + AC^2 - 2 (AB) (AC) \\cos ${angle} \\degree \\\\
		&= \\left( ${AB} \\right)^2 + \\left( ${AC} \\right)^2 - 2 \\left( ${AB} \\right) \\left( ${AC} \\right) \\frac{1}{2} \\\\
		&= ${ab2Working} + ${ac2Working} \\\\
		& \\qquad \\qquad - \\left( ${productWorking} \\right) \\\\
		&= ${ab2.plus(ac2)} - \\left( ${product} \\right) \\\\
		&= ${bc2} ${qed}
	`;
	const ans = mathlify`
		${bc2}.
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
