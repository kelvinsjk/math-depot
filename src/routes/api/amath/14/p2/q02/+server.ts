import { Polynomial, factorizeCubicWorking, solveLinear } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const fx = new Polynomial([2, -3, -11, 6]);
const x = 2;
// const divisor = Polynomial.fromRoot(x);
const root = -2;
const factor = Polynomial.fromRoot(root);

// part a
{
	const soln = mathlify`
		By the Remainder Theorem,
		$${'align*'}
		& \\text{Remainder} \\\\
		&= f(${x}) \\\\
		&= ${fx.replaceXWith(`(${x})`)} \\\\
		&= ${fx.subIn(x)} ${qed}
	`;

	const ans = mathlify`
		${fx.subIn(x)}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const { working, exp, quadratic, factors } = factorizeCubicWorking(fx, root);
	const [x1, x2, x3] = factors.map((f) => {
		if (f) {
			return solveLinear(f);
		}
	});

	const soln = mathlify`
		$${'align*'}
		f({${root}}) &= ${fx.replaceXWith(`({${root}})`)} \\\\
		&= ${fx.subIn(root)}

		By the Factor Theorem, ${`${factor}`}
		is a factor of ${`f(x)`} ${qed}

		$${`${fx}`} = (${factor})(ax^2+bx+c)

		$${'align*'}
		${working}

		$${'align*'}
		${fx} &= 0 \\\\
		(${factor})(${quadratic}) &= 0 \\\\
		${exp} &= 0

		$${`x={${x1}}`} ${qed} ${or} ${`x=${x2}`} ${qed} ${or} ${`x=${x3}`} ${qed}

	`;
	const ans = mathlify`
		${`x={${x1}}`},
		${`x=${x2}`}
		or ${`x=${x3}`}.
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
