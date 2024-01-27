import {
	EquationWorking,
	Point,
	Polynomial,
	distanceWorking,
	gradientWorking,
	lineWorking,
	midPointWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';
import { or } from '$lib/typesetting';

const answer = new Answer();

const A = new Point(-5, 0);
const B = new Point(7, 5);
const E = new Point(5, 6);
const lhs = new Polynomial([5, 6, 0]);
const rhs = 11;
let BE: Polynomial;

// part a
{
	const gWorking = gradientWorking(B, E);
	const m = gWorking.gradient;
	const lWorking = lineWorking({ m, pt: B });
	BE = lWorking.eqn;
	const dWorking = distanceWorking(A, B);
	const perimeter = 46;
	const d = dWorking.distance;
	const AD = d.cast.toFraction().times(2).negative().plus(perimeter).divide(2);
	const poly1 = new Polynomial([1, A.x.negative()]);
	const working = new EquationWorking(poly1.square().plus(BE.square()), AD.square());
	working.times(4);
	working.moveTerm(2);
	const soln = mathlify`
		$${'align*'}
		&\\text{Gradient of } BE \\\\
		& = ${gWorking.working} \\\\
		& = ${m}

		Equation of ${'BE:'}
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${BE}

		Since ${'D'}
		lies on ${'BE'},
		let the coordinates of ${'D'}
		be ${`\\left( x, ${BE} \\right)`}

		$${'align*'}
		&\\text{Distance of } AD \\\\
		& = ${dWorking.working} \\\\
		& = ${d}

		Since the perimeter is ${'46'}\\text{ units},
		$${'align*'}
		AD &= \\frac{${perimeter}-2(${d})}{2} \\\\
		&= ${AD}

		$${'gather*'}
		\\sqrt{ \\left( x - ({${A.x}}) \\right)^2 + \\left( ${BE} - ${
			A.y
		} \\right)^2} = ${AD} \\\\
		\\left( ${poly1} \\right)^2 + \\left( ${BE} \\right)^2 = ${AD.square()} \\\\
		\\left( ${poly1.square()} \\right) + \\left( ${BE.square()} \\right) = ${AD.square()} \\\\
		${working} ${qed}
	`;
	const ans = mathlify`
		${lhs} = ${rhs}.
	`;
	answer.addPart(ans, soln);
}

// part b
let D: Point;
{
	const working = new EquationWorking(lhs, rhs);
	working.rhsZero();
	const [x1, x2] = working.factorizeQuadratic();
	const y = BE.subIn(x2);
	D = new Point(x2, y);
	const soln = mathlify`
		$${'gather*'}
		${working} \\\\
		x = {${x1}} ${or} x = {${x2}}

		The diagram is necessary to determine which is the correct value for the
		${'x'}\\text{-coordinate}
		of ${'D'}
		--newline--
		From the diagram, ${'x_D > 0'}
		so ${`x = {${x2}}`}

		$${'align*'}
		y &= ${BE.replaceXWith(`(${x2})`)} \\\\
		&= ${y}

		$${`\\text{Coordinates of } D \\text{ are } \\left( ${x2}, ${y} \\right)`} ${qed}
	`;
	const ans = mathlify`
		${`D ${D}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const mWorking = midPointWorking(B, D);
	const M = mWorking.midPoint;
	const xC = M.x.times(2).minus(A.x);
	const yC = M.y.times(2).minus(A.y);
	const C = new Point(xC, yC);
	const soln = mathlify`
		Let ${'M'}
		denote the midpoint of ${'BD'}
		$${'align*'}
		&\\text{Coordinates of } M \\\\
		&= ${mWorking.working} \\\\
		&= ${M}

		${'M'}
		is also the midpoint of ${'AC'}
		--newline--
		Let the coordinates of ${'C'}
		be ${`\\left( x, y \\right)`}
		$${'align*'}
		\\left( \\frac{${A.x} + x}{2}, \\frac{${A.y} + y}{2} \\right) &= ${M} \\\\
		x &= ${xC} \\\\
		y &= ${yC}

		$${`\\text{Coordinates of } C \\text{ are } \\left( ${xC}, ${yC} \\right)`} ${qed}
	`;
	const ans = mathlify`
		${`C ${C}`}.
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
