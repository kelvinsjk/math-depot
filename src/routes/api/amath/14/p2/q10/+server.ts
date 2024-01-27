import {
	Circle,
	EquationWorking,
	Expression,
	Point,
	Polynomial,
	castToPoly,
	completeSquare,
	distanceWorking,
	gradientWorking,
	lineWorking,
	midPointWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const xCoeff = 4,
	yCoeff = -6,
	coeff = 36;

const C1 = Circle.fromGeneralForm(xCoeff, yCoeff, -coeff);
const center = C1.center;
const r = C1.radius;

// part a
{
	const soln = mathlify`
		$${'gather'}
		${C1.toGeneralForm({ rhsConstant: true }).eqn} \\notag \\\\
		${completeSquare(new Polynomial([1, xCoeff, 0]))} + ${completeSquare(
			new Polynomial([1, yCoeff, 0]),
		)} = ${coeff} \\notag \\\\
		${C1}

		$${'align*'}
		\\text{Coordinates of centre } &= ${center} ${qed} \\\\
		\\text{Radius} &= \\sqrt{${r.square()}} \\\\
			&= ${r} ${qed}
	`;
	const ans = mathlify`
		${`\\text{Centre} = ${center}`}.
		--newline--
		${'\\text{Radius}='}${r}.
	`;
	answer.addPart(ans, soln);
}

// part b
const A = new Point(-5, 5);
const tangentLHS = new Expression([3, 'y']);
const tangentRHS = new Polynomial([4, -15]);
let B: Point;
{
	const working = new EquationWorking(tangentLHS, tangentRHS);
	working.divide(3);
	const mTangent = castToPoly(working.rhs).coeffs[1];
	const mAB = mTangent.negativeReciprocal();
	const lWorking = lineWorking({ m: mAB, pt: A });
	const AB = lWorking.eqn;
	const working2 = new EquationWorking(AB, working.rhs);
	working2.setAligned();
	const xB = working2.solveLinear();
	const yB = AB.subIn(xB);
	B = new Point(xB, yB);
	const soln = mathlify`
		$${'gather*'}
		${working}
		
		$${'align*'}
		\\text{Gradient of tangent} &= ${mTangent} \\\\
		\\text{Gradient of } AB &= {${mAB}}

		Equation of ${'AB'}:
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${AB} ${qed}

		Equating the equations of the tangent and ${'AB'},
		$${'align*'}
		${working2} \\\\
		y &= ${AB.replaceXWith(`(${xB})`)} \\\\
		&= ${yB}

		$${''}\\text{Coordinates of } B = ${B} ${qed}
	`;
	const ans = mathlify`
		${`y = ${AB}`}.
		--newline--
		${`B ${B}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
let tangent: Polynomial;
{
	const mWorking = gradientWorking(center, A);
	const m = mWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: A });
	tangent = lWorking.eqn;
	const soln = mathlify`
		$${'align*'}
		\\text{Gradient of } AP	& = ${mWorking.working} \\\\
		& = ${mWorking.gradient} \\\\
		\\text{Gradient of tangent} &= ${m}

		Equation of ${'PC:'}
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${tangent} ${qed}
	`;
	const ans = mathlify`
		${`y=${tangent}`}.
	`;
	answer.addPart(ans, soln);
}

const mWorking = midPointWorking(A, B);
const M = mWorking.midPoint;
const dWorking = distanceWorking(M, A);
const r2 = dWorking.distance;
const C2 = new Circle(M, r2);
// part d
{
	const soln = mathlify`
		$${'align*'}
		\\text{Centre of circle }	& = ${mWorking.working} \\\\
		& = ${M} ${qed} \\\\
		\\text{Radius of circle} &= ${dWorking.working} \\\\
		& = ${r2} ${qed}
	`;
	const ans = mathlify`
		${`\\text{Centre} = ${M}`}.
		--newline--
		${'\\text{Radius}='}${r2}.
	`;
	answer.addPart(ans, soln);
}

// part e
{
	const P = new Point(4, 6);
	const rhs1 = C1.center.x.minus(P.x).square().plus(C1.center.y.minus(P.y).square());
	const rhs2 = C2.center.x.minus(P.x).square().plus(C2.center.y.minus(P.y).square());
	const soln = mathlify`
		Equation of ${'C_2'}:
		$${'equation'}
		${`${C2}`}

		Substituting ${`x=${P.x}`}
		and ${`y=${P.y}`}
		into ${`(1)`},
		$${'align*'}
		& \\text{LHS} \\\\
		& = \\left( ${P.x} - ({${C1.center.x}}) \\right)^2 + \\left( ${P.y} - {${
			C1.center.y
		}} \\right)^2 \\\\
		&= ${rhs1} \\\\
		&< ${C1.radius.square()} \\\\
		&= \\text{RHS}

		Hence ${P}
		lies within ${'C_1'}

		Substituting ${`x=${P.x}`}
		and ${`y=${P.y}`}
		into ${`(2)`},
		$${'align*'}
		& \\text{LHS} \\\\
		& = \\left( ${P.x} - ({${C2.center.x}}) \\right)^2 + \\left( ${P.y} - {${
			C2.center.y
		}} \\right)^2 \\\\
		&= ${rhs2} \\\\
		&> ${C2.radius.square()} \\\\
		&= \\text{RHS}

		Hence ${P}
		lies outside ${'C_2'}

		Hence ${P}
		lies within only one of the circles
		${'C_1'}
		and ${'C_2'} ${qed}
	`;
	const ans = mathlify`
		${P}
		only lies within ${'C_1'}
		and not ${'C_2'}.
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
