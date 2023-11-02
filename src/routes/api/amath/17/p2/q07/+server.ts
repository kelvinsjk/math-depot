import { Fraction } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { e, qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
{
	// part a i
	const yearsGiven = 5730;
	const pGiven = 50;
	const k = Math.log(pGiven / 100) / yearsGiven / -1;
	const soln = mathlify`
		When ${`t=${yearsGiven}`},
		${`P = ${pGiven}`}
		~${'align*'}
		${pGiven} = &100 ${e}^{-k(${yearsGiven})} \\\\
		${e}^{-k(${yearsGiven})} &= ${new Fraction(pGiven, 100)} \\\\
		\\ln ${e}^{-k(${yearsGiven})} &= \\ln ${new Fraction(pGiven, 100)} \\\\
		- ${yearsGiven}k \\ln ${e} &= \\ln ${new Fraction(pGiven, 100)} \\\\
		k &= \\frac{\\ln ${new Fraction(pGiven, 100)}}{-${yearsGiven}} \\\\
		&= ${k.toPrecision(3)} ${qed}
	`;
	const ans = mathlify`
		${`k = ${k.toPrecision(3)}`}.
	`;
	answer.addSubPart(ans, soln);
	// a ii
	{
		const years = 8000;
		const percentage = 100 * Math.exp(-k * years);
		const soln = mathlify`
			~${'align*'}
			${`P &= 100 ${e}^{-k(${years})}`} \\\\
			&= 100 ${e}^{${k.toPrecision(5)}(${years})} \\\\
			&= ${percentage.toPrecision(3)} ${qed}
		`;
		const ans = mathlify`
			${percentage.toPrecision(3)}\\%.
		`;
		answer.addSubPart(ans, soln);
	}
}

// b
{
	const sGiven = 2.4;
	const I1 = Math.pow(10, sGiven);
	const multiple = 50;
	const I2 = I1 * multiple;
	const S = Math.log10(I2);
	const soln = mathlify`
		When ${`S=${sGiven}`},
		~${'align*'}
		${sGiven} &= \\lg \\frac{I}{c} \\\\
		\\frac{I}{c} &= 10^{${sGiven}} \\\\
		I &= 10^{${sGiven}} c

		When the intensity is ${multiple}
		times,
		~${'align*'}
		S &= \\lg \\frac{50 \\times 10^{${sGiven}} c}{c} \\\\
		&= \\lg \\left( 50 \\times 10^{${sGiven}} \\right) \\\\
		&= ${S.toPrecision(3)} ${qed}
	`;
	const ans = mathlify`
		${`S = ${S.toPrecision(3)}`}.
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
