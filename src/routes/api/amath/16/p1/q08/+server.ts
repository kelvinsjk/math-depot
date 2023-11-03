import {
	EquationWorking,
	Expression,
	Fraction,
	Point,
	lineWorking,
	Polynomial,
	midPointWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const A = new Point(-2, 6);
const xCoeff = 3,
	yCoeff = 2;
const lineLHS = new Expression([yCoeff, 'y'], [xCoeff, 'x']);
const lineRHS = 45;
const lineGradient = new Fraction(-xCoeff, yCoeff);
const m = lineGradient.negativeReciprocal();
const lWorking = lineWorking({ m, pt: A });
const AB = lWorking.eqn;
const BC = new Polynomial([lineGradient, new Fraction(lineRHS, yCoeff)]);
const working = new EquationWorking(AB, BC);
working.setAligned();
const xB = working.solveLinear();
const yB = AB.subIn(xB);
const B = new Point(xB, yB);

// part a
{
	const lineBCWorking = new EquationWorking(lineLHS, lineRHS);
	lineBCWorking.moveTerm(1, { hide: true });
	lineBCWorking.changeOrder([1, 0], { side: 'rhs' });
	lineBCWorking.divide(2);
	const soln = mathlify`
		Considering equation of ${'BC'},
		~${'gather*'}
		${lineBCWorking}

		$${`\\text{Gradient of}`} AB = ${m}

		Equation of ${'AB'}:
		~${'gather*'}
		${lWorking.working} \\\\
		y = ${lWorking.eqn} 

		Solving the equations of ${'AB'}
		and ${'BC'}
		simultaneously,
		~${'align*'}
		${working} \\\\
		y &= ${AB.replaceXWith(`(${xB})`)} \\\\
		&= ${yB}

		$${`\\text{Coordinates of } B = ${B}`} ${qed}
	`;
	const ans = mathlify`
		${`B ${B}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const C = new Point(new Fraction(lineRHS, xCoeff), 0);
	const mWorking = midPointWorking(A, C);
	const M = mWorking.midPoint;
	const D = new Point(M.x.times(2).minus(B.x), M.y.times(2).minus(B.y));
	const soln = mathlify`
		At ${'C, y=0'}
		@${'@br'}
		Substituting into equation of ${'BC'},
		~${'gather*'}
		${yCoeff} y + ${xCoeff}x = ${lineRHS} \\\\
		x = ${C.x}

		~${'align*'}
		& \\text{Coordinates of } M \\\\
		& = ${mWorking.working} \\\\
		& = ${M} ${qed}

		Let the coordinates of ${'D'}
		be ${`(x,y)`}

		We observe that ${'M'}
		is the midpoint of ${'BD'}
		~${'align*'}
		\\left( \\frac{${B.x}+x}{2}, \\frac{${B.y}+y}{2} \\right) &= ${M} \\\\
			x &= ${D.x} \\\\
			y &= {${D.y}}

		$${`\\text{Coordinates of } D = ${D}`} ${qed}
	`;
	const ans = mathlify`
		${`M ${M}`}.
		@${'@br'}
		${`D ${D}`}.
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
