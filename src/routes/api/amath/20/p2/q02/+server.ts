import {
	Polynomial,
	Fraction,
	EquationWorking,
	xPolynomial,
	InequalityWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
{
	const y1 = new Polynomial([2, 0, -7]);
	const y2 = new Polynomial([3, 20]);
	const working = new EquationWorking(y1, y2, { aligned: true });
	working.rhsZero();
	const [x1, x2] = working.factorizeQuadratic();
	const y1Ans = y1.subIn(x1);
	const y2Ans = y2.subIn(x2);

	const soln = mathlify`
	Equating the two,
	~${'align*'}
	${working}

	~${'alignat*{3}'}
	x &= {${x1}} ${qed} &\\text{or}&&    x &= ${x2} ${qed} \\\\
	y &= ${y2.replaceXWith(`({${x1}})`)} \\quad &&& \\quad  y &= ${y2.replaceXWith(
		`\\left(${x2}\\right)`,
	)} \\\\
	&= ${y1Ans} ${qed} &&& &= ${y2Ans} ${qed}
	`;

	const ans = mathlify`
	${`x={${x1}}, y=${y1Ans}`}
	or ${`x=${x2}, y=${y2Ans}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const poly = new xPolynomial(['a', 5, -2]);
	const d = poly.quadraticDiscriminant();
	const [c, b, a] = poly.coeffs;
	const working = new InequalityWorking(d, 0, { aligned: true });
	const root = working.solveLinear();
	const greatestA = root.floor();

	const soln = mathlify`
	For the quadratic to be negative for all ${'x'},
	~${'align*'}
	\\text{discriminant} &< 0 \\\\
	${b}^2 - 4${a}(${c}) &< 0 \\\\
	${working}

	Hence the greatest value of ${'a'}
	is ${greatestA} ${qed}
	`;

	const ans = mathlify`
		Greatest ${`a = {${greatestA}}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const y1 = new xPolynomial([4, 'c']);
	const y2 = new xPolynomial([1, 'c', new Fraction(21, 4)]);
	const working = new EquationWorking(y2, y1);
	working.rhsZero();
	const d = y2.minus(y1).quadraticDiscriminant();
	const [c, b, a] = y2.minus(y1).coeffs;
	const working2 = new EquationWorking(d, 0, { aligned: true });
	const [c1, c2] = working2.factorizeQuadratic();

	const soln = mathlify`
	Equating the two,
	~${'gather*'}
	${working}

	Since the line is a tangent to the curve,
	~${'align*'}
	\\text{discriminant} &= 0 \\\\
	(${b})^2 - 4(${a})\\left(${c}\\right) &= 0 \\\\
	${working2}

	$${''}
	c = {${c1}} ${qed} \\quad \\textrm{or} \\quad c = ${c2} ${qed}
	`;

	const ans = mathlify`
	${`c={${c1}}`}
	or ${`c=${c2}`}.
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
