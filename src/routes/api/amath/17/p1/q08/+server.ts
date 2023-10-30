// part a

import { Polynomial, partialFractionsWorking, longDivide } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const den = new Polynomial([3, -1, 27, -9]);
const divisor = new Polynomial([3, -1]);
const num = new Polynomial([6, 11, -5], { ascending: true });
const { quotient, remainder } = longDivide(den, divisor);
console.assert(remainder.is.equalTo(0), 'remainder is not 0');

// part a
{
	const soln = mathlify`
		By long division,

		$${`\\frac{${den}}{${divisor}} = ${quotient}`} ${qed}
	`;

	const ans = mathlify`
		${`\\frac{${den}}{${divisor}}`}
		${'='} ${quotient}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const {
		working: { start, substitutions, comparing },
		result,
	} = partialFractionsWorking(num, [divisor, quotient]);

	const soln = mathlify`
		~${'gather*'}
		${start}

		When ${`x=${substitutions[0][0]}`}, 
		~${'align*'}
		${substitutions[0][1]}

		Comparing coefficients,
		~${'alignat*{2}'}
		${comparing}

		$${``}\\frac{${num}}{${den}} = ${result} ${qed}
	`;
	const ans = mathlify`
		${result}.
`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.polynomials,
		}),
	);
}
