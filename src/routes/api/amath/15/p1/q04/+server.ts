import {
	EquationWorking,
	xPolynomial,
	Polynomial,
	Term,
	completeSquare,
	InequalityWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { Topics } from '../../../topics';
import { or, qed } from '$lib/typesetting';
const answer = new Answer();

const a = 'a',
	b = 6,
	c = 'c';
const y = new xPolynomial([a, b, c]);
let rhs: Expression;

// part a
{
	console.log(`${y}`);
	const d = y.quadraticDiscriminant();
	console.log(`${d}`);
	const working = new InequalityWorking(d, 0, { sign: '<', aligned: true });
	working.moveTerm(1, { hide: true });
	working.swap();

	let soln = mathlify`
		For ${y}
		to be always negative,
		~${'equation'}
		a < 0

		and

		~${'align*'}
		\\textrm{ discriminant } &< 0 \\\\
		${working}
	`;

	working.divide(4);
	working.clear();
	working.setAligned(false);
	rhs = working.rhs;

	soln += mathlify`
		~${'equation'}
		${working}

		Hence ${'a < 0'} ${qed}
		and ${working} ${qed}
	`;

	const ans = mathlify`
		${'a < 0'}
		and ${working}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const a = -2,
		c = -5;
	const soln = mathlify`
		For example, let ${`a={${a}} < 0`}

		If ${`c={${c}}`},
		then ${`ac = ${a * c} > ${rhs}`}

		Hence ${`a={${a}}`}${qed}
		and ${`c={${c}}`}${qed}
		is an example that satisfy the condition in (a)
	`;

	const ans = mathlify`
		${`a={${a}}`}
		and ${`c={${c}}`}.
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
