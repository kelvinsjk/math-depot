import { Polynomial, xPolynomial } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { dydx } from '$lib/utils/calculus';

const answer = new Answer();

const y = new xPolynomial([1, 'p', 'q', 10]);
const lower = 3;
const upper = 7;

const dy = y.differentiate();
const p1 = Polynomial.fromRoot(lower);
const p2 = Polynomial.fromRoot(upper);
const poly = p1.times(p2).times(3);
const [c, b] = poly.coeffs;
const p = b.divide(2);
const q = c;

{
	const soln = mathlify`
		$${'align*'}
		y &= ${y} \\\\
		${dydx()} &= ${dy}

		When ${'y'}
		is a decreasing function,
		$${'gather*'}
		${dydx()} < 0 \\\\
		${dy} < 0
		
		Since this happens when ${lower} < x < ${upper},
		$${'align*'}
		${dy} &= 3 (${p1})(${p2}) \\\\
		&= ${poly}

		Comparing coefficients,
		$${'alignat*{2}'}
		&x: \\quad & 2p &= {${b}} \\\\
		&& p &= {${p}} ${qed} \\\\
		&x^0: \\quad & q &= ${q} ${qed} 
	`;
	const ans = mathlify`
		${`p={${p}}`},
		${`q=${q}`}.
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
