import { EquationWorking, xPolynomial, Polynomial, Term, completeSquare } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const b = new Term(-1, 'k');
const y = new xPolynomial([2, b, -4]);
const line = new Polynomial([-2, 12]);

// part a
{
	const k = 6;
	const working = new EquationWorking(y.subIntoCoeffs({ k }), line, { aligned: true });
	working.rhsZero();
	working.divide(2);
	const [x1, x2] = working.factorizeQuadratic();
	const y1 = line.subIn(x1);
	const y2 = line.subIn(x2);

	const soln = mathlify`
		Substituting ${`k=${k}`}
		and equating the equations of the curve and the line,
		$${'align*'}
		${working}

		$${`alignat*{3}`}
		x &= {${x1}} & ${or} && x &= ${x2} \\\\
		y &= ${line.replaceXWith(`({${x1}})`)} \\quad &&& \\quad y &= ${line.replaceXWith(
			`(${x2})`,
		)} \\\\
		&= ${y1} &&& &= ${y2}

		Hence the coordinates of the points of intersection are
		${`\\left( {${x1}}, ${y1} \\right) ${qed}`}
		and ${`\\left( {${x2}}, ${y2} \\right) ${qed}`}
	`;

	const ans = mathlify`
		${`\\left( {${x1}}, ${y1} \\right)`}
		and ${`\\left( {${x2}}, ${y2} \\right)`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const working = new EquationWorking(y, line);
	working.rhsZero();
	const poly = working.lhs as xPolynomial;
	const [c, b, a] = poly.coeffs;
	const d = poly.quadraticDiscriminant();
	const completedSquare = completeSquare(d);
	const perfectSquare = completedSquare.terms[0];

	const soln = mathlify`
		For general values of ${'k'},
		equating the equations of the curve and the line,

		$${'gather*'}
		${working}

		$${'align*'}
		& \\text{discriminant} \\\\
		& = ({${b}})^2 - 4(${a})(${c}) \\\\
		& = ${d} \\\\
		&= ${completedSquare}

		${perfectSquare} \\geq 0
		for all ${'k \\in \\mathbb{R}'}.
		Hence the discriminant ${completedSquare} > 0
		for all real values of ${'k'}
		so the line intersects the curve at two distinct points ${qed}
	`;

	const ans = mathlify`
		${'b^2 - 4ac'}
		${'='}${completedSquare} > 0.
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
