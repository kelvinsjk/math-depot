import {
	Circle,
	EquationWorking,
	Point,
	Polynomial,
	castToPoly,
	completeSquare,
	gradientWorking,
	lineWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const xCoeff = 6,
	yCoeff = -4,
	coeff = -12;

const circle = Circle.fromGeneralForm(xCoeff, yCoeff, coeff);
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
		\\text{Coordinates of centre } &= ${A} ${qed} \\\\
		\\text{Radius} &= \\sqrt{${r.square()}} \\\\
			&= ${r} ${qed}
	`;
	const ans = mathlify`
		${`\\text{Centre} = ${A}`}.
		--newline--
		${'\\text{Radius}='}${r}.
	`;
	answer.addPart(ans, soln);
}

// part b
const P = new Point(-7, -1);
let tangent: Polynomial;
{
	const mWorking = gradientWorking(A, P);
	const m = mWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: P });
	tangent = lWorking.eqn;
	const working = new EquationWorking('y', tangent);
	working.times(3);
	working.rhsZero();
	const soln = mathlify`
		$${'align*'}
		\\text{Gradient of } AP	& = ${mWorking.working} \\\\
		& = ${mWorking.gradient} \\\\
		\\text{Gradient of tangent} &= ${m}

		Equation of ${'PC:'}
		$${'gather*'}
		${lWorking.working} \\\\
		${working} ${qed}
	`;
	const ans = mathlify`
		${`${working.lhs} = ${working.rhs}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
let tangent2: Polynomial;
{
	const yPoly = castToPoly(circle.toGeneralForm().subIn({ x: P.x }));
	const working = new EquationWorking(yPoly);
	const [yP, yQ] = working.factorizeQuadratic();
	const Q = new Point(P.x, yQ);
	const mWorking = gradientWorking(circle.center, Q);
	const m = mWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: Q });
	tangent2 = lWorking.eqn;
	const soln = mathlify`
		Substituting ${`x={${P.x}}`}
		into the equation of the circle,
		$${'gather*'}
		${P.x.square()} + y^2 ${P.x.times(xCoeff)} ${yCoeff}y ${coeff} \\\\
		${working} \\\\
		y = ${yP} ${or} y = ${yQ}

		$${`\\text{Coordinates of } Q = ${Q}`}

		$${'align*'}
		& \\text{Gradient of line from centre to } Q \\\\
		& = ${mWorking.working} \\\\
		& \\text{Gradient of tangent} \\\\
		& = ${m} \\\\

		Equation of tangent at ${'Q:'}
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${tangent2} ${qed}
	`;
	const ans = mathlify`
		${`y=${tangent2}`}.
	`;
	answer.addPart(ans, soln);
}

// part d
{
	const working = new EquationWorking(tangent, tangent2);
	working.setAligned();
	const x = working.solveLinear();
	const y = tangent.subIn(x);
	const R = new Point(x, y);
	const soln = mathlify`
		Equating the equations of the tangents,
		$${'align*'}
		${working} \\\\
		y &= ${tangent.replaceXWith(`\\left({${x}}\\right)`)} \\\\
		&= ${y}

		$${`\\text{Coordinates of } R = ${R}`} ${qed}
	`;
	const ans = mathlify`
		${`R ${R}`}.
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
