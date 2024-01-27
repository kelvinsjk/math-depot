import {
	EquationWorking,
	xPolynomial,
	binomialExpansionWorking,
	expansionWorking,
	Term,
	type Fraction,
	type Polynomial,
	castToPoly,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();
let p1: Fraction, p2: Fraction;
let coeff3: Polynomial;

{
	const poly = new xPolynomial([1, new Term(-1, 'p')], { ascending: true });
	const n = 6;
	const working = binomialExpansionWorking(poly, n, 4);
	const exp = poly.pow(6).slice(4);
	coeff3 = castToPoly(exp.coeffs[3]);
	const poly2a = new xPolynomial([1, -2], { ascending: true });
	const poly2 = poly2a.square();
	const working2 = expansionWorking(poly2, exp).filter(3, 6, 7, 9, 10, 11);
	const finalExp = poly2.times(exp).slice(3);
	const coeff = 16;
	const pow = 2;
	const pWorking = new EquationWorking(finalExp.coeffs[pow], coeff, { aligned: true });
	pWorking.rhsZero();
	pWorking.divide(3);
	[p1, p2] = pWorking.factorizeQuadratic();
	//const a = aWorking.solveLinear();
	const soln = mathlify`
		$${'align*'}
		& \\left( ${poly} \\right)^${n} \\\\
		& = ${working} \\\\
		& = ${exp} + \\dotsb

		$${'align*'}
		& (${poly2a})^2 \\left( ${poly} \\right)^${n} \\\\
		&= (${poly2}) \\left(${exp} + \\dotsb \\right) \\\\
		&= ${working2} + \\dotsb \\\\
		&= ${finalExp} + \\dotsb 

		Comparing coefficients of ${`x^{${pow}}`},
		$${'align*'}
		${pWorking}

		$${`p={${p1}}`} ${or} p=${p2} ${qed}
	`;

	const ans = mathlify`
		${`p={${p1}}`}
		or
		${`p={${p2}}`}.
	`;
	answer.addPart(ans, soln);
}

// b
{
	const c31 = coeff3.subIn(p1);
	const c32 = coeff3.subIn(p2);
	const soln = mathlify`
		When ${`p={${p1}}`},
		$${'align*'}
		& \\text{Coefficient of } x^3 \\\\
		&= ${coeff3.replaceXWith(`({${p1}})`)} \\\\
		&= ${c31} ${qed}
		
		When ${`p={${p2}}`},
		$${'align*'}
		& \\text{Coefficient of } x^3 \\\\
		&= ${coeff3.replaceXWith(`({${p2}})`)} \\\\
		&= {${c32}} ${qed}
	`;

	const ans = mathlify`
		When ${`p={${p1}}`},
		coefficient of ${'x^3'} = ${c31}.

		When ${`p=${p2}`},
		coefficient of ${'x^3'} = ${c32}.
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
