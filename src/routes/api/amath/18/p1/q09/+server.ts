import {
	EquationWorking,
	Fraction,
	Point,
	Polynomial,
	gradientWorking,
	lineWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const A = new Point(5, 0);
const C = new Point(0, 10);
let mAC: Fraction;
const O = new Point(0, 0);
let OB: Polynomial;
// part a
{
	const gWorking = gradientWorking(A, C);
	mAC = gWorking.gradient;
	const m = mAC.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: O });
	OB = lWorking.eqn;

	const soln = mathlify`
		~${'align*'}
		\\text{Gradient of } AC	& = ${gWorking.working} \\\\
		& = ${gWorking.gradient} \\\\
		\\text{Gradient of } OB &= ${m}
		
		Equation of ${'OB:'}
		~${'gather*'}
		${lWorking.working} \\\\
		y = ${OB} ${qed}
	`;
	const ans = mathlify`
		${`y=${OB}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const lWorking = lineWorking({ m: mAC, pt: A });
	const AC = lWorking.eqn;
	const working = new EquationWorking(OB, AC);
	working.setAligned();
	const xM = working.solveLinear();
	const yM = OB.subIn(xM);
	const xB = xM.times(2);
	const yB = yM.times(2);
	const soln = mathlify`
		Equation of ${'AC:'}
		~${'gather*'}
		${lWorking.working} \\\\
		y = ${AC}

		Equating the equations of ${'OB'}
		and ${'AC'},
		~${'align*'}
		${working} \\\\
		y &= ${OB.replaceXWith(`(${xM})`)} \\\\
		&= ${yM}

		Since the midpoint of ${'OB'}
		is ${''}\\left( ${xM}, ${yM} \\right),
		$${''} \\text{Coordinates of } B = \\left( ${xB}, ${yB} \\right) ${qed}
	`;
	const ans = mathlify`
		${''} B = \\left( ${xB}, ${yB} \\right).
	`;
	answer.addPart(ans, soln);
}

export async function GET() {
	return new Response(
		JSON.stringify({
			answer: answer.answer,
			solution: answer.solution,
			topic: Topics.coordinate,
		}),
	);
}
