import {
	EquationWorking,
	Term,
	BinomialGeneralTermWorking,
	castToPoly,
	solveLinear,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const binomWorking = new BinomialGeneralTermWorking('p', 3, 1, -1, 9, { aligned: true });

// part a
{
	const soln = mathlify`
		~${'align*'}
		& \\text{General term} \\\\
		& ${binomWorking}

		${'4r'}
		is even so ${binomWorking.power}
		is odd
		@${'@br'}
		Hence there are no even powers of ${'x'} ${qed}
	`;

	const ans = mathlify`
	${'4r'}
	is even so ${binomWorking.power}
	is odd.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const n1 = 11;
	const working = new EquationWorking(binomWorking.power, n1, { aligned: true });
	const r1 = working.solveLinear();
	const n2 = 7;
	const working2 = new EquationWorking(binomWorking.power, n2, { aligned: true });
	const r2 = working2.solveLinear();
	const t1 = binomWorking.at(r1);
	const t2 = binomWorking.at(r2);
	const workingP = new EquationWorking(t1.coeff, t2.coeff.times(2), { aligned: true });
	workingP.rhsZero();
	const p = solveLinear(castToPoly(workingP.lhs.divide(126).divide(new Term(['p', 4]))));

	const soln = mathlify`
		For the ${`x^{${n1}}`}
		term
		~${'align*'}
		${working}
		
		For the ${`x^{${n2}}`}
		term
		~${'align*'}
		${working2}

		Since the coefficient of ${`x^{${n1}}`}
		is twice the coefficient of ${`x^{${n2}}`},
		~${'align*'}
		${t1.coeffWorking} &= 2  ${t2.coeffWorking} \\\\
		${workingP} \\\\
		p^4 (p - 2) &= 0

		Since ${'p \\neq 0'}
		$${`p = ${p}`} ${qed}
	`;
	const ans = mathlify`
	${`p = ${p}`}.
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
