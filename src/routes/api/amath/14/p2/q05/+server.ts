import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting';
import { EquationWorking, LnFn, Polynomial, castToPoly, discriminant } from 'mathlify';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
const x = new Polynomial('x');
{
	const base = 2;
	const t1 = new LnFn(x.square(), { base });
	const t2 = new LnFn(x.minus(4), { base });
	const lhs = t1.minus(t2);
	const rhs = 3;
	const working = new EquationWorking(lhs.arg, Math.pow(base, rhs));
	working.crossMultiply();
	working.rhsZero();
	const poly = castToPoly(working.lhs);
	const [c, b, a] = poly.coeffs;
	const d = discriminant(poly);
	const soln = mathlify`
		~${'gather*'}
		2 \\log_2 x - ${t2} = ${rhs} \\\\
		${t1} - ${t2} = ${rhs} \\\\
		${lhs.exp} = ${rhs} \\\\
		${lhs.arg} = ${base}^{${rhs}} \\\\
		${working} ${qed}

		~${'align*'}
		& \\text{Discriminant} \\\\
		& = ({${b}})^2 - 4(${a})(${c}) \\\\
		& = {${d}} < 0

		Hence there are no real solutions ${qed}
	`;
	const ans = mathlify`
		${poly} = 0
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const logXY = new LnFn('y', { base: 'x' });
	const logYX = new LnFn('x', { base: 'y' });
	const t2 = 8;
	const rhs = -2;
	const soln = mathlify`
		~${'gather*'}
		\\frac{(${logXY})^2}{${logYX}} + ${t2} = 0 \\\\
		\\frac{(${logXY})^2}{${logYX.changeBase('x').rational}} = {-${t2}} \\\\
		(${logXY})^3 = {-${t2}} \\\\
		${logXY} = {${rhs}} \\\\
		y = x^{${rhs}} ${qed}
	`;
	const ans = mathlify`
		${`y = x^{${rhs}}`}
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
