import {
	EquationWorking,
	Expression,
	ExpressionProduct,
	Fraction,
	LnTerm,
	Polynomial,
	LnFn,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed, e, or } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

const y = new Polynomial('y');
{
	const working = new EquationWorking(
		new ExpressionProduct(y, new Expression(1, 'y')),
		new Fraction(3, 4),
	);
	working.times(4);
	working.expand();
	working.rhsZero({ hide: true });
	working.changeOrder([1, 0, 2]);
	const [y1, y2] = working.factorizeQuadratic();
	const eX = `${e}^x`;
	const soln = mathlify`
		Let ${`y = ${eX}`}
		$${'gather*'}
		${working} \\\\
		\\begin{aligned}
		y &= {${y1}} & ${or} && y &= ${y2} \\\\
		${eX} &= {${y1}} \\text{ (NA)} & ${or} && ${eX} &= ${y2} \\\\
		&&&& x &= \\ln ${y2} ${qed}
		\\end{aligned}
	`;
	const ans = mathlify`
		${`x = \\ln ${y2}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const log_8_2 = new LnTerm(2, { base: 8 });
	const changedBase = log_8_2.changeBase(2);
	const logY = new LnFn(y, { base: 2 });
	const yPlus3 = y.plus(3);
	const logYPlus3 = new LnFn(yPlus3, { base: 2 });
	const log8 = new LnFn(8, { base: 2 });
	const log8Y = logY.plus(log8);
	const working = new EquationWorking(yPlus3, y.times(8).times(2), { aligned: true });
	const yVal = working.solveLinear();
	const soln = mathlify`
		$${'align*'}
		1 + ${logY} + \\frac{1}{${log_8_2}} &= ${logYPlus3} \\\\
		1 + ${logY} + \\frac{1}{${changedBase}} &= ${logYPlus3} \\\\
		1 + ${logY} + ${log8} &= ${logYPlus3} \\\\
		1 + ${logY.plus(log8)} &= ${logYPlus3} \\\\
		${logYPlus3} - ${log8Y} &= 1 \\\\
		${logYPlus3.minus(log8Y).exp} &= 1 \\\\
		${logYPlus3.minus(log8Y).exp} &= 1 \\\\
		\\frac{y+3}{8y} &= 2^1 \\\\
		${working} ${qed}
	`;
	const ans = mathlify`
		${`y = ${yVal}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const poly = new Polynomial([2, 7]);
	const den = 3;
	const soln = mathlify`
		$${'align*'}
		x &= 2 \\ln \\left( \\frac{${poly}}{${den}} \\right) \\\\		
		\\frac{x}{2} &= \\ln \\left( \\frac{${poly}}{${den}} \\right) \\\\
		${e}^{\\frac{x}{2}} &= \\frac{${poly}}{${den}} ${qed} \\\\
		3 ${e}^{\\frac{x}{2}} &= ${poly}  \\\\
		3 ${e}^{\\frac{x}{2}} + 4 &= ${poly.plus(4)}

		Equation of line is
		$${`y = ${poly.plus(4)}`} ${qed}
	`;
	const ans = mathlify`
		${`${e}^{\\frac{x}{2}} = \\frac{${poly}}{${den}}`}.
		--newline--
		${`y = ${poly.plus(4)}`}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.exp,
		}),
	);
}
