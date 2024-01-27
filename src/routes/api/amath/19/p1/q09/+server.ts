import {
	EquationWorking,
	Point,
	gradientWorking,
	lineWorking,
	midPointWorking,
} from 'mathlify';
import { Answer } from '$lib/components/answerObject';
import { mathlify } from '$lib/temml';
import { qed } from '$lib/typesetting/qed';
import { Topics } from '../../../topics';

const answer = new Answer();

// part a
{
	const soln = mathlify`
		Consider ${'\\triangle AOP'}
		and ${'\\triangle BOP'}

		Since ${'AB=4'}
		and ${`OA=2`},
		$${'gather*'}
		OA = OB = 2 \\\\
		OP \\text{ is common} \\\\
		\\angle AOP = \\angle BOP = 90 \\degree

		Hence by the ${'SAS'}
		congruency test, ${'\\triangle AOP \\equiv \\triangle BOP'}
		so ${'AP = BP'}

		By the property of a kite, ${'\\angle APB = 90\\degree'}

		Hence ${'\\triangle APB'}
		is a right-angled isosceles triangle so
		${'\\angle ABP = 45\\degree'}

		By the property of a a kite, ${'\\angle ABC = 2 \\times 45 \\degree = 90\\degree'}

		Hence ${'AP \\perp BC'}
		so ${'BC'}
		is parallel to the ${'x'}\\text{-axis} ${qed}
	`;
	const ans = mathlify`
		${'BC'}
		is parallel to the ${'x'}\\text{-axis}.
	`;
	answer.addPart(ans, soln);
}

const base = 4;
const A = new Point(0, base / 2);
const B = new Point(0, -base / 2);
const C = new Point(base, -base / 2);
// part b
{
	const soln = mathlify`
		Since ${'BC'}
		is parallel to the
		${'x'}\\text{-axis}
		and ${'AB=BC=4'},
		$${`\\text{Coordinates of } C = ${C}`} ${qed}
	`;
	const ans = mathlify`
		${`C${C}`}.
	`;
	answer.addPart(ans, soln);
}

// part c
{
	const pWorking = midPointWorking(A, C);
	const P = pWorking.midPoint;
	const gWorking = gradientWorking(B, P);
	const m = gWorking.gradient;
	const lWorking = lineWorking({ m, pt: B });
	const BP = lWorking.eqn;
	const area = 28;
	const triangle = area / 2;
	const height = (triangle * 2) / base;
	const yD = height - base / 2;
	const working = new EquationWorking(BP, yD, { aligned: true });
	const xD = working.solveLinear();

	const soln = mathlify`
		$${'align*'}
		&\\text{Coordinates of } P \\\\
		& = ${pWorking.working} \\\\
		& = ${pWorking.midPoint}
		
		$${'align*'}
		&\\text{Gradient of } BP \\\\
		& = ${gWorking.working} \\\\
		& = ${m}

		Equation of ${'BD:'}
		$${'gather*'}
		${lWorking.working} \\\\
		y = ${BP}

		Since the area of the kite is ${'28'}\\text{ units}^2,
		$${'gather*'}
		\\text{Area of } \\triangle BCD = ${triangle} \\\\
		\\frac{1}{2} \\times BC \\times h = ${triangle} \\\\
		h = \\frac{2(${triangle})}{${base}} \\\\
		h = ${height}

		Since the ${'y'}\\text{-coordinates}
		of ${'B'}
		is ${-base / 2}
		and the height of ${'\\triangle BCD'} = ${height},
		the ${'y'}\\text{-coordinates}
		of ${'D'}
		is ${yD}

		Substituting ${`y=${yD}`}
		into the equation of ${'BD'},
		$${'align*'}
		${working}

		$${''}\\text{Coordinates of } D = \\left( ${xD}, ${yD} \\right) ${qed}  
	`;
	const ans = mathlify`
		${`D\\left( ${xD}, ${yD} \\right)`}.
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
