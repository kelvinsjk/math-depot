import { Polynomial, discriminant, factorizeCubicWorking, solveLinear } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();
const px = new Polynomial([2, 5, 0, -18]);
const factor = new Polynomial([2, -3]);
const root = solveLinear(factor);

// part a
{
	const divisor = new Polynomial([1, 2]);
	const x = solveLinear(divisor);
	const soln = mathlify`
		By the Remainder Theorem,
		~${'align*'}
		& \\text{Remainder} \\\\
		&= p({${x}}) \\\\
		&= ${px.replaceXWith(`({${x}})`)} \\\\
		&= ${px.subIn(x)} ${qed}
	`;

	const ans = mathlify`
		${px.subIn(x)}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const soln = mathlify`
		~${'align*'}
		p\\left(${root}\\right) &= ${px.replaceXWith(`\\left({${root}}\\right)`)} \\\\
		&= ${px.subIn(root)}

		By the Factor Theorem, ${factor}
		is a factor of ${'p(x)'} ${qed}
	`;

	const ans = mathlify`
		${`p\\left(${root}\\right)`} = ${px.subIn(root)}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const { working, quadratic, exp } = factorizeCubicWorking(px, factor);
	const [c, b, a] = quadratic.coeffs;
	const d = discriminant(quadratic);
	const soln = mathlify`
		$${`${px}`} = (${factor})(ax^2+bx+c)

		Comparing coefficients,
		~${'align*'}
		${working}

		~${'gather*'}
		${px} = 0 \\\\
		${exp} = 0 \\\\
		x=${root} ${or} \\quad ${quadratic} = 0 \\\\

		For ${quadratic},
		~${'align*'}
		& \\text{Discriminant} \\\\
		&= ${b}^2 - 4(${a})(${c}) \\\\
		&= ${d} < 0

		Hence there are no real roots for ${quadratic} = 0
		@${'@br'}
		Hence the equation ${'p(x)=0'}
		has only one real root ${qed}
	`;
	const ans = mathlify`
		Discriminant ${`< 0`}.
	`;
	answer.addPart(ans, soln);
}

// part d
{
	const y = Math.log(root.valueOf()) / Math.log(2);
	const soln = mathlify`
		~${'align*'}
		2^{3y} \\cdot 2^1 + 5 \\left( 2^{2y} \\right) &= 18 \\\\
		2 \\left( 2^{y} \\right)^3 + 5 \\left( 2^{y} \\right)^2 - 18 &= 0

		Replacing ${'2^y'}
		with ${'x'},
		$${px} = 0

		From parts (ii) and (iii),
		~${'align*'}
		x &= ${root} \\\\
		2^y &= ${root} \\\\
		\\ln 2^y &= \\ln ${root} \\\\
		y \\ln 2 &= \\ln ${root} \\\\
		y &= \\frac{\\ln ${root}}{\\ln 2} \\\\
		&= ${y.toPrecision(3)} ${qed}
	`;

	const ans = mathlify`
		${'y='} ${y.toPrecision(3)}.
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
