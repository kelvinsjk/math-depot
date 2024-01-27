import {
	Expression,
	SquareRoot,
	ExpressionWorking,
	RationalTerm,
	Polynomial,
	EquationWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

{
	// part a
	const root6 = new SquareRoot(6);
	const root5 = new SquareRoot(5);
	const root15 = new SquareRoot(15);
	const root2 = new SquareRoot(2);
	const num = new Expression(root6, root5);
	const den = new Expression(root15, root2.negative());

	const frac = new RationalTerm(num, den);
	const working = new ExpressionWorking(frac, { aligned: true });
	working.rationalize();

	const soln = mathlify`
		$${'align*'}
		${working} ${qed}
	`;
	const ans = mathlify`
		${working.exp}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const c = 21;
	const pow = 2;
	const base = 2;
	const sub = `${base}^x`;
	const lhs = Polynomial.ofDegree(2, { variable: 'u' });
	const rhs = new Polynomial([base ** pow, c], { variable: 'u' });
	const eqn = lhs.minus(rhs);
	const working = new EquationWorking(eqn);
	const [u1, u2] = working.factorizeQuadratic();
	const x = Math.log(u2.valueOf()) / Math.log(base);

	const soln = mathlify`
		$${'gather*'}	
		${base}^{2x} = ${base}^${pow} \\cdot ${base}^x + ${c} \\\\
		${lhs.minus(rhs).replaceXWith(`(${sub})`)} = 0 ${qed}

		Let ${`u=${sub}`}
		$${'gather*'}
		${working} \\\\

		$${'alignat*{3}'}
		u &= {${u1}} &&${or}& u &= ${u2} \\\\
		${sub} &= {${u1}} \\text{ (NA)} &&& ${sub} &= ${u2} \\\\
		&&&& \\ln ${sub} &= \\ln ${u2} \\\\
		&&&& x \\ln ${base} &= \\ln ${u2} \\\\
		&&&& x &= \\frac{\\ln ${u2}}{\\ln ${base}} \\\\
		&&&&& = ${x.toFixed(2)} ${qed}
	`;
	const ans = mathlify`
		${x.toFixed(2)}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topics: [Topics.surds, Topics.exp],
		}),
	);
}
