import { Polynomial, longDivide, partialFractionsWorking, Expression } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const num = new Polynomial([2, 4, -31]);
const den = new Polynomial([1, 1, -6]);
const { exp, quotient, remainder } = longDivide(num, den);
const {
	working: { start, substitutions },
	result,
} = partialFractionsWorking(remainder, den);

const final = new Expression(quotient.cast.toFraction()).plus(result);

const soln = mathlify`
By long division,
$${`\\frac{${num}}{${den}} = ${exp}`}

$${'gather*'}
${start}

When ${`x=${substitutions[0][0]}`}, 
$${'align*'}
${substitutions[0][1]}

When ${`x=${substitutions[1][0]}`},
$${'align*'}
${substitutions[1][1]}

$${``}\\frac{${num}}{${den}} = ${final} ${qed}
`;
const ans = mathlify`
${final}.
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
