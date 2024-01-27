import {
	Circle,
	Point,
	Polynomial,
	completeSquare,
	Expression,
	EquationWorking,
	distanceWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
const xCoeff = 8,
	yCoeff = -24,
	constant = 96;
const circle = Circle.fromGeneralForm(xCoeff, yCoeff, constant);
const normalX = 4,
	normalY = 3;
const normal = new Expression([normalY, 'y'], [normalX, 'x']);
const k = normal.subIn({ x: circle.center.x, y: circle.center.y });

{
	const xWOrking = completeSquare(new Polynomial([1, xCoeff, 0]));
	const yWorking = completeSquare(new Polynomial([1, yCoeff, 0]));
	const soln = mathlify`
		$${'gather*'}
		${circle.toGeneralForm()} = 0 \\\\ 
		${xWOrking} + ${yWorking} ${constant} = 0 \\\\
		${circle}

		$${''}\\text{Centre} = ${circle.center}

		The normal will pass through the centre of the circle
		$${'align*'}
		k &= ${normalY}(${circle.center.y}) + ${normalX} ({${circle.center.x}})  \\\\
		&= ${k} ${qed}
	`;
	const ans = mathlify`
		${`k=${k}`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const working1 = new EquationWorking(normal.subIn({ y: 0 }), k);
	const xS = working1.solveLinear();
	const S = new Point(xS, 0);
	const dWorking = distanceWorking(S, circle.center);
	const l = dWorking.distance;
	const RS = l.cast.toFraction().minus(circle.radius.cast.toFraction());
	const soln = mathlify`
		At point ${'S'}, y=0
		$${'gather*'}
		${working1} 

		$${'S'}=${S}

		We denote the centre of the circle by ${'C'}

		$${'align*'}
		& \\text{Distance } CS \\\\
		&= ${dWorking.working} \\\\
		&= ${l} \\\\
		RS &= CS - \\text{radius} \\\\
		&= ${l} - ${circle.radius} \\\\
		&= ${RS} \\text{ units} ${qed}
	`;
	const ans = mathlify`
		${`${RS}`} \\text{ units}.
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
