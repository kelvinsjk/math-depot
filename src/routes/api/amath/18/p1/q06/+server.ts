import { LnFn, RationalTerm } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
let rhs: RationalTerm;
const log3x = new LnFn('x', { base: 3 });
const log9x = new LnFn('x', { base: 9 });
{
	const { num, rational } = log9x.changeBase(3);
	const { rational: final } = log3x.changeBase(10);
	rhs = final.times(3).divide(2);
	const soln = mathlify`
		$${'align*'}
		& ${log3x} + ${log9x} \\\\
		& = ${log3x} + ${rational} \\\\
		& = ${log3x} + \\frac{${num}}{\\log_3 3^2} \\\\
		& = ${log3x} + \\frac{${num}}{2 \\log_3 3} \\\\
		& = ${log3x} + \\frac{${num}}{2} \\\\
		& = \\frac{3}{2} ${log3x} \\\\
		& = \\frac{3}{2} ${log3x.changeBase(10).rational} \\\\
		& = ${rhs} ${qed}
	`;
	const ans = mathlify`
		${rhs}.
	`;
	answer.addPart(ans, soln);
}

// b
{
	const eqnRHS = 4;
	const finalRHS = `\\frac{${rhs.den.times(eqnRHS)}}{${rhs.num.cast.toTerm().coeff}}`;
	const final = Math.pow(10, (8 * Math.log10(3)) / 3);
	const soln = mathlify`
		$${'align*'}
		${log3x} + ${log9x} &= ${eqnRHS} \\\\
		${rhs} &= ${eqnRHS} \\\\
		\\lg x &= ${finalRHS} \\\\
		x &= 10^{${finalRHS}} \\\\
		&= ${final.toPrecision(3)} ${qed}
	`;
	const ans = mathlify`
		${final.toPrecision(3)}.
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
