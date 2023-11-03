import {
	Circle,
	EquationWorking,
	Expression,
	Point,
	Polynomial,
	distanceWorking,
	gradientWorking,
	lineWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
const O = new Point(0, 0);
const P = new Point(5, 5);
const lineLHS = new Expression([3, 'y']);
const lineRHS = new Polynomial([1, 2]);
let circle: Circle;

{
	const gWorking = gradientWorking(O, P);
	const m = gWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m, pt: P });
	const l1 = lWorking.eqn;
	const working = new EquationWorking(l1.times(3), lineRHS);
	working.setAligned();
	const x = working.solveLinear();
	const y = l1.subIn(x);
	const center = new Point(x, y);
	const dWorking = distanceWorking(center, P);
	const radius = dWorking.distance;
	circle = new Circle(center, radius);
	const soln = mathlify`
		Let ${'P'}
		denote the point ${P}
		~${'align*'}
		\\text{Gradient of } OP & = ${gWorking.working} \\\\
		& = ${gWorking.gradient} \\\\
		\\text{Gradient of normal at } P &= ${m}

		Equation of normal at ${'P'}:
		~${'gather*'}
		${lWorking.working} \\\\
		y = ${l1}

		The intersection between the normals gives us the centre of the circle
		~${'align'}
		${lineLHS} &= ${lineRHS} \\\\
		y &= ${l1}

		Considering ${`(1)`}
		and ${`3 \\times (2)`},
		~${'align*'}
		${working} \\\\
		y &= ${l1.replaceXWith(`\\left({${x}}\\right)`)} \\\\
		&= ${y}

		$${`\\text{Centre of circle} = ${center}`}

		~${'align*'}
		&\\text{Radius} \\\\
		&= ${dWorking.working} \\\\
		&= \\sqrt{${radius.square()}}

		Equation of circle:
		$${circle} ${qed} 
	`;
	const ans = mathlify`
		${circle}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const y = new Expression(circle.center.y, circle.radius.negative());
	const soln = mathlify`
		The point on the circle nearest to the ${'x'}\\text{-axis}
		is the point vertically below the centre

		~${'align*'}
		&\\text{Coordinates of point} \\\\
		&= \\left( ${circle.center.x}, ${
			circle.center.x
		} - \\sqrt{${circle.radius.square()}} \\right) \\\\
		&= \\left( ${circle.center.x}, ${y} \\right) ${qed}
	`;
	const ans = mathlify`
		${`\\left( ${circle.center.x}, ${y} \\right)`}.
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
