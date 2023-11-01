import {
	EquationWorking,
	binomialExpansionWorking,
	BinomialGeneralTermWorking,
	Fraction,
	Polynomial,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
{
	const poly = new Polynomial([1, 1], { ascending: true });
	const n = 9;
	const working = binomialExpansionWorking(poly, n, 4);
	const exp = poly.pow(n).slice(4);
	const soln = mathlify`
		~${'align*'}
		& \\left( ${poly} \\right)^${n} \\\\
		& = ${working} \\\\
		&= ${exp} + \\dotsb
	`;
	const ans = mathlify`
		${exp}
		${' + \\dotsb'}
	`;
	answer.addSubPart(ans, soln);

	// a ii
	{
		const newP = new Polynomial([0, 1, -1], { ascending: true, variable: 'z' });
		const finalExp = exp.replaceXWith(newP).slice(4);
		const x3Coeff = finalExp.coeffs[3];
		const soln = mathlify`
			~${'align*'}
			& \\left( ${poly.replaceXWith(newP)} \\right)^${n} \\\\
			& = ${exp.replaceXWith(`(${newP})`)} + \\dotsb \\\\
			& = 1 + 9z - 9z^2 + 36(${newP
				.square()
				.slice(4)} + \\dotsb) + 84 (z^3 + \\dotsb) + \\dotsb \\\\
			& = ${finalExp} + \\dotsb

			Hence the coefficient of ${'z^3'}
			if ${x3Coeff} ${qed}
		`;
		const ans = mathlify`
		${x3Coeff}.
	`;
		answer.addSubPart(ans, soln);
	}
}

// b
answer.newPart();

// b i
const binomWorking = new BinomialGeneralTermWorking(2, 1, new Fraction(1, 3), -3, 10, {
	aligned: true,
});
{
	const soln = mathlify`
		~${'align*'}
		& \\text{General term} \\\\
		& ${binomWorking} ${qed}
	`;

	const ans = mathlify`
		${binomWorking.generalTerm}.
	`;
	answer.addSubPart(ans, soln);
}

{
	const soln = mathlify`
		~${'align*'}
		& \\text{Power of } x \\text{ in this general term} \\\\
		&= ${binomWorking.power} ${qed}
	`;

	const ans = mathlify`
	${binomWorking.power}.
	`;
	answer.addSubPart(ans, soln);
}
// b iii
{
	const working = new EquationWorking(binomWorking.power, 2);
	working.setAligned(true);
	const r = working.solveLinear();
	const x2Term = binomWorking.at(r);
	const soln = mathlify`
		For term in ${'x^2'},
		~${'align*'}
		${working}

		~${'align*'}
		& \\text{Coefficient of } x^2 \\\\
		&= ${x2Term.coeffWorking} \\\\
		&= ${x2Term.coeff} ${qed}
	`;

	const ans = mathlify`
	${x2Term.coeff}.
	`;
	answer.addSubPart(ans, soln);
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
