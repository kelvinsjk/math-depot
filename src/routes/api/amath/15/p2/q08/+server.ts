import {
	Polynomial,
	partialFractionsWorking,
	factorizeCubicWorking,
	solveLinear,
	factorizeQuadratic,
	factorizeQuadraticIntoPolynomials,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const den = new Polynomial([2, -3, 0, 1]);
let factor: Polynomial;
let root: number;
let otherFactors: Polynomial[];

// part a
{
	const poly = new Polynomial([2, -3, 0, -5]);
	const factor = new Polynomial([2, 1]);
	const x = solveLinear(factor);
	const soln = mathlify`
		Let ${`f(x)=${poly}`}

		By the Remainder Theorem,
		~${'align*'}
		& \\text{Remainder} \\\\
		& = f\\left({${x}}\\right) \\\\
		&= ${poly.replaceXWith(`\\left({${x}}\\right)`)} \\\\
		&= ${poly.subIn(x)} ${qed}
	`;

	const ans = mathlify`
		${poly.subIn(x)}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	root = 1;
	factor = Polynomial.fromRoot(root);
	const { working, exp, quadratic } = factorizeCubicWorking(den, root);
	const factors = factorizeQuadratic(quadratic);
	otherFactors = factorizeQuadraticIntoPolynomials(quadratic);

	const soln = mathlify`
		Let ${`g(x)=${den}`}

		Consider
		~${'align*'}
		g(${root}) &= ${den.replaceXWith(`(${root})`)} \\\\
		&= ${den.subIn(root)}

		By the Factor Theorem, ${factor}
		is a factor of ${den},

		$${den}=(${factor})(ax^2+bx+c)

		Comparing coefficients,		
		~${'align*'}
		${working}

		~${'align*'}
		& ${den} \\\\
		&= (${factor})(${quadratic}) \\\\
		&= (${factor})${factors} \\\\
		&= ${exp}
	`;
	const ans = mathlify`
		${exp}.
`;
	answer.addPart(ans, soln);
}

// part c
{
	const num = new Polynomial([4, -5, -8], { ascending: true });
	const {
		working: { start, substitutions, comparing },
		result,
	} = partialFractionsWorking(num, [factor, ...otherFactors]);

	const soln = mathlify`
		~${'gather*'}
		${start}

		When ${`x=${substitutions[0][0]}`}, 
		~${'align*'}
		${substitutions[0][1]}

		When ${`x=${substitutions[1][0]}`},
		~${'align*'}
		${substitutions[1][1]}

		Comparing coefficients,
		~${'alignat*{2}'}
		${comparing}

		$${``}\\frac{${num}}{${den}} = ${result} ${qed}
	`;
	const ans = mathlify`
		${result}.
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
