import {
	EquationWorking,
	Expression,
	Point,
	Polynomial,
	Fraction,
	midPointWorking,
	gradientWorking,
	solveLinear,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const l2LHS = new Expression([3, 'y']);
const l2RHS = new Polynomial([4, -40]);
const l1LHS = new Expression([4, 'y'], 'x');
const l1RHS = 48;
let xA: Fraction, yA: Fraction;
const O = new Point(0, 0);
const yC = 0;
let xC: Fraction;

// part a
{
	const working1 = new EquationWorking(l1LHS, l1RHS);
	working1.moveTerm(1, { hide: true });
	working1.changeOrder([1, 0], { side: 'rhs' });
	working1.times(4, { hide: true });
	const working2 = new EquationWorking(
		l2LHS.plus(working1.lhs),
		l2RHS.plus(working1.rhs),
	);
	yA = working2.solveLinear();
	const working3 = new EquationWorking(l2LHS.subIn({ y: yA }), l2RHS);
	xA = working3.solveLinear();
	const A = new Point(xA, yA);
	const mWorking = midPointWorking(O, A);
	const M = mWorking.midPoint;
	const gWorking1 = gradientWorking(O, M);
	const m1 = gWorking1.gradient;
	xC = solveLinear(l2RHS);
	const C = new Point(xC, yC);
	const gWorking2 = gradientWorking(M, C);
	const m2 = gWorking2.gradient;
	console.assert(m1.times(m2).is.equalTo(-1), `Warning AMath 13P1Q10: m1*m2 != -1`);
	const soln = mathlify`
		$${'gather'}
		${l2LHS} = ${l2RHS} \\\\
		${l1LHS} = ${l1RHS} \\\\

		From ${`(2)`},
		$${'gather*'}
		${working1}

		$${'equation'}
		${working1.lhs} = ${working1.rhs}

		Taking ${'(1)+(3)'}
		$${'gather*'}
		${working2}

		Substituting ${`y=${yA}`}
		into ${`(1)`},
		$${'align*'}
		${working3}

		Hence the coordinates of ${`A = ${A}`}
		$${'align*'}
		& \\text{Coordinates of } M \\\\
		&  = ${mWorking.working} \\\\
		&  = ${M}

		At ${'C, y= 0'}
		$${'align*'}
		${l2RHS} &= 0 \\\\
		x &= ${xC}

		Hence the coordinates of ${`C = ${C}`}
		$${'align*'}
		& \\text{Gradient of } OM \\\\
		&  = ${gWorking1.working} \\\\
		&  = ${m1} \\\\
		& \\text{Gradient of } MC \\\\
		&  = ${gWorking2.working} \\\\
		&  = ${m2}

		Since ${'m_{OM} \\times m_{MC} = -1'},
		$${`\\angle OMC = 90\\degree`} ${qed}		
	`;
	const ans = mathlify`
		${`m_{OM} \\times m_{MC} = -1`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const working = new EquationWorking(l1LHS.subIn({ x: 0 }), l1RHS);
	const yB = working.solveLinear();
	const areaOAB = yB.times(xA).divide(2);
	const areaOAC = yA.times(xC).divide(2);
	const ratio = areaOAB.divide(areaOAC);
	const soln = mathlify`
		At ${`B, x=0`}
		$${'align*'}
		${working}

		$${`\\text{Coordinates of } B = \\left( 0, ${yB} \\right)`}

		$${'align*'}
		& \\text{Area of } OAB \\\\
		&= \\frac{1}{2} \\times y_B \\times x_A \\\\
		&= \\frac{1}{2} \\times ${yB} \\times ${xA} \\\\
		&= ${areaOAB} \\\\
		& \\text{Area of } OAC \\\\
		& = \\frac{1}{2} \\times y_A \\times x_C \\\\
		&= \\frac{1}{2} \\times ${yA} \\times ${xC} \\\\
		&= ${areaOAC}

		$${''}\\frac{\\text{Area of } OAB}{\\text{Area of } OAC} = ${ratio}

		$${'align*'}
		\\text{Area of OAB} &: \\text{ Area of OAC} \\\\
		= ${ratio.num} &: ${ratio.den} ${qed}
	`;
	const ans = mathlify`
		${ratio.num} : ${ratio.den}.
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
