import { Fraction } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

{
	const twoN1 = 1 * -2;
	const twoN2 = 1;
	const twoN = twoN1 + twoN2;
	const fiveN1 = 2 * -2;
	const fiveN2 = -1;
	const fiveN = fiveN1 + fiveN2;
	const threeN1 = -1 * -2;
	const threeN2 = new Fraction(1, 2).times(3);
	const threeN = threeN2.plus(threeN1);
	const soln = mathlify`
		$${'align*'}
		& \\Bigg[ \\left( 2 \\times 5^2 \\times 3^{-1} \\right)^{-2} \\times \\left( 3^3 \\right)^{\\frac{1}{2}} \\Bigg] \\times \\frac{2}{5}	\\\\
		& = \\left( 2^{${twoN1}} \\times 5^{${fiveN1}} \\times 3^{${threeN1}} \\times 3^{${threeN2}} \\right) \\times 2 \\left( 5^{-1} \\right) \\\\
		& = 2^{${twoN}} 3^{${threeN}} \\, 5^{${fiveN}}
		
		$${'align*'}
		a &= {${twoN}} ${qed} \\\\
		b &= ${threeN} ${qed} \\\\
		c &= {${fiveN}} ${qed}
	`;
	const ans = mathlify`
		${`a={${twoN}}`},
		${`b=${threeN}`},
		${`c={${fiveN}}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const r = 1.07;
	const n = 6;
	const start = 1_000_000;
	const end = start * Math.pow(r, n);
	const endString = Number(end.toPrecision(2)).toLocaleString();
	const soln = mathlify`
		$${'align*'}
		& \\text{Value at beginning of } 2020 \\\\
		& = ${start.toLocaleString()} \\times ${r.toFixed(2)}^{${n}} \\\\
		& = ${endString} ${qed}
	`;
	const ans = mathlify`
		${'\\$'} ${endString}.
	`;
	answer.addPart(ans, soln);
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
