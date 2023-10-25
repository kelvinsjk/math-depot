import {
	math,
	//display
} from 'mathlifier';
import {
	Polynomial,
	factorizeQuadratic,
	solveLinear,
	Fraction,
	EquationWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';

const answer = new Answer();

// part a
{
	const y1 = new Polynomial([2, 0, -7]);
	const y2 = new Polynomial([3, 20]);
	const working = new EquationWorking(y1, y2);
	working.setAligned();
	working.rhsZero();
	working.factorizeQuadratic();

	const soln = mathlify`
	Equating the two,
	~${'align*'}
	${working}


	`;
	answer.addPart('', soln);
}

// const quad = y1.minus(y2);
// const aSolns = factorizeQuadratic(quad);
// const [x1, x2] = aSolns[2];
// const y1Ans = y1.subIn(x1);
// const y2Ans = y2.subIn(x2);

// part b
// const b = 5;
// const c = -2;
// // b2 - 4ac < 0
// const linear = new Polynomial([-4 * c, b * b]);
// const aCrit = solveLinear(linear);

// // part c
// const a3 = 1;
// const b3 = new Polynomial([1, -4]);
// const c3 = new Polynomial([-1, new Fraction(21, 4)]);
// const quadC = b3.square().minus(c3.times(4 * a3));
// const cSolns = factorizeQuadratic(quadC);
// const [c1, c2] = cSolns[2];

// // typeset
// const aAns = `${math(`x=${x1}, y=${y1Ans}`)} or ${math(`x=${x2}, y=${y2Ans}.`)}`;
// const bAns = `Greatest ${math(`a = ${aCrit.floor()}.`)}`;
// const cAns = `${math(`c=${c1}`)} or ${math(`c=${c2}.`)}`;

// // answer and solution
// const answer: AnswerObject = {
// 	parts: [{ body: aAns }, { body: bAns }, { body: cAns }],
// };

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: 'Quadratic Functions, Equations and Inequalities',
		}),
	);
}
