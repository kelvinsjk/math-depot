import {
	EquationWorking,
	Polynomial,
	factorizeCubicWorking,
	solveQuadraticSurd,
	xPolynomial,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

// part a
{
	const fx = new xPolynomial([1, 0, 'a', 0]);
	const x1 = 2;
	const x2 = -1;
	const working = new EquationWorking(fx.subIn({ x: x1 }), fx.subIn({ x: x2 }), {
		aligned: true,
	});
	const a = working.solveLinear();
	const soln = mathlify`
		By the Remainder Theorem,
		$${'align*'}
		f(${x1}) &= f({${x2}}) \\\\
		${working} ${qed}
	`;

	const ans = mathlify`
		${`a={${a}}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const fx = new Polynomial([1, -2, -4, 3]);
	const x = 3;
	const factor = Polynomial.fromRoot(x);
	const { working, quadratic, exp } = factorizeCubicWorking(fx, factor);
	const [c, b, a] = quadratic.coeffs;
	const [x2, x3] = solveQuadraticSurd(quadratic);
	const soln = mathlify`
		Consider ${`x=${x}`}
		$${'align*'}
		f(${x}) &= ${fx.replaceXWith(`(${x})`)} \\\\
		&= ${fx.subIn(x)}

		Hence by the Factor Theorem, ${factor}
		is a factor of ${fx}.
		$${`${fx}`} = (${factor})(ax^2+bx+c)

		Comparing coefficients,
		$${'align*'}
		${working}

		$${'align*'}
		${fx} &= 0 \\\\
		${exp} &= 0

		$${'alignat*{3}'}
		x&=${x} ${qed} & \\quad &${or} \\quad && ${quadratic} = 0 \\\\
		&&&&& \\begin{aligned}
			x &= \\frac{-${b} \\pm \\sqrt{${b}^2-4(${a})(${c})}}{2(${a})} \\\\
			&= ${x2} ${qed} ${or} ${x3} ${qed}
			\\end{aligned}
	`;
	const ans = mathlify`
		${`x=${x}`},
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
