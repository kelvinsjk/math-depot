import { Expression, SquareRoot, ExpressionWorking, RationalTerm } from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const root6 = new SquareRoot(6);
const root2 = new SquareRoot(2);
const base = new Expression(root6, root2);
const areaWorking = new ExpressionWorking(base, { aligned: true, equalStart: true });
areaWorking.square();

const vol = new Expression(16, new SquareRoot(3, { coeff: 4 }));
const h = new RationalTerm(vol, areaWorking.exp as Expression);
const hWorking = new ExpressionWorking(h, { aligned: true, equalStart: true });
hWorking.rationalize();

const soln = mathlify`
	~${'align*'}
	& \\text{Area of the base} \\\\
	${areaWorking} \\\\

	~${'align*'}
	& \\text{Volume} \\\\
	${hWorking} ${qed}
`;

const ans = mathlify`
	${hWorking.exp}.
`;

const answer = new Answer(ans, soln);

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.surds,
		}),
	);
}
