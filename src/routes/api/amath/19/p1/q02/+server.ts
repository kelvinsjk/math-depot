import {
	Polynomial,
	EquationWorking,
	xPolynomial,
	InequalityWorking,
	Expression,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const b = new Expression([2, 'k'], 1);
const poly1 = new xPolynomial([1, b, 1]);
const poly2 = Polynomial.ofDegree(1);
const working = new EquationWorking(poly1, poly2, { aligned: true });
working.rhsZero();

const poly = poly1.minus(poly2);
const d = poly.quadraticDiscriminant();
const working2 = new InequalityWorking(d, 0, { sign: '<' });
working2.divide(4);
const roots = working2.factorizeQuadratic();

const soln = mathlify`
Equating the two,
$${'align*'}
${working}

For the curve to be entirely above the line,
$${'gather*'}
\\text{discriminant} < 0 \\\\
${working2} \\\\
${roots} ${qed}
`;

const ans = mathlify`
	${roots}.
`;

const answer = new Answer(ans, soln);

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.quadratics,
		}),
	);
}
