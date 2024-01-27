import {
	Circle,
	Point,
	Polynomial,
	completeSquare,
	gradientWorking,
	lineWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
const xCoeff = 4,
	yCoeff = -6,
	constant = -12;
const circle = Circle.fromGeneralForm(xCoeff, yCoeff, constant);

{
	const xWOrking = completeSquare(new Polynomial([1, xCoeff, 0]));
	const yWorking = completeSquare(new Polynomial([1, yCoeff, 0]));
	const soln = mathlify`
		$${'gather*'}
		${circle.toGeneralForm()} = 0 \\\\ 
		${xWOrking} + ${yWorking} ${constant} = 0 \\\\
		${circle}

		$${'align*'}
		\\text{Centre} &= ${circle.center} ${qed} \\\\
		\\text{Radius} &= \\sqrt{${circle.radius.square()}} \\\\
			&= ${circle.radius} ${qed}
	`;
	const ans = mathlify`
		${'\\text{Centre }'}${circle.center}.

		${'\\text{Radius}='}${circle.radius}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const pt = new Point(1, 7);
	const gWorking = gradientWorking(pt, circle.center);
	const gradientTangent = gWorking.gradient.negativeReciprocal();
	const lWorking = lineWorking({ m: gradientTangent, pt });
	const soln = mathlify`
		We denote the centre of the circle by ${'C'}
		and the point ${pt}
		by ${'A'}
		$${'align*'}
		\\text{Gradient of } CA &= ${gWorking.working} \\\\
		&= ${gWorking.gradient} \\\\
		\\text{Gradient of tangent } & = ${gradientTangent}

		Equation of tangent:
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${lWorking.eqn} ${qed}
	`;
	const ans = mathlify`
		${`y=${lWorking.eqn}`}.
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
