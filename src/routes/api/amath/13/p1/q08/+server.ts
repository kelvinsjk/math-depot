import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { e, qed } from '$lib/typesetting';
import { EquationWorking, Expression, Fraction } from 'mathlify';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
const c = 20;
const A = 38;
const k = -0.6;

// part a
{
	const soln = mathlify`
		When ${`t=0`},
		$${'align*'}
		T &= ${c} - ${A} ${e}^{{${k}}(0)} \\\\
		&= {${c - A}} \\degree\\text{C} ${qed}
	`;
	const ans = mathlify`
		${c - A} \\degree \\text{C}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const t = 2;
	const T = c - A * Math.exp(k * t);
	const soln = mathlify`
		When ${`t=${t}`},
		$${'align*'}
		T &= ${c} - ${A} ${e}^{{${k}}(${t})} \\\\
		&= {${T.toPrecision(3)}} \\degree\\text{C} ${qed}
	`;
	const ans = mathlify`
		${T.toPrecision(3)} \\degree \\text{C}.
	`;
	answer.addPart(ans, soln);
}

// part c
const formula = new Expression(c, [-A, `${e}^{{${k}}t}`]);
{
	const working = new EquationWorking('T', formula);
	working.moveTerm(1, { from: 'rhs', hide: true });
	working.moveTerm(0);
	const coeff = new Fraction(k * 10, 10).reciprocal();
	const soln = mathlify`
		$${'gather*'}
		${working} \\\\
		${e}^{{${k}}t} = \\frac{20-T}{38} \\\\
		{${k}}t = \\ln    \\left( \\frac{20-T}{38} \\right) \\\\
		t = ${coeff} \\ln \\left( \\frac{20-T}{38} \\right) ${qed}
	`;
	const ans = mathlify`
		${''}t = ${coeff} \\ln \\left( \\frac{20-T}{38} \\right).
	`;
	answer.addPart(ans, soln);
}

// part d
{
	const soln = mathlify`
		${e}^{{${k}}t} > 0
		for all real values of ${'t'}
		so ${formula} < 20 

		Hence the temperature of the chicken can never reach
		${c} \\degree\\text{C} ${qed}
	`;
	const ans = mathlify`
		${formula} < 20
		for all real values of ${'t'}.
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
