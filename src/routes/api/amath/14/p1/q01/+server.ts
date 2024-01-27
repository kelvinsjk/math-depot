import { EquationWorking, xPolynomial, binomialExpansionWorking, Term } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

{
	const poly1 = new xPolynomial([2, new Term(-1, 'k')], { ascending: true });
	const n1 = 5;
	const working1 = binomialExpansionWorking(poly1, n1, 4);
	const exp1 = poly1.pow(n1).slice(4);
	const poly2 = new xPolynomial([3, 1], { ascending: true });
	const n2 = 6;
	const working2 = binomialExpansionWorking(poly2, n2, 4);
	const exp2 = poly2.pow(n2).slice(4);
	const coeff = 860;
	const coeffWorking = new EquationWorking(exp1.coeffs[3].plus(exp2.coeffs[3]), coeff, {
		aligned: true,
	});
	coeffWorking.moveTerm(1, { hide: true });
	coeffWorking.times(-1);
	coeffWorking.divide(40);
	const rhs = coeffWorking.rhs.cast.toFraction().valueOf();
	const k = Math.sign(rhs) * Math.pow(Math.abs(rhs), 1 / 3);
	const soln = mathlify`
		$${'align*'}
		& \\left( ${poly1} \\right)^${n1} \\\\
		& = ${working1} \\\\
		& = ${exp1} + \\dotsb
		
		$${'align*'}
		& \\left( ${poly2} \\right)^${n2} \\\\
		& = ${working2} \\\\
		& = ${exp2} + \\dotsb

		Since coefficient of ${'x^3'}
		is ${coeff},
		$${'align*'}
		${coeffWorking} \\\\
		k &= {${k}} ${qed}
	`;

	const ans = mathlify`
		${`k={${k}}`}.
	`;
	answer.addBody(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.binomial,
		}),
	);
}
