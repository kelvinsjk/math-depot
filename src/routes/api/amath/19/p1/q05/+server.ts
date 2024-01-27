import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed, e } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
const destroy = 21;
const alivePercentage = 100 - destroy;
const alive = alivePercentage / 100;
{
	const soln = mathlify`Every minute, 
		${`100\\% - ${destroy}\\% = ${alivePercentage}\\% = ${alive}`}
		of germs will be alive.
		--newline--
		After 1 minute there will be 
		${`(${alive}) N`}
		germs alive.
		--newline--
		After 2 minutes there will be
		${`(${alive})^2 N`}
		germs alive.
		--newline--
		After ${'n'}
		minutes,
		$${`\\text{Germs alive} = (${alive})^n N`} ${qed}
	`;
	const ans = mathlify`
		${`(${alive})^n N`}.
	`;
	answer.addPart(ans, soln);
}

// b
{
	const n = 20;
	const aliveVal = Math.pow(alive, n);
	const percentage = (1 - aliveVal) * 100;
	const soln = mathlify`
		$${'align*'}
		& \\text{Germs alive} \\\\
		& = (${alive})^{${n}} N \\\\
		&= ${aliveVal.toPrecision(5)} N

		$${'align*'}
		& \\text{Percentage of germs destroyed} \\\\
		& = \\frac{N - ${aliveVal.toPrecision(5)} N}{N} \\times 100\\% \\\\
		& = ${percentage.toPrecision(5)} \\% \\\\
		x &= ${percentage.toPrecision(2)} ${qed}
	`;
	const ans = mathlify`
		${`x=${percentage}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const soln = mathlify`
		$${'align*'}
		N ${e}^{kn} &= (${alive})^n N \\\\
		${e}^{kn} &= (${alive})^n \\\\
		\\ln ${e}^{kn} &= \\ln (${alive})^n \\\\
		kn \\ln ${e} &= n \\ln ${alive} \\\\
		k &= \\ln ${alive} ${qed}
	`;
	const ans = mathlify`
		${`k = \\ln ${alive}`}.
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
