import { InequalityWorking, Polynomial } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
// import { dydx } from '$lib/utils/calculus';

const answer = new Answer();

const poly1 = Polynomial.ofDegree(2);
const poly2 = new Polynomial([1, -1], { ascending: true });
const f = poly2.times(poly1);
const fPrime = f.differentiate();
const working = new InequalityWorking(fPrime, 0, { sign: '\\geq' });
working.setAligned();
working.times(-1, { hide: true });
working.changeAscending();
const [interval] = working.factorizeQuadratic();

{
	const soln = mathlify`
		$${'align*'}
		f(x) &= ${poly1} (${poly2}) \\\\
		&= ${f} \\\\
		f'(x) &= ${fPrime}

		For ${'f'}
		to be increasing increasing,
		$${'align*'}
		f'(x) &> 0 \\\\
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
