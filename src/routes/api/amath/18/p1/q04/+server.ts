import {
	Expression,
	SquareRoot,
	ExpressionWorking,
	RationalTerm,
	EquationWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
{
	const root5 = new SquareRoot(5);
	const x = new Expression(3, root5.times(2));
	const workingA = new ExpressionWorking(x);
	workingA.square();
	const eqn1 = new EquationWorking(new Expression(12, [2, 'a']));
	eqn1.setAligned();
	const a = eqn1.solveLinear();
	const compareRational = new Expression(29, [3, 'a'], 'b');
	const eqn2 = new EquationWorking(compareRational.subIn({ a }));
	eqn2.setAligned();
	const b = eqn2.solveLinear();
	const soln = mathlify`
		Substitute ${`x=${x}`}
		into the equation,
		
		~${'gather*'}
		\\left( ${x} \\right)^2 + a (${x}) + b = 0 \\\\
		${workingA.expArray[1]} + a (${x}) + b = 0 \\\\
		${workingA.expArray[2]} + a (${x}) + b = 0 \\\\
		(29 + 3a + b) + (12 + 2a) ${root5} = 0
		
		~${'align*'}
		${eqn1} ${qed}

		~${'align*'}
		${compareRational} &= 0 \\\\
		${eqn2} ${qed}
	`;
	const ans = mathlify`
		${`a={${a}}`},
		${`b={${b}}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	// part b
	const area = new Expression(24, new SquareRoot(48));
	const l = new Expression(6, new SquareRoot(12));
	const working = new ExpressionWorking(new RationalTerm(area.divide(2), l.divide(2)), {
		aligned: true,
		equalStart: true,
	});
	working.rationalize();

	const soln = mathlify`
		~${'align*'}
		& \\text{Breadth} \\\\
		&= \\frac{24+\\sqrt{16 \\times 3}}{6+\\sqrt{4 \\times 3}} \\\\
		&= \\frac{${area}}{${l}} \\\\
		${working} ${qed}
	`;
	const ans = mathlify`
		${working.exp}.
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.surds,
		}),
	);
}
