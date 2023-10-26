import { Polynomial, InequalityWorking, ExpressionProduct } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed, or } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
{
	const lhs1 = 15;
	const lhs2 = new Polynomial([1, 2], { ascending: true });
	const rhs1 = new Polynomial([0, 1], { ascending: true });
	const rhs2 = new Polynomial([19, -2], { ascending: true });
	const lhs = new ExpressionProduct(lhs1, lhs2);
	const rhs = new ExpressionProduct(rhs1, rhs2);

	const working = new InequalityWorking(lhs, rhs, { sign: '\\geq' });
	working.expand();
	working.rhsZero({ hide: true });
	working.changeAscending(false);
	const roots = working.factorizeQuadratic();
	//const [x1, x2] = working.factorizeQuadratic();

	const soln = mathlify`
	~${'gather*'}
	${working}\\\\
	${roots[0]} ${qed} ${or} ${roots[1]} ${qed}
	`;

	const ans = mathlify`
		${roots[0]}
		or ${roots[1]}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const soln = 'Out of syllabus.';
	const ans = soln;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.quadratics,
		}),
	);
}
