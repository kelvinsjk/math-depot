import {
	Circle,
	Point,
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

const A = new Point(1, 4);
const B = new Point(9, 8);
const C = new Point(7, 12);

// part a
{
	const m1 = gradientWorking(A, B);
	const m2 = gradientWorking(C, B);
	const soln = mathlify`
		$${'align*'}
		& \\text{Gradient of } AB	\\\\
		& = ${m1.working} \\\\
		& = ${m1.gradient}
		
		$${'align*'}
		& \\text{Gradient of } CB	\\\\
		& = ${m2.working} \\\\
		& = {${m2.gradient}}
		
		Since gradient of ${'AB \\times'}
		gradient of ${'CB'} = {-1},
		--newline--
		${'AB \\perp CB'}
		--newline--
		Hence ${'\\angle ABC = 90 \\degree'} ${qed}
	`;
	const ans = mathlify`
		${'m_{AB} \\cdot m_{CB} = -1'}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const soln = mathlify`
		Since ${'\\angle ABC = 90 \\degree'},
		by the converse of the right angle in semi-circle property,
		${'A, B'}
		and ${'C'}
		lie on a circle with diameter ${'AC'} ${qed}
	`;
	const ans = mathlify`
		By the converse of the right angle in semi-circle property.
	`;
	answer.addPart(ans, soln);
}

// part c
let circle: Circle;
{
	const mWorking = midPointWorking(A, C);
	const center = mWorking.midPoint;
	const dWorking = distanceWorking(center, A);
	const r = dWorking.distance;
	circle = new Circle(center, r);
	const soln = mathlify`
		The centre of the circle is the midpoint of ${'AC'}
		$${'align*'}
		& \\text{Midpoint of } AC \\\\
		& = ${mWorking.working} \\\\
		& = ${center}
		
		$${'align*'}
		& \\text{Radius of circle} \\\\
		& = ${dWorking.working} \\\\
		& = ${r}

		Equation of circle:
		$${circle} ${qed}
	`;
	const ans = mathlify`
	${circle}.
	`;
	answer.addPart(ans, soln);
}

// part d
{
	const soln = mathlify`
		Let ${'P'}
		denote the center of the circle

		Since the ${'y'}\\text{-coordinate}
		of ${'B'}
		and of ${'P'}
		are the same,
		${'BP'}
		is parallel to the ${'x'}\\text{-axis}

		By the tangent perpendicular to radius circle property, the tangent to the circle at ${'B'}
		is parallel to the ${'y'}\\text{-axis} ${qed}
	`;
	const ans = mathlify`
	The ${'y'}\\text{-coordinate}
	of ${'B'}
	and of ${'P'}
	are the same.
	`;
	answer.addPart(ans, soln);
}

// part e
// part d
{
	const gWorking = gradientWorking(circle.center, C);
	const m = gWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: C });
	const tangent = lWorking.eqn;
	const soln = mathlify`
		$${'align*'}
		& \\text{Gradient of } PC	\\\\
		& = ${gWorking.working} \\\\
		& = ${gWorking.gradient} \\\\
		& \\text{Gradient of tangent at } C \\\\
		& = {${m}}

		Equation of tangent at ${'C:'}
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${tangent} ${qed}
	`;
	const ans = mathlify`
		${'y'} = ${tangent}.
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
