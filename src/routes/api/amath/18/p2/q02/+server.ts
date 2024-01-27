import {
	EquationWorking,
	xPolynomial,
	binomialExpansionWorking,
	expansionWorking,
	castToPoly,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

{
	const poly = new xPolynomial([2, 'a'], { ascending: true });
	const n = 6;
	const working = binomialExpansionWorking(poly, n, 3);
	const exp = poly.pow(6).slice(3);
	const poly2 = new xPolynomial([1, -4], { ascending: true });
	const working2 = expansionWorking(poly2, exp).filter(5);
	const finalExp = poly2.times(exp).slice(3);
	const xCoeff = -160;
	const aWorking = new EquationWorking(finalExp.coeffs[1], xCoeff, { aligned: true });
	const a = aWorking.solveLinear();
	const x2Coeff = finalExp.coeffs[2];
	const b = x2Coeff.subIn({ a });
	const soln = mathlify`
		$${'align*'}
		& \\left( ${poly} \\right)^${n} \\\\
		& = ${working} \\\\
		& = ${exp} + \\dotsb

		$${'align*'}
		& (${poly2}) \\left( ${poly} \\right)^${n} \\\\
		&= (${poly2}) \\left(${exp} + \\dotsb \\right) \\\\
		&= ${working2} + \\dotsb \\\\
		&= ${finalExp} + \\dotsb 

		Comparing coefficients of ${'x'},
		$${'align*'}
		${aWorking} ${qed}

		Comparing coefficients of ${'x^2'},
		$${'align*'}
		b &= ${castToPoly(x2Coeff).replaceXWith(`\\left({${a}}\\right)`)} \\\\
		&= {${b}} ${qed}
	`;

	const ans = mathlify`
		${`a=${a}`},
		${`b={${b}}`}.
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
