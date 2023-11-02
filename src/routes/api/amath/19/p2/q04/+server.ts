import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting';
import { Fraction, LnFn, Polynomial } from 'mathlify';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
const x = new Polynomial('x');
{
	const rhs = new Fraction(-5, 2);
	const log2X = new LnFn(x, { base: 2 });
	const log16X = new LnFn(x, { base: 16 });
	const changedBase = log16X.changeBase(2);
	const coeff = new Fraction(1, 4).plus(1);
	const pow = rhs.divide(coeff);
	const xVal = new Fraction(2).pow(pow);
	const soln = mathlify`
		~${'gather*'}
		${log2X} + ${log16X} = {${rhs.valueOf()}} \\\\
		${log2X} + ${changedBase.rational} = {${rhs.valueOf()}} \\\\
		${log2X} + \\frac{${changedBase.num}}{\\log_2 2^4} = {${rhs.valueOf()}} \\\\
		${log2X} + \\frac{${changedBase.num}}{4 \\log_2 2} = {${rhs.valueOf()}} \\\\
		${log2X} + \\frac{${changedBase.num}}{4} = {${rhs.valueOf()}} \\\\
		${coeff} ${log2X} = {${rhs.valueOf()}} \\\\
		${log2X} = ${rhs.divide(coeff)} \\\\
		x = 2^{${rhs.divide(coeff)}} \\\\
		x = ${xVal} ${qed}
	`;
	const ans = mathlify`
		${`x = ${xVal}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const lgZ = new LnFn('z', { base: 10 });
	const lgY = new LnFn('y', { base: 10 });
	const lgZPlusY = new LnFn('(z + y)', { base: 10 });
	const diff = lgZ.minus(lgY);
	const soln = mathlify`
		~${'align*'}
		${lgZ} - ${lgY} &= ${lgZPlusY} \\\\		
		${diff.exp} &= ${lgZPlusY} \\\\
		${diff.arg} &= z + y \\\\
		z &= yz + y^2 \\\\
		z - yz &= y^2 \\\\
		z(1 - y) &= y^2 \\\\
		z &= \\frac{y^2}{1 - y} ${qed}
	`;
	const ans = mathlify`
		${`z = \\frac{y^2}{1 - y}`}.
	`;
	answer.newPart();
	answer.addSubPart(ans, soln);
	// part bii
	{
		const soln = mathlify`
			$${`z > 0 ${qed}`}

			Since ${`z > 0`}
			and ${`y > 0`},
			by considering ${`z = \\frac{y^2}{1 - y}`},
			~${'align*'}
			1 - y &> 0 \\\\
			y &< 1

			Combining with ${`y > 0`},
			$${`0 < y < 1 ${qed}`}
		`;
		const ans = mathlify`
			${`z > 0`}.
		`;
		answer.addSubPart(ans, soln);
	}
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
