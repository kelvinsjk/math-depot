import { EquationWorking, Polynomial } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

{
	const nLeft1 = new Polynomial([3, 0]);
	const nLeft = nLeft1.divide(2);
	const nRightNum = new Polynomial([1, -1], { ascending: true });
	const nRightDen = 2;
	const nRight = nRightNum.minus(nRightDen);
	const working = new EquationWorking(nLeft, nRight, { aligned: true });
	const x = working.solveLinear();
	const pow = x.times(3).divide(2);
	const final = Math.pow(5, pow.valueOf());
	const soln = mathlify`
		$${'align*'}
		\\left( 5^{${nLeft1}} \\right)^{\\frac{1}{2}} &= \\frac{5^{${nRightNum}}}{5^{${nRightDen}}} \\\\
		5^{${nLeft}} &= 5^{${nRight}} \\\\
		${working}

		$${'align*'}
		& \\sqrt{125^x} \\\\
		&= \\left( 5^{3x} \\right)^\\frac{1}{2} \\\\
		&= 5^{${pow}} \\\\
		&= ${final.toPrecision(3)} ${qed}
	`;
	const ans = mathlify`
		${final.toPrecision(3)}.
	`;
	answer.addBody(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.exp,
		}),
	);
}
