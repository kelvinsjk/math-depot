import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { e, qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a

{
	// part a
	const multiple = 2;
	const time = 3;
	const k = Math.log(multiple) / time;
	const soln = mathlify`
		When ${`t=${time}`},
		${`N = ${multiple}N_0`}
		$${'align*'}
		N_0 ${e}^{k(${time})} &= ${multiple}N_0 \\\\
		${e}^{k(${time})} &= ${multiple} \\\\
		${time}k &= \\ln ${multiple} \\\\
		k &= ${k.toPrecision(3)} ${qed}
	`;
	const ans = mathlify`
		${`k = ${k.toPrecision(3)}`}.
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
