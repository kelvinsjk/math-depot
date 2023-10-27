import { Expression, SquareRoot, ExpressionWorking, RationalTerm } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const t1 = 13,
	rad1 = 48;
const area = new Expression(t1, new SquareRoot(rad1).times(-1));
const root3 = new SquareRoot(3);

// part a
{
	const width = new Expression(3, root3.times(-1));

	const working = new ExpressionWorking(new RationalTerm(area, width), {
		aligned: true,
		equalStart: true,
	});
	working.rationalize();

	const soln = mathlify`
	~${'align*'}
	& \\text{Length} \\\\
	&= \\frac{${t1} - \\sqrt{16 \\times 3}}{${width}} \\\\
	${working} ${qed}
`;
	const ans = mathlify`
	${working.exp}.
`;
	answer.addPart(ans, soln);
}

// part b
{
	const c = -1;
	const side = new Expression(root3.times(2), 'c');
	const sq = side.square();
	const lhs = sq.minus(area);
	let terms = lhs.terms;
	terms = [terms[2], terms[1], terms[0], terms[3]];
	const poly = new Expression(...terms);
	const soln = mathlify`
		~${'align*'}
		& \\left( ${side} \\right)^2 \\\\
		&= (2 ${root3})^2 + 4${root3} + c^2 \\\\
		&= ${sq}

		~${'gather*'}
		${sq} = ${area} \\\\
		${poly} = 0 \\\\
		c^2 + c - c + 4${root3}c - 1 + 4${root3} = 0 \\\\
		c(c+1) + c ({-1} + 4${root3}) - 1 + 4${root3} = 0 \\\\
		c(c+1) + ({-1}+4${root3})(c+1) = 0 \\\\
		(c+1)(c-1+4${root3}) = 0 \\\\
		c = -1 ${or} c = 1 - 4${root3}

		If ${`c=1-4${root3}`},
		then the side ${`2${root3} + c`}
		will be negative, so this root is rejected.

		Hence ${`c={${c}}`} ${qed}
	`;
	const ans = mathlify`
		${`c={${c}}`}.
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
