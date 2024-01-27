import {
	Circle,
	Point,
	Polynomial,
	completeSquare,
	gradientWorking,
	lineWorking,
	midPointWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const xCoeff = -4,
	yCoeff = -2,
	coeff = 95;

const circle = Circle.fromGeneralForm(xCoeff, yCoeff, -coeff);
const A = circle.center;
const r = circle.radius;

// part a
{
	const soln = mathlify`
		$${'gather'}
		${circle.toGeneralForm({ rhsConstant: true }).eqn} \\notag \\\\
		${completeSquare(new Polynomial([1, xCoeff, 0]))} + ${completeSquare(
			new Polynomial([1, yCoeff, 0]),
		)} = ${coeff} \\notag \\\\
		${circle}

		$${'align*'}
		\\text{Coordinates of } A &= ${A} ${qed} \\\\
		\\text{Radius} &= \\sqrt{${r.square()}} \\\\
			&= ${r} ${qed}
	`;
	const ans = mathlify`
		${`A ${A}`}.
		--newline--
		${'\\text{Radius}='}${r}.
	`;
	answer.addPart(ans, soln);
}

// part b
const P = new Point(10, 7);
{
	const soln = mathlify`
		Substituting ${`x=${P.x}`}
		and ${`y=${P.y}`}
		into ${'(1)'},
		$${'align*'}
		\\text{LHS} &= \\left( ${P.x} ${xCoeff / 2} \\right)^2 + \\left( ${P.y} ${
			yCoeff / 2
		} \\right)^2 \\\\
		&= ${P.x.minus(-xCoeff / 2).square()} + ${P.y.minus(-yCoeff / 2).square()} \\\\
		&= ${P.x
			.minus(-xCoeff / 2)
			.square()
			.plus(P.y.minus(-yCoeff / 2).square())} \\\\
		&= \\text{RHS} \\phantom{1}

		Hence ${`P ${P}`}
		lies on the circle ${qed}
	`;
	const ans = mathlify`
		${'\\text{LHS} = \\text{RHS}'}.
	`;
	answer.addPart(ans, soln);
}

// part c
let tangent: Polynomial;
{
	const mWorking = gradientWorking(A, P);
	const m = mWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: P });
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

const mWorking = midPointWorking(A, P);
const M = mWorking.midPoint;
const C2 = new Circle(M, A);
// part d
{
	const soln = mathlify`
		$${'align*'}
		\\text{Midpoint of } AP	& = ${mWorking.working} \\\\
		& = ${M} \\\\
		\\text{Radius of circle} &= \\frac{${r}}{2} \\\\
		& = ${r.divide(2)}

		Equation of circle:
		$${C2} ${qed}
	`;
	const ans = mathlify`
		${C2}.
	`;
	answer.addPart(ans, soln);
}

// part e
{
	const soln = mathlify`
		We observe the the tangent to ${'C_1'}
		at ${'P'}
		is the same as the tangent to ${'C_2'}
		at ${'P'}

		Hence the equation of the tangent to ${'C_2'}
		at ${'P'}
		is
		$${`y=${tangent}`} ${qed}
		
	`;
	const ans = mathlify`
		${`y=${tangent}`}.
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
