import {
	EquationWorking,
	xPolynomial,
	binomialExpansionWorking,
	Polynomial,
	castToPoly,
	SquareRoot,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();
let a: number;
const poly1 = new xPolynomial(['a', -1], { ascending: true });
const n1 = 5;
const working1 = binomialExpansionWorking(poly1, n1, 4);
const exp1 = poly1.pow(n1).slice(4);
const poly2 = new Polynomial([2, 1], { ascending: true });
const n2 = 6;
const working2 = binomialExpansionWorking(poly2, n2, 4);
const exp2 = poly2.pow(n2).slice(4);
// a
{
	const coeff = 70;
	const coeffWorking = new EquationWorking(exp1.coeffs[3].plus(exp2.coeffs[3]), coeff, {
		aligned: true,
	});
	coeffWorking.moveTerm(1, { hide: true });
	coeffWorking.times(-1);
	coeffWorking.divide(10);
	const rhs = coeffWorking.rhs.cast.toFraction().valueOf();
	a = new SquareRoot(rhs).valueOf();
	const soln = mathlify`
		~${'align*'}
		& \\left( ${poly1} \\right)^${n1} \\\\
		& = ${working1} \\\\
		& = ${exp1} + \\dotsb
		
		~${'align*'}
		& \\left( ${poly2} \\right)^${n2} \\\\
		& = ${working2} \\\\
		& = ${exp2} + \\dotsb

		Since coefficient of ${'x^3'}
		is ${coeff},
		~${'align*'}
		${coeffWorking}

		Since ${'a'}
		is positive,
		$${''}a = {${a}} ${qed}
	`;

	const ans = mathlify`
		${`a={${a}}`}.
	`;
	answer.addPart(ans, soln);
}

// b
{
	const coeff2a = castToPoly(exp1.coeffs[2]);
	const coeff2b = exp2.coeffs[2];
	const coeff2aVal = coeff2a.subIn(a);
	const coeff2 = coeff2aVal.plus(coeff2b);

	const soln = mathlify`
		When ${`a={${a}}`},
		~${'align*'}
		& \\text{Coefficient of } x^2 \\\\
		&= ${coeff2a.replaceXWith(`({${a}})`)} + ${coeff2b} \\\\
		&= ${coeff2aVal} + ${coeff2b} \\\\
		&= ${coeff2} ${qed}
	`;

	const ans = mathlify`
		${coeff2}.
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
