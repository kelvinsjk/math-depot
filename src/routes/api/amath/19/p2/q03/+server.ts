import { Polynomial, partialFractionsWorking, factorizeCubicWorking } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const den = new Polynomial([1, 1, -1, -1]);
const root = 1;
const factor = Polynomial.fromRoot(root);

// part a
{
	const soln = mathlify`
		Let ${`f(x)=${den}`}

		~${'align*'}
		f(${root}) &= ${den.replaceXWith(`${root}`)} \\\\
		&= ${den.subIn(root)}

		Hence ${`x=${root}`}
		is a root of ${`f(x)=0`}
		@${`@br`}
		By the Factor Theorem, ${`${factor}`}
		is a factor of ${`${den}`} ${qed}
	`;

	const ans = mathlify`
		${`f(${root}) = 0`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const num = 4;
	const { working, exp, quadratic } = factorizeCubicWorking(den, root);
	const {
		working: { start, substitutions, comparing },
		result,
	} = partialFractionsWorking(num, exp);

	const soln = mathlify`
		Since ${factor}
		is a factor of ${den},

		$${den}=(${factor})(ax^2+bx+c)

		Comparing coefficients,		
		~${'align*'}
		${working}

		~${'align*'}
		& ${den} \\\\
		&= (${factor})(${quadratic}) \\\\
		&= ${exp}

		~${'align*'}
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
