import {
	Polynomial,
	EquationWorking,
	xPolynomial,
	InequalityWorking,
	discriminant,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const y = new xPolynomial(['a', 5, ['a', -5]]);
const line = new Polynomial([1, -2]);

// part a
{
	const a = 2;
	const y2 = 9;
	const y1 = y.subIntoCoeffs({ a });
	const working = new InequalityWorking(y1, y2, { sign: '>' });
	working.rhsZero();
	const roots = working.factorizeQuadratic();

	const soln = mathlify`
	When ${`a=${a}`},
	$${`y=${y1}`}

	When the curve lies completely above the line,
	$${'gather*'}
	${working} \\\\
	${roots[0]} ${qed} ${or} ${roots[1]} ${qed}
	`;

	const ans = mathlify`
		${roots[0]}
		or ${roots[1]}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const a = 4;
	const y1 = y.subIntoCoeffs({ a }) as Polynomial;
	const lhs = y1.minus(line);
	const [c1, b1, a1] = lhs.coeffs;
	const d = discriminant(lhs);

	const soln = mathlify`
		When ${`a=${a}`},
		$${`y=${y1}`}.

		Equating the curve and the line,
		$${'gather*'}
		${y1} = ${line} \\\\
		${lhs} = 0

		$${'align*'}
		& \\text{discriminant} \\\\
		& = ${b1}^2 - 4(${a1})(${c1}) \\\\
		&= ${d}

		Hence the line is a tangent to the curve ${qed}
	`;

	const ans = mathlify`
		${'b^2 - 4ac = 0'}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const working = new EquationWorking(y, line);
	working.rhsZero();

	const eqn = y.minus(line);
	const [c, b, a] = eqn.coeffs;
	const d = eqn.quadraticDiscriminant();
	const working2 = new EquationWorking(d, 0, { aligned: true });
	working2.divide(-4, { hide: true });
	working2.changeAscending(false);
	const [a1, a2] = working2.factorizeQuadratic();

	const soln = mathlify`
		Equating the curve and the line for a general value of ${'a'},
		$${'gather*'}
		${working}

		If the line is a tangent to the curve,
		$${'align*'}
		\\text{discriminant} &= 0 \\\\
		(${b})^2 - 4${a}\\left(${c}\\right) &= 0 \\\\
		${working2}

		$${`a={${a1}}`} ${or} ${`a=${a2}`}

		Hence the other value of
		${`a={${a1}}`} ${qed}

	`;

	const ans = mathlify`
		Other value of
		${`a={${a1}}`}.
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
