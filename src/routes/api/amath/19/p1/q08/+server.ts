import {
	type Fraction,
	Polynomial,
	dydx,
	d2ydx2,
	GeneralFn,
	RationalFn,
	quotientRuleWorking,
	EquationWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const x = new Polynomial('x');
const num = new Polynomial([2, 5]);
const den = new Polynomial([1, -2]);
const t2 = new RationalFn(num, den);
const y = new GeneralFn(x, t2);

const dy = y.differentiateToFn();
const dTwo = dy.differentiateToFn();

{
	const { working } = quotientRuleWorking(t2, { aligned: true, step2Preamble: '1 +' });
	const soln = mathlify`
		$${'align*'}
		y &= ${y} \\\\
		${dydx()} &= ${x.differentiate()} + ${working} \\\\
			&= ${dy} ${qed} \\\\
			&= 1 - 9(x-2)^{-2} \\\\
		${d2ydx2()} &= {-9}({-2})(x-2)^{-3} \\\\
			&= ${dTwo} ${qed}
	`;
	const ans = mathlify`
		${dydx()} = ${dy}.
		--newline--
		${d2ydx2()} = ${dTwo}.
	`;
	answer.addPart(ans, soln);
}

let x1: Fraction, x2: Fraction;
{
	const working = new EquationWorking(dy);
	// working around: we move the constant and not the rational-fn
	working.moveTerm(0, { hide: true });
	working.times(-1);
	working.crossMultiply();
	working.swap({ hide: true });
	working.rhsZero();
	[x1, x2] = working.factorizeQuadratic();
	const soln = mathlify`
		At stationary points, 
		$${'gather*'}
		${dydx()} = 0 \\\\
		${working} \\\\
		x = ${x1} ${qed} ${or} x = ${x2} ${qed}
	`;
	const ans = mathlify`
		${`x=${x1}`},
		${`x=${x2}`}.
	`;
	answer.addPart(ans, soln);
}

{
	const dTwo = t2.differentiate().differentiate();
	const dTwo1 = dTwo.subInFraction(x1);
	const dTwo2 = dTwo.subInFraction(x2);
	const sign1 = dTwo1.is.negative() ? '<' : '>';
	const sign2 = dTwo2.is.negative() ? '<' : '>';
	const max1 = dTwo1.is.negative() ? 'maximum' : 'minimum';
	const max2 = dTwo2.is.negative() ? 'maximum' : 'minimum';
	const maxCaps = {
		maximum: 'Maximum',
		minimum: 'Minimum',
	};
	const soln = mathlify`
		When ${`x=${x1}`},
		$${'align*'}
		${d2ydx2()} &= ${dTwo.replaceXWith(`({${x1}})`)} \\\\
			&= ${dTwo1} \\\\
			&${sign1} 0
		
		Hence ${`x=${x1}`}
		corresponds to a #${max1} point ${qed}

		When ${`x=${x2}`},
		$${'align*'}
		${d2ydx2()} &= ${dTwo.replaceXWith(`({${x2}})`)} \\\\
			&= ${dTwo2} \\\\
			&${sign2} 0

		Hence ${`x=${x2}`}
		corresponds to a #${max2} point ${qed}
	`;
	const ans = mathlify`
		#${maxCaps[max1]} point at ${`x=${x1}`}.
		--newline--
		#${maxCaps[max2]} point at ${`x=${x2}`}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.diffApp,
		}),
	);
}
