import {
	EquationWorking,
	Expression,
	Polynomial,
	type Fraction,
	factorizeCubicWorking,
	solveLinear,
	xPolynomial,
	discriminant,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const fx = new xPolynomial([1, 0, 'a', 'b']);
let a: Fraction, b: Fraction;
const factor = new Polynomial([1, 3]);
const root = solveLinear(factor);

// part a
{
	const divisor = new Polynomial([1, -4]);
	const x1 = solveLinear(divisor);
	const remainder = 56;
	const eqn1LHS = new Expression([-3, 'a'], 'b');
	const eqn2LHS = new Expression([4, 'a'], 'b');
	const working1 = new EquationWorking(eqn2LHS.minus(eqn1LHS), remainder - 64 - 27);
	a = working1.solveLinear();
	const working2 = new EquationWorking(eqn1LHS.subIn({ a }), 27);
	b = working2.solveLinear();

	const soln = mathlify`
		By the Factor Theorem,
		~${'align'}
		f({${root}}) &= 0 \\notag \\\\
		${fx.replaceXWith(`({${root}})`)} &= 0 \\notag \\\\
		${fx.subIn({ x: root })} &= 0 \\notag \\\\
		-3a + b &= 27

		By the Remainder Theorem,
		~${'align'}
		f({${x1}}) &= ${remainder} \\notag \\\\
		${fx.replaceXWith(`({${x1}})`)} &= ${remainder} \\notag \\\\
		${fx.subIn({ x: x1 })} &= ${remainder} \\notag \\\\
		4a + b &= ${remainder - 64}

		Considering ${`(2) - (1)`},
		~${'align*'}
		${working1} ${qed}

		Substituting ${`a=${a}`}
		into ${`(1)`},
		~${'align*'}
		${working2} ${qed}
	`;

	const ans = mathlify`
		${`a={${a}}`},
		${`b={${b}}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const poly = fx.subIntoCoeffs({ a, b }) as Polynomial;
	const { working, quadratic, exp } = factorizeCubicWorking(poly, factor);
	const [c1, b1, a1] = quadratic.coeffs;
	const d = discriminant(quadratic);
	const soln = mathlify`
		$${`${poly}`} = (${factor})(ax^2+bx+c)

		Comparing coefficients,
		~${'align*'}
		${working}

		~${'align*'}
		${poly} &= 0 \\\\
		${exp} &= 0

		$${''} x=${root} ${or} ${quadratic} = 0

		For ${quadratic},
		~${'align*'}
		& \\text{Discriminant} \\\\
		&= ({${b1}})^2 - 4({${a1}})({${c1}}) \\\\
		&= ${d} < 0

		Hence ${quadratic}
		has no real roots.
		@${'@br'}
		Therefore ${poly}
		has 1 real root, ${`x={${root}}`} ${qed}

	`;
	const ans = mathlify`
		1 real root.
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
