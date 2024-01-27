import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { e, qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a
const c = 20;
const T0 = 80;
const A = T0 - c;
let k: number;

// part a
{
	const soln = mathlify`
		When ${`t=0`},
		${`T = ${T0}`}
		$${'align*'}
		${c} + A ${e}^{k(0)} &= ${T0} \\\\
		A &= ${T0} - ${c} \\\\
		&= ${A} ${qed}
	`;
	const ans = mathlify`
		${`A = ${A}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const t1 = 1;
	const T1 = 65;
	k = Math.log((T1 - c) / A) / t1 / -1;
	const soln = mathlify`
		When ${`t=${t1}`},
		${`T = ${T1}`}
		$${'align*'}
		${c} + ${A} ${e}^{-k(${t1})} &= ${T1} \\\\
		${A} ${e}^{-k} &= ${T1} - ${c} \\\\
		${e}^{-k} &= \\frac{${T1 - c}}{${A}} \\\\
		-k &= \\ln \\frac{${T1 - c}}{${A}} \\\\
		k &= ${k.toPrecision(3)} ${qed}
	`;
	const ans = mathlify`
		${`k = ${k.toPrecision(3)}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const t2 = 4;
	const T2 = c + A * Math.exp(-k * t2);
	const TSafe = 40;
	const soln = mathlify`
		When ${`t=${t2}`},
		$${'align*'}
		T &= ${c} + ${A} ${e}^{-k(${t2})} \\\\
		&= ${T2.toPrecision(5)} < ${TSafe}

		Therefore, it is safe to give the food ${qed}
	`;
	const ans = mathlify`
		Safe as ${T2.toPrecision(5)} < ${TSafe}.
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
