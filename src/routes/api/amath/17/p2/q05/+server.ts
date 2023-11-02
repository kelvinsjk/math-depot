import {
	Polynomial,
	LnFn,
	RationalTerm,
	Fraction,
	EquationWorking,
	SquareRoot,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { or, qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
{
	const x = new Polynomial('x');
	const base = 5;
	const t1 = new LnFn(x.minus(1), { base });
	const t2 = new LnFn(x.plus(1), { base });
	const t3 = new LnFn(new Fraction(1, 7), { base });
	const arg = new RationalTerm(t1.fx, t2.fx);
	const working = new EquationWorking(arg.divide(t3.fx), Math.pow(base, 1), {
		aligned: true,
	});
	working.crossMultiply();
	const xVal = working.solveLinear();
	const soln = mathlify`
		~${'align*'}
		${t1} - ${t2} &= 1 + ${t3} \\\\
		${t1.minus(t2).exp} - ${t3} &= 1 \\\\
		\\log_5 \\left( ${arg} \\div ${t3.fx} \\right) &= 1 \\\\
		\\log_5 ${arg.divide(t3.fx)} &= 1 \\\\
		${working} ${qed}
	`;
	const ans = mathlify`
		${''}x = ${xVal}.
	`;
	answer.addPart(ans, soln);
}

// b
{
	const logY100 = new LnFn(100, { base: 'y' });
	const lgY = new LnFn('y', { base: 10 });
	const { rational, num } = logY100.changeBase(10);
	const rhs = 2;
	const sqrt2 = new SquareRoot(rhs);
	const y1 = Math.pow(10, -sqrt2.valueOf());
	const y2 = Math.pow(10, sqrt2.valueOf());
	const soln = mathlify`
		~${'align*'}
		${logY100} &= ${lgY} \\\\
		${rational} &= ${lgY} \\\\
		\\left( ${lgY} \\right)^2 &= ${num} \\\\
		&= \\lg 10^2 \\\\
		&= 2 \\lg 10 \\\\
		&= ${rhs} \\\\
		${lgY} &= \\pm ${sqrt2} \\\\
		y &= 10^{\\pm ${sqrt2}}

		$${`y = ${y1.toPrecision(2)} ${qed} ${or} y = ${y2.toPrecision(2)} ${qed}`}
	`;
	const ans = mathlify`
		${`y=${y1.toPrecision(2)}`}
		or ${`y=${y2.toPrecision(2)}`}.
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
