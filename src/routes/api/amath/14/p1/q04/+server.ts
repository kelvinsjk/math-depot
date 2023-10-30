import { ExpressionProduct, Polynomial, partialFractionsWorking } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const num = new Polynomial([1, 2]).square();
const den2 = new Polynomial([1, -2]);
const den = new ExpressionProduct(Polynomial.ofDegree(2), den2);
const {
	working: { start, substitutions, comparing },
	result,
} = partialFractionsWorking(num, [['x', 2], den2]);

const soln = mathlify`
	~${'gather*'}
	${start}

	When ${`x=${substitutions[0][0]}`}, 
	~${'align*'}
	${substitutions[0][1]}

	When ${`x=${substitutions[1][0]}`}, 
	~${'align*'}
	${substitutions[1][1]}

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
