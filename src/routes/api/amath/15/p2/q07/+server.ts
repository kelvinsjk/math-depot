import {
	Circle,
	Point,
	Polynomial,
	EquationWorking,
	gradientWorking,
	lineWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

// part a
{
	const soln = mathlify`
		The ${'x'}\\text{-coordinate}
		is the same as the ${'y'}\\text{-coordinate} ${qed}
	`;
	const ans = mathlify`
	The ${'x'}\\text{-coordinate}
	is the same as the ${'y'}\\text{-coordinate}.
	`;
	answer.addPart(ans, soln);
}

const P = new Point(9, 8);
let circle: Circle;
// part b
{
	const poly1 = new Polynomial([1, P.x.negative()]);
	const poly2 = new Polynomial([1, P.y.negative()]);
	const working = new EquationWorking(
		poly1.square().plus(poly2.square()),
		Polynomial.ofDegree(2),
	);
	working.rhsZero();
	const [x1, x2] = working.factorizeQuadratic();
	circle = new Circle(new Point(x1, x1), x1);
	const soln = mathlify`
		Let ${`\\left( x, x \\right)`}
		be the centre of the circle
		--newline--
		Since both axes are tangents to the circle,
		the radius is also ${'x'}

		$${'gather*'}
		\\sqrt{\\left( ${poly1} \\right)^2 + \\left( ${poly2} \\right)^2} = x \\\\
		\\left( ${poly1.square()} \\right) + \\left( ${poly2.square()} \\right) = x^2 \\\\
		${working} \\\\
		x = ${x1} ${or} x = ${x2}

		Since the centre is to the left of ${P},
		$${''}x = ${x1} 

		Equation of ${'C'}:
		$${circle} ${qed}
	`;
	const ans = mathlify`
		${circle}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const gWorking = gradientWorking(circle.center, P);
	const m = gWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: P });
	const T = lWorking.eqn;
	const soln = mathlify`
		Let ${'P'}
		denote the point ${P}
		and ${'X'}
		denote the centre of the circle

		$${'align*'}
		&\\text{Gradient } CX \\\\
		&= ${gWorking.working} \\\\
		&= ${gWorking.gradient} \\\\
		&\\text{Gradient of } T \\\\
		&= ${m}

		Equation of ${'T'}:
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${T} ${qed}
	`;
	const ans = mathlify`
		${`y=${T}`}.
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
