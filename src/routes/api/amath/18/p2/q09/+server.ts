import {
	Polynomial,
	EquationWorking,
	xPolynomial,
	discriminant,
	factorizeQuadratic,
	solveQuadratic,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const y = new xPolynomial([2, ['k', 2], 'k']);

// part a
{
	const k = 5;
	const curve = y.subIntoCoeffs({ k });
	const line = new Polynomial([19, -13]);

	const working = new EquationWorking(curve, line);
	working.rhsZero();
	working.divide(2);
	const lhs = working.lhs as Polynomial;
	const [c, b, a] = lhs.coeffs;
	const d = discriminant(lhs);

	let soln = mathlify`
		Equating the curve and the line,
		$${'gather*'}
		${working}

		$${'align*'}
		& \\text{discriminant} \\\\
		&= ({${b}})^2 - 4(${a})(${c}) \\\\
		&= ${d}

		Hence the line is a tangent to the curve ${qed}
	`;

	working.clear();
	const [x0] = working.factorizeQuadratic();
	const y0 = line.subIn(x0);

	soln += mathlify`
		$${'gather*'}
		${working} \\\\
		x = ${x0}

		Substituting ${`x=${x0}`}
		into the equation of the line,
		$${'align*'}
		y &= ${line.replaceXWith(`(${x0})`)} \\\\
		&= ${y0}

		Hence the coordinates of of the point of contact are
		${`\\left( ${x0}, ${y0} \\right) ${qed}`}
	`;

	const ans = mathlify`
		${`\\left( ${x0}, ${y0} \\right)`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const [c, b, a] = y.coeffs;
	const d = y.quadraticDiscriminant();
	const dFactorized = factorizeQuadratic(d);
	const [k] = solveQuadratic(d);

	const soln = mathlify`
		$${'align*'}
		& \\text{discriminant} \\\\
		&= ({${b}})^2 - 4(${a})(${c}) \\\\
		&= ${b.square()} - ${a.times(c).times(4)} \\\\
		&= ${d} \\\\
		&= ${dFactorized}

		If ${`k \\neq ${k}`},
		then the discriminant will be ${'> 0'}.
		This means that the curve will cut the
		${'x'}\\textrm{-axis}
		at two distinct points
		and there will be some
		${'y'}
		values that are negative.

		If ${`k = ${k} ${qed},`}
		then discriminant is ${'0'}
		so the ${'x'}\\textrm{-axis}
		will be a tangent to the curve. 
		Hence ${'y'}
		cannot be negative and this is the only value
		of ${'k'}
		that satisfies the condition ${qed}
	`;

	const ans = mathlify`
		${`k=${k}`}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.quadratics,
		}),
	);
}
