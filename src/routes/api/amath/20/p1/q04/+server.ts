import { InequalityWorking, Polynomial, quotientRuleWorking } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { dydx } from '$lib/utils/calculus';

const answer = new Answer();

const num = new Polynomial([2, -3]);
const den = new Polynomial([1, 0, 4]);

const qWorking = quotientRuleWorking(num, { den, aligned: true });
const working = new InequalityWorking(qWorking.dydx, 0, { sign: '>' });
working.setAligned();
working.crossMultiply();
working.divide(-2);
const [interval] = working.factorizeQuadratic();

{
	const soln = mathlify`
		$${'align*'}
		y &= ${qWorking.y} \\\\
		${dydx()} &= ${qWorking.working} \\\\
		&= ${qWorking.dydx}

		When ${'y'}
		is increasing,
		$${'align*'}
		${dydx()} &> 0 \\\\
		${working}

		$${interval} ${qed}
	`;
	const ans = mathlify`
		${interval}.
	`;
	answer.addBody(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.diff1,
		}),
	);
}
