import { Fraction, Polynomial, dydx } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// A = 6x^2
const x = 10;
const A = new Polynomial([6, 0, 0]);
const dAdx = A.differentiate();
const dAdxVal = dAdx.subIn(x);
const dAdt = -48;
// dAdt = dAdx * dxdt
const dxdt = new Fraction(dAdt).divide(dAdxVal);

const dAdtString = dydx({ y: 'A', x: 't' });
const dxdtString = dydx({ y: 'x', x: 't' });
const dAdxString = dydx({ y: 'A', x: 'x' });

{
	const soln = mathlify`
		$${'align*'}
		A &= ${A} \\\\
		${dAdxString} &= ${dAdx}

		$${`${dAdtString} = ${dAdxString} \\times ${dxdtString}`}

		When ${`x=${x}`},
		$${'align*'}
		${dAdt} &= ${dAdx.replaceXWith(`(${x})`)} \\times ${dxdtString} \\\\
		${dxdtString} &= \\frac{${dAdt}}{${dAdxVal}} \\\\
		&= ${dxdt} \\textrm{ cm/s} ${qed}

	`;
	const ans = mathlify`
		${dxdt} \\textrm{ cm/s.}
	`;
	answer.addBody(ans, soln);
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
