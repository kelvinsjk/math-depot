import {
	EquationWorking,
	Expression,
	Point,
	Polynomial,
	castToPoly,
	areaWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

const x = new Polynomial('x');
const m = 2;
const OA = x.times(m);
const OC = x.divide(2);
const xA = new Polynomial('h');
const yA = OA.replaceXWith('h');
const xC = xA;
const yC = OC.replaceXWith('h');
const yB = yA;
let xB: Polynomial;

// part a
{
	// y - yC = m ( x - h )
	// y = mx - hm + yC
	const BC = new Expression([m, 'x'], [-m, 'h'], yC.terms[0]);
	const working = new EquationWorking(BC, yA);
	working.moveTerm(1);
	working.divide(2);
	xB = castToPoly(working.rhs);
	const soln = mathlify`
		Substituting ${`x=h`}
		into the equation of ${'OA'},
		~${'gather*'}
		y = ${yA} \\\\
		\\text{Coordinates of } A = \\left( h, ${yA} \\right) ${qed}

		Since ${'AC'}
		is parallel to the ${'y'}\\text{-axis},
		the ${'x'}\\text{-coordinate} 
		of ${'C'}
		is ${'h'}

		Substituting ${'x=h'}
		into the equation of ${'OC'},
		~${'gather*'}
		y = ${yC} \\\\
		\\text{Coordinates of } C = \\left( h, ${yC} \\right) ${qed}

		Since ${'BC'}
		is parallel to ${'OA'},
		it has gradient ${m}

		Equation of ${'BC'}:
		~${'gather*'}
		y - ${yC} = ${m} \\left( x - h \\right) \\\\
		y = ${BC}

		Since ${'AB'}
		is parallel to the ${'x'}\\text{-axis},
		the ${'y'}\\text{-coordinate}
		of ${'B'}
		is ${yA}

		Substituting ${`y=${yA}`}
		into the equation of ${'BC'},
		~${'gather*'}
		${working}

		$${`\\text{Coordinates of } B = \\left( ${xB}, ${yA} \\right)`} ${qed}
	`;
	const ans = mathlify`
		${`A \\left( h, ${yA} \\right)`}.
		@${'@br'}
		${`B \\left( ${xB}, ${yA} \\right)`}.
		@${'@br'}
		${`C \\left( h, ${yC} \\right)`}.
	`;
	answer.addPart(ans, soln);
}

// part b
{
	const h = 4;
	const A = new Point(xA.subIn(h), yA.subIn(h));
	const C = new Point(xC.subIn(h), yC.subIn(h));
	const B = new Point(xB.subIn(h), yB.subIn(h));
	const O = new Point(0, 0);
	const { matrix, working, area } = areaWorking(O, C, B, A);
	const soln = mathlify`
		Where ${`h=${h}`},
		~${'align*'}
		\\text{Coordinates of } A &= ${A} \\\\
		\\text{Coordinates of } B &= ${B} \\\\
		\\text{Coordinates of } C &= ${C} \\\\

		~${'align*'}
		& \\text{Area of } OABC \\\\
		&= ${matrix} \\\\
		&= ${working} \\\\
		&= ${area} \\text{ units}^2 ${qed}
	`;
	const ans = mathlify`
		${area} \\text{ units}^2
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
