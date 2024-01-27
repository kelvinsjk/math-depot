import {
	EquationWorking,
	Polynomial,
	xPolynomial,
	Fraction,
	binomialExpansionWorking,
	expansionWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const poly = new Polynomial([2, new Fraction(-1, 8)], { ascending: true });
const n = 6;
const expansion = poly.pow(n).slice(3);

// part a
{
	const working = binomialExpansionWorking(poly, n, 3);
	const soln = mathlify`
		$${'align*'}
		& \\left( ${poly} \\right)^${n} \\\\
		& = ${working} \\\\
		& = ${expansion} + \\dotsb ${qed}
	`;

	const ans = mathlify`
		${expansion} + \\dotsb
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const firstExp = new xPolynomial([4, 'k', 1], { ascending: true });
	const result = firstExp.times(expansion).slice(3);
	const working = expansionWorking(firstExp, expansion).filter(5, 7, 8);
	const [, b, a] = result.coeffs;
	const working2 = new EquationWorking(b.plus(a));
	working2.setAligned(true);
	const k = working2.solveLinear();
	const soln = mathlify`
		$${'align*'}
		& \\left( ${firstExp} \\right) \\left( ${poly} \\right)^${n} \\\\
		& = \\left( ${firstExp} \\right) \\left( ${expansion} + \\dotsb \\right) \\\\
		& = ${working} + \\dotsb \\\\
		& = ${result} + \\dotsb

		Since the sum of the coefficients of ${'x'}
		and ${'x^2'} 
		is zero,
		$${'align*'}
		\\left(${a}\\right) + \\left(${b}\\right) &= 0 \\\\
		${working2} ${qed}
	`;
	const ans = mathlify`
		${`k={${k}}`}.
	`;
	answer.addPart(ans, soln);
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
