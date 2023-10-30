import { Polynomial, partialFractionsWorking, ExpressionProduct } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const den1 = new Polynomial([1, 0, 4]);
const den2 = new Polynomial([1, -2]);
const den = new ExpressionProduct(den1, den2);
const num = new Polynomial([7, 2]);
// const root1 = solveLinear(den1);
const {
	working: { start, substitutions, comparing },
	result,
} = partialFractionsWorking(num, [den1, den2]);

const soln = mathlify`
		~${'align*'}
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

const answer = new Answer(ans, soln);

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.polynomials,
		}),
	);
}
