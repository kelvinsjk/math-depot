import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting';
import { Topics } from '../../../topics';

const answer = new Answer();

// a

{
	// part a
	const x1 = 8,
		y1 = 3;
	const x2 = 1,
		y2 = 'b';
	const x3 = 'c',
		y3 = -2;
	const a = 2;
	const b = 0;
	const c = Math.pow(a, y3);
	const soln = mathlify`
		Since the graph passes through ${`\\left( ${x1}, ${y1} \\right)`},
		$${'align*'}
		\\log_a ${x1} &= ${y1} \\\\
		a^${y1} &= ${x1} \\\\
		a^${y1} &= 2^3 \\\\
		a &= ${a} ${qed}

		Since the graph passes through ${`\\left( ${x2}, ${y2} \\right)`},
		$${'align*'}
		\\log_a ${x2} &= ${y2} \\\\
		b &= ${b} ${qed}

		Since the graph passes through ${`\\left( ${x3}, ${y3} \\right)`},
		$${'align*'}
		\\log_a ${x3} &= {${y3}} \\\\
		c &= a^{{${y3}}} \\\\
		&= ${c} ${qed}
	`;
	const ans = mathlify`
		${`a=${a}`},
		${`b=${b}`},
		${`c=${c}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const soln = mathlify`
		<div><img style="display:block;margin:auto;max-width:65vw;max-height:65vh" alt="log-graph" src="/amath/exp_15p1q02b_log_graph.png" loading="lazy" /></div>
	`;
	const ans = mathlify`
		<div><img style="display:block;margin:auto;max-width:65vw;max-height:65vh" alt="log-graph" src="/amath/exp_15p1q02b_log_graph.png" loading="lazy" /></div>
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
