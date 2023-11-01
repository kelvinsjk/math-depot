import { EquationWorking, Polynomial, BinomialGeneralTermWorking } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const binomWorking = new BinomialGeneralTermWorking(3, -2, 1, 1, 8, { aligned: true });

// part a
{
	const working = new EquationWorking(binomWorking.power);
	working.setAligned(true);
	const r = working.solveLinear();
	const soln = mathlify`
		~${'align*'}
		& \\text{General term} \\\\
		& ${binomWorking}

		For term independent of ${'x'},
		~${'align*'}
		${working}

		Since ${'r'}
		is not a non-negative integer, there is no term independent of ${'x'}.
		@${'@br'}
		Hence every term is dependent on ${'x'} ${qed}
	`;

	const ans = mathlify`
		${`r=${r}`}
		is not a non-negative integer.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const working = new EquationWorking(binomWorking.power, -1, { aligned: true });
	const r = working.solveLinear();
	const poly = new Polynomial([5, -2], { ascending: true });
	const sub = binomWorking.at(r);
	const final = sub.term.times(poly.terms[1]);

	const soln = mathlify`
		For the ${'x^{-1}'}
		term in ${binomWorking.binomial},
		~${'align*'}
		${working}

		~${'align*'}
		& ${binomWorking.binomial} (${poly}) \\\\
		& = \\left( ${sub.working} + \\dotsb \\right) (${poly}) \\\\
		& = \\left( ${sub.term} + \\dotsb \\right) (${poly}) \\\\
		& = ${final} + \\dotsb

		Hence the term independent of ${'x'}
		is ${final} ${qed}
	`;
	const ans = mathlify`
		${final}.
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
